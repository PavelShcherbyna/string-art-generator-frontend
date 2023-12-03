// Functions that change canvas brightness and contrast. They must receive canvas imageData.data as first argument, and value from -100 to 100 as second argument.
export function applyBrightness(data, brightness) {
  for (let i = 0; i < data.length; i += 4) {
    data[i] += 255 * (brightness / 100);
    data[i + 1] += 255 * (brightness / 100);
    data[i + 2] += 255 * (brightness / 100);
  }
}

function truncateColor(value) {
  if (value < 0) {
    value = 0;
  } else if (value > 255) {
    value = 255;
  }

  return value;
}

export function applyContrast(data, contrast) {
  const factor = (259.0 * (contrast + 255.0)) / (255.0 * (259.0 - contrast));

  for (let i = 0; i < data.length; i += 4) {
    data[i] = truncateColor(factor * (data[i] - 128.0) + 128.0);
    data[i + 1] = truncateColor(factor * (data[i + 1] - 128.0) + 128.0);
    data[i + 2] = truncateColor(factor * (data[i + 2] - 128.0) + 128.0);
  }
}
// ---
