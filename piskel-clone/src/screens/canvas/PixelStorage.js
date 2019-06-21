export default class PixelStorage {
  constructor(options) {
    this.pixels = [];
    this.pixelsInWidth = options.canvasSize;
    this.pixelsInHeight = options.canvasSize;
    this.zoom = options.zoom;
    this.pixelWidth = this.zoom;
    this.pixelHeight = this.zoom;
    this.reset();
  }

  setPixel(row, col, value) {
    this.pixels[this.pixelsInWidth * row + col] = value;
  }

  getPixel(row, col) {
    return this.pixels[this.pixelsInWidth * row + col];
  }

  // getArrayPixels() {
  //   return this.pixels;
  // }

  // setArrayPixels(pixels) {
  //   this.pixels = pixels;
  // }

  reset() {
    for (let col = 1; col <= this.pixelsInHeight; col += 1) {
      for (let row = 1; row <= this.pixelsInWidth; row += 1) {
        this.setPixel(
          row, col, {
            mouseOver: false,
            color: '#ffffff',
            on: false,
            x: ((row - 1) * this.pixelWidth),
            y: ((col - 1) * this.pixelHeight),
            h: (this.pixelHeight - 1),
            w: (this.pixelWidth - 1),
          },
        );
      }
    }
  }
}
