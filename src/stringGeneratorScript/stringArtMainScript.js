/* eslint-disable no-undef */

// Helpers:
function linspace(a, b, n) {
  if (typeof n === 'undefined') n = Math.max(Math.round(b - a) + 1, 1);
  if (n < 2) {
    return n === 1 ? [a] : [];
  }
  var i,
    ret = Array(n);
  n--;
  for (i = n; i >= 0; i--) {
    ret[i] = Math.floor((i * b + (n - i) * a) / n);
  }
  return ret;
}

function getSum(arr) {
  let v = 0;
  for (let i = 0; i < arr.length; i++) {
    v = v + arr[i];
  }
  return v;
}

function subtractArrays(arr1, arr2) {
  for (let i = 0; i < arr1.selection.data.length; i++) {
    arr1.selection.data[i] = arr1.selection.data[i] - arr2.selection.data[i];
    if (arr1.selection.data[i] < 0) {
      arr1.selection.data[i] = 0;
    } else if (arr1.selection.data[i] > 255) {
      arr1.selection.data[i] = 255;
    }
  }
  return arr1;
}

function setLine(arr, coords1, coords2, line) {
  for (let i = 0; i < coords1.length; i++) {
    arr.set(coords1[i], coords2[i], line);
  }
  return arr;
}

function getLineErr(arr, coords1, coords2) {
  let result = new Uint8Array(coords1.length);
  for (let i = 0; i < coords1.length; i++) {
    result[i] = arr.get(coords1[i], coords2[i]);
  }
  return getSum(result);
}

export async function createStringArt(lines = 1000, canvasId = 'canvasOutput1', pins = 36 * 8) {
  let lengthX; // instead of 'length' variable in old script
  let img_result;
  const pin_coords = [];

  let line_cache_y;
  let line_cache_x;
  let line_cache_length;
  let line_cache_weight;

  let error;
  let result;
  let line_mask;
  let line_sequence;
  let thread_length;

  let ctx;
  let N_PINS = pins;
  let MAX_LINES = lines; // 4000;
  const IMG_SIZE = 350;
  let R;

  let outputCanvasId = canvasId;

  // Main flow functions:
  function canvasInit() {
    // Take uploaded picture, square up and put on canvas

    // Source image
    const imgElement = document.getElementById('imageSrc');

    // Output canvas for round gray example
    ctx = document.getElementById('canvasGray').getContext('2d');

    let base_image = new Image();
    base_image.src = imgElement.src;
    ctx.canvas.width = IMG_SIZE;
    ctx.canvas.height = IMG_SIZE;
    // ctx2.canvas.weight = IMG_SIZE * 2;
    // ctx2.canvas.height = IMG_SIZE * 2;
    ctx.clearRect(0, 0, IMG_SIZE, IMG_SIZE);

    let selectedWidth = base_image.width;
    let selectedHeight = base_image.height;
    let xOffset = 0;
    let yOffset = 0;

    // square crop  center of picture
    if (base_image.height > base_image.width) {
      selectedWidth = base_image.width;
      selectedHeight = base_image.width;
      yOffset = Math.floor((base_image.height - base_image.width) / 2);
    } else if (base_image.width > base_image.height) {
      selectedWidth = base_image.height;
      selectedHeight = base_image.height;
      xOffset = Math.floor((base_image.width - base_image.height) / 2);
    }

    ctx.drawImage(base_image, xOffset, yOffset, selectedWidth, selectedHeight, 0, 0, IMG_SIZE, IMG_SIZE);

    lengthX = IMG_SIZE;

    // make grayscale by averaging the RGB channels.
    // extract out the R channel because that's all we need and push grayscale image onto canvas
    let imgPixels = ctx.getImageData(0, 0, IMG_SIZE, IMG_SIZE);
    R = img_result = nj.ones([IMG_SIZE, IMG_SIZE]).multiply(0xff);
    let rdata = [];
    for (let y = 0; y < imgPixels.height; y++) {
      for (let x = 0; x < imgPixels.width; x++) {
        let i = y * 4 * imgPixels.width + x * 4;
        let avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
        imgPixels.data[i] = avg;
        imgPixels.data[i + 1] = avg;
        imgPixels.data[i + 2] = avg;
        rdata.push(avg);
      }
    }
    R.selection.data = rdata;
    ctx.putImageData(imgPixels, 0, 0, 0, 0, IMG_SIZE, IMG_SIZE);

    //circle crop canvas
    ctx.globalCompositeOperation = 'destination-in';
    ctx.beginPath();
    ctx.arc(IMG_SIZE / 2, IMG_SIZE / 2, IMG_SIZE / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }

  async function NonBlockingCalculatePins() {
    console.log('Calculating pins...');

    const center = lengthX / 2;
    const radius = lengthX / 2 - 1 / 2;
    let i = 0;

    let angle;

    async function codeBlock() {
      return new Promise((resolve) => {
        if (i < N_PINS) {
          angle = (2 * Math.PI * i) / N_PINS;
          pin_coords.push([
            Math.floor(center + radius * Math.cos(angle)),
            Math.floor(center + radius * Math.sin(angle))
          ]);
          i++;
          setTimeout(() => resolve(codeBlock()), 0);
        } else {
          console.log('Done Calculating pins');

          resolve();
        }
      });
    }

    await codeBlock();
  }

  async function NonBlockingPrecalculateLines() {
    console.log('Precalculating all lines...');

    line_cache_y = Array.apply(null, { length: N_PINS * N_PINS });
    line_cache_x = Array.apply(null, { length: N_PINS * N_PINS });
    line_cache_length = Array.apply(null, { length: N_PINS * N_PINS }).map(Function.call, function () {
      return 0;
    });
    line_cache_weight = Array.apply(null, { length: N_PINS * N_PINS }).map(Function.call, function () {
      return 1;
    });
    let a = 0;

    async function codeBlock() {
      return new Promise((resolve) => {
        if (a < N_PINS) {
          for (let b = a + MIN_DISTANCE; b < N_PINS; b++) {
            let x0 = pin_coords[a][0];
            let y0 = pin_coords[a][1];

            let x1 = pin_coords[b][0];
            let y1 = pin_coords[b][1];

            let d = Math.floor(Number(Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0))));
            let xs = linspace(x0, x1, d);
            let ys = linspace(y0, y1, d);

            line_cache_y[b * N_PINS + a] = ys;
            line_cache_y[a * N_PINS + b] = ys;
            line_cache_x[b * N_PINS + a] = xs;
            line_cache_x[a * N_PINS + b] = xs;
            line_cache_length[b * N_PINS + a] = d;
            line_cache_length[a * N_PINS + b] = d;
          }
          a++;
          setTimeout(() => resolve(codeBlock()), 0);
        } else {
          console.log('Done Precalculating Lines');

          resolve();
        }
      });
    }

    await codeBlock();
  }

  async function NonBlockingLineCalculator() {
    console.log('Drawing Lines...');

    error = nj
      .ones([IMG_SIZE, IMG_SIZE])
      .multiply(0xff)
      .subtract(nj.uint8(R.selection.data).reshape(IMG_SIZE, IMG_SIZE));
    img_result = nj.ones([IMG_SIZE, IMG_SIZE]).multiply(0xff);
    result = nj.ones([IMG_SIZE * SCALE, IMG_SIZE * SCALE]).multiply(0xff);
    result = new cv.matFromArray(IMG_SIZE * SCALE, IMG_SIZE * SCALE, cv.CV_8UC1, result.selection.data);
    line_mask = nj.zeros([IMG_SIZE, IMG_SIZE], 'float64');

    line_sequence = [];
    let pin = 0;
    line_sequence.push(pin);
    thread_length = 0;
    const last_pins = [];
    let l = 0;

    async function codeBlock() {
      return new Promise((resolve) => {
        if (l < MAX_LINES) {
          // Uncomment for sequential drawing
          // if (l % 10 == 0) {
          //   draw();
          // }

          let max_err = -1;
          let best_pin = -1;

          let xs;
          let ys;

          for (let offset = MIN_DISTANCE; offset < N_PINS - MIN_DISTANCE; offset++) {
            let test_pin = (pin + offset) % N_PINS;
            if (last_pins.includes(test_pin)) {
              continue;
            } else {
              xs = line_cache_x[test_pin * N_PINS + pin];
              ys = line_cache_y[test_pin * N_PINS + pin];

              let line_err = getLineErr(error, ys, xs) * line_cache_weight[test_pin * N_PINS + pin];

              if (line_err > max_err) {
                max_err = line_err;
                best_pin = test_pin;
              }
            }
          }

          line_sequence.push(best_pin);

          xs = line_cache_x[best_pin * N_PINS + pin];
          ys = line_cache_y[best_pin * N_PINS + pin];
          let weight = LINE_WEIGHT * line_cache_weight[best_pin * N_PINS + pin];

          line_mask = nj.zeros([IMG_SIZE, IMG_SIZE], 'float64');
          line_mask = setLine(line_mask, ys, xs, weight);
          error = subtractArrays(error, line_mask);

          let p = new cv.Point(pin_coords[pin][0] * SCALE, pin_coords[pin][1] * SCALE);
          let p2 = new cv.Point(pin_coords[best_pin][0] * SCALE, pin_coords[best_pin][1] * SCALE);
          cv.line(result, p, p2, new cv.Scalar(0, 0, 0), 2, cv.LINE_AA, 0);

          let x0 = pin_coords[pin][0];
          let y0 = pin_coords[pin][1];

          let x1 = pin_coords[best_pin][0];
          let y1 = pin_coords[best_pin][1];

          let dist = Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0));
          thread_length += (HOOP_DIAMETER / lengthX) * dist;

          last_pins.push(best_pin);
          if (last_pins.length > 20) {
            last_pins.shift();
          }
          pin = best_pin;

          l++;
          setTimeout(() => resolve(codeBlock()), 0);
        } else {
          console.log('Done Drawing Lines');
          resolve();
        }
      });
    }

    await codeBlock();

    Finalize();
  }

  // Draw and final draw helpers:
  function draw() {
    let dsize = new cv.Size(IMG_SIZE * 2, IMG_SIZE * 2);
    let dst = new cv.Mat();
    cv.resize(result, dst, dsize, 0, 0, cv.INTER_AREA);
    cv.imshow(outputCanvasId, dst);
    dst.delete();
  }

  function Finalize() {
    let dsize = new cv.Size(IMG_SIZE * 2, IMG_SIZE * 2);
    let dst = new cv.Mat();

    cv.resize(result, dst, dsize, 0, 0, cv.INTER_AREA);

    console.log('complete');

    cv.imshow(outputCanvasId, dst);
    console.log(line_sequence);

    dst.delete();
    result.delete();
  }

  // Execution:
  canvasInit();
  await NonBlockingCalculatePins();
  await NonBlockingPrecalculateLines();
  await NonBlockingLineCalculator();

  return line_sequence;
}
