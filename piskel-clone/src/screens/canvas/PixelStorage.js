export default class PixelStorage {
  constructor(canvasSize, zoom) {
    this.pixels = [];

    this.canvasSize = canvasSize;
    this.pixelsInWidth = this.canvasSize;
    this.pixelsInHeight = this.canvasSize;

    this.pixelSize = zoom;
    this.pixelWidth = this.pixelSize;
    this.pixelHeight = this.pixelSize;
    this.reset();
  }

  setPixel(row, col, value) {
    this.pixels[this.pixelsInWidth * row + col] = value;
  }

  getPixel(row, col) {
    return this.pixels[this.pixelsInWidth * row + col];
  }

  getCanvasSize() {
    return this.canvasSize;
  }

  getPixelSize() {
    return this.pixelSize;
  }

  changeCanvasSize(canvasSize) {
    this.pixelsInWidth = canvasSize;
    this.pixelsInHeight = canvasSize;
    this.reset();
  }

  getArrayPixels() {
    return this.pixels;
  }

  setArrayPixels(pixels) {
    this.pixels = pixels;
  }

  reset() {
    for (let col = 1; col <= this.pixelsInHeight; col += 1) {
      for (let row = 1; row <= this.pixelsInWidth; row += 1) {
        this.setPixel(
          row, col, {
            mouseOver: false,
            color: '#ffffff',
            selected: false,
            x: ((row - 1) * this.pixelWidth),
            y: ((col - 1) * this.pixelHeight),
            h: (this.pixelHeight),
            w: (this.pixelWidth),
          },
        );
      }
    }
  }
}
