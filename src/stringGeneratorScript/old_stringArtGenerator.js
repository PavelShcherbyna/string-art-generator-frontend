/* eslint-disable no-undef */
// import cv from '../opencv';
// import nj from "numjs";

const cv = require('opencv.js');
// const cv = {};

// Helpers
function getSum(arr) {
  let v = 0;
  for (let i = 0; i < arr.length; i++) {
    v = v + arr[i];
  }
  return v;
}

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

function getLineErr(arr, coords1, coords2) {
  let result = new Uint8Array(coords1.length);
  for (let i = 0; i < coords1.length; i++) {
    result[i] = arr.get(coords1[i], coords2[i]);
  }
  return getSum(result);
}

function setLine(arr, coords1, coords2, line) {
  for (let i = 0; i < coords1.length; i++) {
    arr.set(coords1[i], coords2[i], line);
  }
  return arr;
}
//

export class StringArtGenerator {
  constructor(MAX_LINES = process.env.REACT_APP_MAX_LINES, N_PINS = process.env.REACT_APP_N_PINS, canvasOutputID = 'canvasOutput2') {
    this.MAX_LINES = Number(MAX_LINES);
    this.N_PINS = Number(N_PINS);
    this.canvasOutputID = canvasOutputID;
    this.imgElement = document.getElementById('imageSrc');
  }

  // Initialization variables
  IMG_SIZE = Number(process.env.REACT_APP_IMG_SIZE);
  MAX_LINES;
  N_PINS;
  MIN_DISTANCE = Number(process.env.REACT_APP_MIN_DISTANCE);
  LINE_WEIGHT = Number(process.env.REACT_APP_LINE_WEIGHT);
  SCALE = Number(process.env.REACT_APP_SCALE);
  HOOP_DIAMETER = Number(process.env.REACT_APP_HOOP_DIAMETER);

  // DOM related stuff
  canvasOutputID;
  imgElement;
  ctx = document.getElementById('canvasOutput').getContext('2d');

  length;
  R = {};

  //pre initialization
  pin_coords;
  center;
  radius;

  line_cache_y;
  line_cache_x;
  line_cache_length;
  line_cache_weight;

  // line variables
  error;
  img_result;
  result;
  line_mask;

  line_sequence;

  imgInitTest() {
    // let ctx = this.ctx;
    // eslint-disable-next-line no-undef
    console.log('p1')
    console.log('this.imgElement:', this.imgElement)
    let mat = cv.imread(this.imgElement.id);
    console.log('p2')
    // eslint-disable-next-line no-undef
    cv.imshow('canvasOutput', mat);
    console.log('Now here...')
  }

  imgInit() {
    // listenForKeys = false;
    // showStep(1);
    // showPins.classList.add('hidden');
    // incrementalDrawing.classList.add('hidden');

    // Take uploaded picture, square up and put on canvas
    let ctx = this.ctx;
    let IMG_SIZE = this.IMG_SIZE;

    let base_image = new Image();
    base_image.src = this.imgElement.src;
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
    this.length = IMG_SIZE;

    // make grayscale by averaging the RGB channels.
    // extract out the R channel because that's all we need and push grayscale image onto canvas
    let imgPixels = ctx.getImageData(0, 0, IMG_SIZE, IMG_SIZE);
    // eslint-disable-next-line no-undef
    this.R = this.img_result = nj.ones([IMG_SIZE, IMG_SIZE]).multiply(0xff);
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
    this.R.selection.data = rdata;
    ctx.putImageData(imgPixels, 0, 0, 0, 0, IMG_SIZE, IMG_SIZE);

    //circle crop canvas
    ctx.globalCompositeOperation = 'destination-in';
    ctx.beginPath();
    ctx.arc(IMG_SIZE / 2, IMG_SIZE / 2, IMG_SIZE / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();

    // start processing
    console.log('Image init done!')

    this.NonBlockingCalculatePins();
  }

  NonBlockingCalculatePins(){
    // set up necessary variables
    console.log("Calculating pins...");
    // status.textContent = "Calculating pins...";

    const N_PINS = this.N_PINS;

    this.pin_coords = [];
    this.center = this.length / 2;
    this.radius = this.length / 2 - 1/2

    // Old non blocking implementation
    // let i = 0;
    //
    // (function codeBlock(){
    //   if(i < N_PINS){
    //     let angle = 2 * Math.PI * i / N_PINS;
    //     this.pin_coords.push([Math.floor(center + radius * Math.cos(angle)),
    //       Math.floor(center + radius * Math.sin(angle))]);
    //     i++;
    //     setTimeout(codeBlock, 0);
    //   } else {
    //     console.log('Done Calculating pins');
        // console.log('Pins coords:', this.pin_coords);
        // status.textContent = "Done Calculating pins";
        // showStep(2);
        // NonBlockingPrecalculateLines();
    //   }
    // })();

    // New blocking implementation
    for (let i = 0; i < N_PINS; i++) {
      let angle = 2 * Math.PI * i / N_PINS;
      this.pin_coords.push([Math.floor(this.center + this.radius * Math.cos(angle)),
        Math.floor(this.center + this.radius * Math.sin(angle))]);
    }

    console.log('Done Calculating pins');
    console.log('Pins coords:', this.pin_coords);
    this.NonBlockingPrecalculateLines();
  }

  NonBlockingPrecalculateLines(){
    // set up necessary variables
    console.log("Precalculating all lines...");
    // status.textContent = "Precalculating all lines...";

    const N_PINS = this.N_PINS;
    this.line_cache_y = Array.apply(null, {length: (N_PINS * N_PINS)});
    this.line_cache_x = Array.apply(null, {length: (N_PINS * N_PINS)});
    this.line_cache_length = Array.apply(null, {length: (N_PINS * N_PINS)}).map(Function.call, function(){return 0;});
    this.line_cache_weight = Array.apply(null, {length: (N_PINS * N_PINS)}).map(Function.call, function(){return 1;});

    // Old non blocking implementation
    // let a = 0;
    // (function codeBlock(){
    //   if(a < N_PINS){
    //     for (let b = a + MIN_DISTANCE; b < N_PINS; b++) {
    //       let x0 = pin_coords[a][0];
    //       let y0 = pin_coords[a][1];
    //
    //       let x1 = pin_coords[b][0];
    //       let y1 = pin_coords[b][1];
    //
    //       let d = Math.floor(Number(Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0)*(y1 - y0))));
    //       let xs = linspace(x0, x1, d);
    //       let ys = linspace(y0, y1, d);
    //
    //       line_cache_y[b*N_PINS + a] = ys;
    //       line_cache_y[a*N_PINS + b] = ys;
    //       line_cache_x[b*N_PINS + a] = xs;
    //       line_cache_x[a*N_PINS + b] = xs;
    //       line_cache_length[b*N_PINS + a] = d;
    //       line_cache_length[a*N_PINS + b] = d;
    //     }
    //     a++;
    //     setTimeout(codeBlock, 0);
    //   } else {
    //     console.log('Done Precalculating Lines');
        // status.textContent = "Done Precalculating Lines";
        // NonBlockingLineCalculator();
        // showStep(3);
    //   }
    // })();

    // New blocking implementation
    for (let a = 0; a < N_PINS; a++) {
      for (let b = a + this.MIN_DISTANCE; b < N_PINS; b++) {

        let x0 = this.pin_coords[a][0];
        let y0 = this.pin_coords[a][1];

        let x1 = this.pin_coords[b][0];
        let y1 = this.pin_coords[b][1];

        let d = Math.floor(Number(Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0)*(y1 - y0))));
        let xs = linspace(x0, x1, d);
        let ys = linspace(y0, y1, d);

        this.line_cache_y[b*N_PINS + a] = ys;
        this.line_cache_y[a*N_PINS + b] = ys;
        this.line_cache_x[b*N_PINS + a] = xs;
        this.line_cache_x[a*N_PINS + b] = xs;
        this.line_cache_length[b*N_PINS + a] = d;
        this.line_cache_length[a*N_PINS + b] = d;
      }
    }
    console.log('Done Precalculating Lines');
    console.log('line_cache_x:', this.line_cache_x);
    console.log('line_cache_y:', this.line_cache_y);
    console.log('line_cache_length:', this.line_cache_length);

    // this.NonBlockingLineCalculator();
  }

  NonBlockingLineCalculator(){
    // set up necessary variables
    console.log("Drawing Lines...");
    // status.textContent = "Drawing Lines...";

    const IMG_SIZE = this.IMG_SIZE;
    const SCALE = this.SCALE;
    const MAX_LINES = this.MAX_LINES;
    const MIN_DISTANCE = this.MIN_DISTANCE;
    const N_PINS = this.N_PINS;

    console.log('R:', this.R)
    // eslint-disable-next-line no-undef
    this.error = nj.ones([IMG_SIZE, IMG_SIZE]).multiply(0xff).subtract(nj.uint8(this.R.selection.data).reshape(IMG_SIZE, IMG_SIZE));
    // eslint-disable-next-line no-undef
    this.img_result = nj.ones([IMG_SIZE, IMG_SIZE ]).multiply(0xff);
    // eslint-disable-next-line no-undef
    const result = nj.ones([IMG_SIZE * SCALE, IMG_SIZE * SCALE]).multiply(0xff);
    console.log('before new cv object')
    console.log('this.result:', this.result)
    try {
      this.result = new cv.matFromArray(IMG_SIZE * SCALE, IMG_SIZE * SCALE, cv.CV_8UC1, result.selection.data);
    } catch(e) {
      console.log('1:', IMG_SIZE * SCALE);
      // console.log('2:', IMG_SIZE * SCALE)
      console.log('3:', cv.CV_8UC1)
      console.log('4:', this.result.selection.data)
    }

    console.log('after new cv object')
    // eslint-disable-next-line no-undef
    let line_mask = nj.zeros([IMG_SIZE, IMG_SIZE], 'float64');

    this.line_sequence = [];
    let pin = 0;
    this.line_sequence.push(pin);
    let thread_length = 0;
    const last_pins = [];
    console.log('Pick implementation')
    // Old non blocking implementation
    // let l = 0;
    //
    // (function codeBlock(){
    //   if(l < MAX_LINES){
    //     if(l%10 == 0){
    //       draw();
    //     }
    //
    //     let max_err = -1;
    //     let best_pin = -1;
    //
    //     for(let offset=MIN_DISTANCE; offset < N_PINS - MIN_DISTANCE; offset++){
    //       let test_pin = (pin + offset) % N_PINS;
    //       if(last_pins.includes(test_pin)){
    //         continue;
    //       }else {
    //
    //         let xs = line_cache_x[test_pin * N_PINS + pin];
    //         let ys = line_cache_y[test_pin * N_PINS + pin];
    //
    //         let line_err = getLineErr(error, ys, xs) * line_cache_weight[test_pin * N_PINS + pin];
    //
    //         if( line_err > max_err){
    //           max_err = line_err;
    //           best_pin = test_pin;
    //         }
    //       }
    //     }
    //
    //     line_sequence.push(best_pin);
    //
    //     let xs = line_cache_x[best_pin * N_PINS + pin];
    //     let ys = line_cache_y[best_pin * N_PINS + pin];
    //     let weight = LINE_WEIGHT * line_cache_weight[best_pin * N_PINS + pin];
    //
    //     line_mask = nj.zeros([IMG_SIZE, IMG_SIZE], 'float64');
    //     line_mask = setLine(line_mask, ys, xs, weight);
    //     error = subtractArrays(error, line_mask);
    //
    //
    //
    //     let p = new cv.Point(pin_coords[pin][0] * SCALE, pin_coords[pin][1] * SCALE);
    //     let p2 = new cv.Point(pin_coords[best_pin][0] * SCALE, pin_coords[best_pin][1] * SCALE);
    //     cv.line(result, p, p2, new cv.Scalar(0, 0, 0), 2, cv.LINE_AA, 0);
    //
    //     let x0 = pin_coords[pin][0];
    //     let y0 = pin_coords[pin][1];
    //
    //     let x1 = pin_coords[best_pin][0];
    //     let y1 = pin_coords[best_pin][1];
    //
    //     let dist = Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0));
    //     thread_length += HOOP_DIAMETER / this.length * dist;
    //
    //     last_pins.push(best_pin);
    //     if(last_pins.length > 20){
    //       last_pins.shift();
    //     }
    //     pin = best_pin;
    //
    //     //update status
    //     // drawStatus.textContent = l + " Lines drawn | " + Math.round((l / MAX_LINES) * 100) + "% complete";
    //
    //     l++;
    //     setTimeout(codeBlock, 0);
    //   } else {
    //     console.log('Done Drawing Lines');
    //     Finalize();
    //   }
    // })();

    // New blocking implementation
    for (let l = 0; l < MAX_LINES; l++){
      if(l%10 == 0){
        this.draw();
      }

      let max_err = -1;
      let best_pin = -1;

      for(let offset = MIN_DISTANCE; offset < N_PINS - MIN_DISTANCE; offset++){
        let test_pin = (pin + offset) % N_PINS;
        if(last_pins.includes(test_pin)){
          continue;
        }else {

          let xs = this.line_cache_x[test_pin * N_PINS + pin];
          let ys = this.line_cache_y[test_pin * N_PINS + pin];

          let line_err = getLineErr(this.error, ys, xs) * this.line_cache_weight[test_pin * N_PINS + pin];

          if( line_err > max_err){
            max_err = line_err;
            best_pin = test_pin;
          }
        }
      }

      this.line_sequence.push(best_pin);

      let xs = this.line_cache_x[best_pin * N_PINS + pin];
      let ys = this.line_cache_y[best_pin * N_PINS + pin];
      let weight = this.LINE_WEIGHT * this.line_cache_weight[best_pin * N_PINS + pin];

      // eslint-disable-next-line no-undef
      line_mask = nj.zeros([IMG_SIZE, IMG_SIZE], 'float64');
      line_mask = setLine(line_mask, ys, xs, weight);
      this.error = subtractArrays(this.error, line_mask);


      let p = new cv.Point(this.pin_coords[pin][0] * SCALE, this.pin_coords[pin][1] * SCALE);
      let p2 = new cv.Point(this.pin_coords[best_pin][0] * SCALE, this.pin_coords[best_pin][1] * SCALE);
      cv.line(this.result, p, p2, new cv.Scalar(0, 0, 0), 2, cv.LINE_AA, 0);

      let x0 = this.pin_coords[pin][0];
      let y0 = this.pin_coords[pin][1];

      let x1 = this.pin_coords[best_pin][0];
      let y1 = this.pin_coords[best_pin][1];

      let dist = Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0));
      thread_length += this.HOOP_DIAMETER / this.length * dist;

      last_pins.push(best_pin);
      if(last_pins.length > 20){
        last_pins.shift();
      }
      pin = best_pin;
      console.log(l, 'line')
    }

    console.log('Done Drawing Lines');
    this.Finalize();
  }

  draw() {
    // const cv= this.cv;
    let dsize = new cv.Size(this.IMG_SIZE * 2, this.IMG_SIZE * 2);
    let dst = new cv.Mat();
    cv.resize(this.result, dst, dsize, 0, 0, cv.INTER_AREA);
    cv.imshow(`${this.canvasOutputID}`, dst);
    dst.delete();
  }

  Finalize() {
    // const cv = this.cv;
    let dsize = new cv.Size(this.IMG_SIZE * 2, this.IMG_SIZE * 2);
    let dst = new cv.Mat();
    cv.resize(this.result, dst, dsize, 0, 0, cv.INTER_AREA);

    console.log('complete');
    // drawStatus.textContent = MAX_LINES + " Lines drawn | 100% complete";

    cv.imshow(`${this.canvasOutputID}`, dst);
    console.log(this.line_sequence);
    // status.textContent = "Complete";
    // pinsOutput.value = line_sequence;
    // showPins.classList.remove('hidden');
    dst.delete();
    this.result.delete();
    // window.scrollTo({ top: 5000, left: 0, behavior: 'smooth' });
  }
}
