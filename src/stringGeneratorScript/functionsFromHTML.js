/* eslint-disable no-undef */


export const testFunc = () => {
  // eslint-disable-next-line no-undef
  console.log(IMG_SIZE);
};

let lengthX; // instead of 'length' variable
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

let outputCanvasId = 'canvasOutput1';

export function canvasInit() {
  // listenForKeys = false;
  // showStep(1);
  // showPins.classList.add('hidden');
  // incrementalDrawing.classList.add('hidden');
  // Take uploaded picture, square up and put on canvas

  const imgElement = document.getElementById('imageSrc')

  ctx = document.getElementById('canvasGray').getContext('2d');

  let base_image = new Image();
  base_image.src = imgElement.src;
  ctx.canvas.width = IMG_SIZE;
  ctx.canvas.height = IMG_SIZE;
  // ctx2.canvas.weight = IMG_SIZE * 2;
  // ctx2.canvas.height = IMG_SIZE * 2;
  ctx.clearRect(0, 0, IMG_SIZE, IMG_SIZE);

  var selectedWidth = base_image.width;
  var selectedHeight = base_image.height;
  var xOffset = 0;
  var yOffset = 0;
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
  // eslint-disable-next-line no-restricted-globals
  lengthX = IMG_SIZE;

  // make grayscale by averaging the RGB channels.
  // extract out the R channel because that's all we need and push graysacle image onto canvas
  var imgPixels = ctx.getImageData(0, 0, IMG_SIZE, IMG_SIZE);
  R = img_result = nj.ones([IMG_SIZE, IMG_SIZE]).multiply(0xff);
  var rdata = [];
  for (var y = 0; y < imgPixels.height; y++) {
    for (var x = 0; x < imgPixels.width; x++) {
      var i = y * 4 * imgPixels.width + x * 4;
      var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
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
  console.log('Function canvasInit finished.');
  // start processing
  // NonBlockingCalculatePins();
}

export function setSettings(pins, lines, canvasId) {
  N_PINS = pins;
  MAX_LINES = lines;
  outputCanvasId = canvasId;

  console.log('Settings changed!')
}

export async function NonBlockingCalculatePins() {
  // set up necessary variables
  console.log('Calculating pins...');
  // status.textContent = "Calculating pins...";
  // pin_coords = [];
  const center = lengthX / 2;
  const radius = lengthX / 2 - 1 / 2;
  let i = 0;

  let angle;
  await (async function codeBlock() {
    if (i < N_PINS) {
      angle = (2 * Math.PI * i) / N_PINS;
      pin_coords.push([Math.floor(center + radius * Math.cos(angle)), Math.floor(center + radius * Math.sin(angle))]);
      i++;
      setTimeout(codeBlock, 0);
    } else {
      console.log('Done Calculating pins');
      // status.textContent = 'Done Calculating pins';
      // showStep(2);
      await NonBlockingPrecalculateLines();
    }
  })();

  console.log('Function NonBlockingCalculatePins finished.');
}

export async function NonBlockingPrecalculateLines(){
  // set up necessary variables
  console.log("Precalculating all lines...");
  // status.textContent = "Precalculating all lines...";
  line_cache_y = Array.apply(null, {length: (N_PINS * N_PINS)});
  line_cache_x = Array.apply(null, {length: (N_PINS * N_PINS)});
  line_cache_length = Array.apply(null, {length: (N_PINS * N_PINS)}).map(Function.call, function(){return 0;});
  line_cache_weight = Array.apply(null, {length: (N_PINS * N_PINS)}).map(Function.call, function(){return 1;});
  let a = 0;

  await (async function codeBlock(){
    if(a < N_PINS){
      for (let b = a + MIN_DISTANCE; b < N_PINS; b++) {
        let x0 = pin_coords[a][0];
        let y0 = pin_coords[a][1];

        let x1 = pin_coords[b][0];
        let y1 = pin_coords[b][1];

        let d = Math.floor(Number(Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0)*(y1 - y0))));
        let xs = linspace(x0, x1, d);
        let ys = linspace(y0, y1, d);

        line_cache_y[b*N_PINS + a] = ys;
        line_cache_y[a*N_PINS + b] = ys;
        line_cache_x[b*N_PINS + a] = xs;
        line_cache_x[a*N_PINS + b] = xs;
        line_cache_length[b*N_PINS + a] = d;
        line_cache_length[a*N_PINS + b] = d;
      }
      a++;
      setTimeout(codeBlock, 0);
    } else {
      console.log('Done Precalculating Lines');
      // status.textContent = "Done Precalculating Lines";
      await NonBlockingLineCalculator();
      // showStep(3);
    }
  })();

  console.log('Function NonBlockingPrecalculateLines finished.');
}

async function NonBlockingLineCalculator(){
  // set up necessary variables
  console.log("Drawing Lines...");
  // status.textContent = "Drawing Lines...";
  error = nj.ones([IMG_SIZE, IMG_SIZE]).multiply(0xff).subtract(nj.uint8(R.selection.data).reshape(IMG_SIZE, IMG_SIZE));
  img_result = nj.ones([IMG_SIZE, IMG_SIZE ]).multiply(0xff);
  result = nj.ones([IMG_SIZE * SCALE, IMG_SIZE * SCALE]).multiply(0xff);
  result = new cv.matFromArray(IMG_SIZE * SCALE, IMG_SIZE * SCALE, cv.CV_8UC1, result.selection.data);
  line_mask = nj.zeros([IMG_SIZE, IMG_SIZE], 'float64');

  line_sequence = [];
  let pin = 0;
  line_sequence.push(pin);
  thread_length = 0;
  const last_pins = [];
  let l = 0;

 await (async function codeBlock(){
    if(l < MAX_LINES){
      // if(l%10 == 0){
      //   draw();
      // }

      let max_err = -1;
      let best_pin = -1;

      let xs;
      let ys;

      for(let offset=MIN_DISTANCE; offset < N_PINS - MIN_DISTANCE; offset++){
        let test_pin = (pin + offset) % N_PINS;
        if(last_pins.includes(test_pin)){
          continue;
        }else {

          xs = line_cache_x[test_pin * N_PINS + pin];
          ys = line_cache_y[test_pin * N_PINS + pin];

          let line_err = getLineErr(error, ys, xs) * line_cache_weight[test_pin * N_PINS + pin];

          if( line_err > max_err){
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
      thread_length += HOOP_DIAMETER / lengthX * dist;

      last_pins.push(best_pin);
      if(last_pins.length > 20){
        last_pins.shift();
      }
      pin = best_pin;

      //update status
      // drawStatus.textContent = l + " Lines drawn | " + Math.round((l / MAX_LINES) * 100) + "% complete";

      l++;
      setTimeout(codeBlock, 0);
    } else {
      console.log('Done Drawing Lines');
      await Finalize();
    }
  })();
}

function draw(){
  let dsize = new cv.Size(IMG_SIZE * 2, IMG_SIZE * 2);
  let dst = new cv.Mat();
  cv.resize(result, dst, dsize, 0, 0, cv.INTER_AREA);
  cv.imshow(outputCanvasId, dst);
  dst.delete();
}

function Finalize() {
  let dsize = new cv.Size(IMG_SIZE * 2, IMG_SIZE * 2);
  let dst = new cv.Mat();
  console.log('result:', result)
  cv.resize(result, dst, dsize, 0, 0, cv.INTER_AREA);

  console.log("complete");
  // drawStatus.textContent = MAX_LINES + " Lines drawn | 100% complete";

  cv.imshow(outputCanvasId, dst);
  console.log(line_sequence);
  // status.textContent = "Complete";
  // pinsOutput.value = line_sequence;
  // showPins.classList.remove('hidden');
  dst.delete(); result.delete();
  window.scrollTo({ top: 5000, left: 0, behavior: 'smooth' });
}
