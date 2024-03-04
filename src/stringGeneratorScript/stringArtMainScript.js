/* eslint-disable no-undef */

// Constants
const numberOfPins = 250;

// Helpers:
function linspace(a, b, n) {
  if (typeof n === 'undefined') n = Math.max(Math.round(b - a) + 1, 1);
  if (n < 2) {
    return n === 1 ? [a] : [];
  }
  let i,
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

export async function createStringArt(
  baseCanvasElement,
  lines = 1000,
  setLineCalcProgress
) {
  let lengthX; // instead of 'length' variable in old script
  let img_result;
  const pin_coords = [];

  let line_cache_y;
  let line_cache_x;
  let line_cache_length;
  let line_cache_weight;

  let error;
  // let result = prevResult?.clone();
  let line_mask;
  let line_sequence = [];
  let thread_length;

  let ctx;
  let N_PINS = numberOfPins;
  let MAX_LINES = lines; // 4000;
  const IMG_SIZE = 455;
  const OUTPUT_CANVAS_SIZE = 131;
  let R;
  const lineThickness = 1.4; // 2
  const MIN_DISTANCE = 20;
  const LINE_WEIGHT = 20;
  let HOOP_DIAMETER = 0.625;

  // let outputCanvasId = canvasId;

  // Main flow functions:
  function canvasInit() {
    // Take uploaded picture, square up and put on canvas

    // Source image
    // const imgElement = document.getElementById('imageSrc');

    // Output canvas for round gray example
    ctx = document.getElementById('canvasGray').getContext('2d');

    // let base_image = new Image();
    // base_image.src = baseImgElement.src;
    ctx.canvas.width = IMG_SIZE;
    ctx.canvas.height = IMG_SIZE;
    // ctx2.canvas.weight = IMG_SIZE * 2;
    // ctx2.canvas.height = IMG_SIZE * 2;
    ctx.clearRect(0, 0, IMG_SIZE, IMG_SIZE);

    let selectedWidth = baseCanvasElement.width;
    let selectedHeight = baseCanvasElement.height;
    let xOffset = 0;
    let yOffset = 0;

    // square crop  center of picture (Legacy code, with current image editor we already getting a canvas that ready to work with)
    if (baseCanvasElement.height > baseCanvasElement.width) {
      selectedWidth = baseCanvasElement.width;
      selectedHeight = baseCanvasElement.width;
      yOffset = Math.floor(
        (baseCanvasElement.height - baseCanvasElement.width) / 2
      );
    } else if (baseCanvasElement.width > baseCanvasElement.height) {
      selectedWidth = baseCanvasElement.height;
      selectedHeight = baseCanvasElement.height;
      xOffset = Math.floor(
        (baseCanvasElement.width - baseCanvasElement.height) / 2
      );
    }

    ctx.drawImage(
      baseCanvasElement,
      xOffset,
      yOffset,
      selectedWidth,
      selectedHeight,
      0,
      0,
      IMG_SIZE,
      IMG_SIZE
    );

    lengthX = IMG_SIZE;

    // make grayscale by averaging the RGB channels.
    // extract out the R channel because that's all we need and push grayscale image onto canvas
    let imgPixels = ctx.getImageData(0, 0, IMG_SIZE, IMG_SIZE);
    R = img_result = nj.ones([IMG_SIZE, IMG_SIZE]).multiply(0xff);
    let rdata = [];
    for (let y = 0; y < imgPixels.height; y++) {
      for (let x = 0; x < imgPixels.width; x++) {
        let i = y * 4 * imgPixels.width + x * 4;
        let avg =
          (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) /
          3;
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

    line_cache_y = [];
    line_cache_x = [];
    line_cache_length = [];
    line_cache_weight = [];

    for (let i = 0; i < N_PINS * N_PINS; i++) {
      line_cache_y.push(undefined);
      line_cache_x.push(undefined);
      line_cache_length.push(0);
      line_cache_weight.push(1);
    }

    let a = 0;

    async function codeBlock() {
      return new Promise((resolve) => {
        if (a < N_PINS) {
          for (let b = a + MIN_DISTANCE; b < N_PINS; b++) {
            let x0 = pin_coords[a][0];
            let y0 = pin_coords[a][1];

            let x1 = pin_coords[b][0];
            let y1 = pin_coords[b][1];

            let d = Math.floor(
              Number(Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0)))
            );
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
    console.log('Calculating Lines...');

    error = nj
      .ones([IMG_SIZE, IMG_SIZE])
      .multiply(0xff)
      .subtract(nj.uint8(R.selection.data).reshape(IMG_SIZE, IMG_SIZE));
    img_result = nj.ones([IMG_SIZE, IMG_SIZE]).multiply(0xff);

    line_mask = nj.zeros([IMG_SIZE, IMG_SIZE], 'float64');

    let pin;
    let l;
    if (line_sequence?.length > 1) {
      const lastIndex = line_sequence.length - 1;
      pin = line_sequence[lastIndex];
      l = lastIndex;
    } else {
      line_sequence = [];
      pin = 0;
      line_sequence.push(pin);
      l = 0;
    }

    thread_length = 0;
    const last_pins = [];

    async function codeBlock() {
      return new Promise((resolve) => {
        if (l < MAX_LINES) {
          // Uncomment for sequential drawing
          // if (l % 100 === 0) {
          //   // draw();
          // }
          const progressPercentage = (l / MAX_LINES) * 100;

          if (Number.isInteger(progressPercentage)) {
            setLineCalcProgress(Math.round(progressPercentage));
          }

          let max_err = -1;
          let best_pin = -1;

          let xs;
          let ys;

          for (
            let offset = MIN_DISTANCE;
            offset < N_PINS - MIN_DISTANCE;
            offset++
          ) {
            let test_pin = (pin + offset) % N_PINS;
            if (last_pins.includes(test_pin)) {
              continue;
            } else {
              xs = line_cache_x[test_pin * N_PINS + pin];
              ys = line_cache_y[test_pin * N_PINS + pin];

              let line_err =
                getLineErr(error, ys, xs) *
                line_cache_weight[test_pin * N_PINS + pin];

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
          console.log('Done Calculating Lines');
          resolve();
        }
      });
    }

    await codeBlock();
  }

  // Execution:
  canvasInit();
  await NonBlockingCalculatePins();
  await NonBlockingPrecalculateLines();
  await NonBlockingLineCalculator();

  return line_sequence;
}

export function drawLinesSVG(svgId, stepsArr, isDeviceOSDep = false) {
  if (!stepsArr || stepsArr.length < 1) {
    return;
  }

  const svg = document.getElementById(svgId);
  const svgNS = 'http://www.w3.org/2000/svg';
  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  const isSafari =
    navigator.vendor &&
    navigator.vendor.indexOf('Apple') > -1 &&
    navigator.userAgent &&
    navigator.userAgent.indexOf('CriOS') === -1 &&
    navigator.userAgent.indexOf('FxiOS') === -1;

  const { width, height } = svg.getBoundingClientRect();

  // Очистка SVG
  while (svg.firstChild) {
    svg.removeChild(svg.firstChild);
  }

  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(centerX, centerY);

  // const pixelRatio = window.devicePixelRatio || 1;
  const pixelRatio = isDeviceOSDep && (isIOS || isSafari) ? 10 : 1;
  const baseLineWidth = 0.1;
  const baseWidth = 455;
  const actualLineWidth = (baseLineWidth * (width / baseWidth)) / pixelRatio;

  const strokeColor =
    isDeviceOSDep && (isIOS || isSafari) ? '#333333' : '#010101';

  function definePoints(numPoints) {
    const angleIncrement = (2 * Math.PI) / numPoints;
    const points = [];

    for (let i = 0; i < numPoints; i++) {
      const x = centerX + radius * Math.cos(i * angleIncrement);
      const y = centerY + radius * Math.sin(i * angleIncrement);
      points.push({ x, y });
    }

    return points;
  }

  function drawLines(points, indexes) {
    const path = document.createElementNS(svgNS, 'path');
    const d = indexes
      .map((index, i) => {
        return `${i === 0 ? 'M' : 'L'} ${points[index].x} ${points[index].y}`;
      })
      .join(' ');

    path.setAttribute('d', d);
    path.setAttribute('stroke', strokeColor);
    path.setAttribute('stroke-width', actualLineWidth.toString());
    path.setAttribute('fill', 'none');
    svg.appendChild(path);
  }

  const points = definePoints(numberOfPins);
  drawLines(points, stepsArr);
}

export function drawLinesSmallSVG(svgId, stepsArr) {
  return drawLinesSVG(svgId, stepsArr, true);
}
