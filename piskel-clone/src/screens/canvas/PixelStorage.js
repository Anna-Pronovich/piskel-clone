export default class PixelStorage {
  constructor(options) {
    this.pixels = [];
    this.numberPixelsInWidth = options.pixelsInCanvasWidth;
    this.numberPixelsInHeight = options.pixelsInCanvasHeight;
    this.pixelWidth = options.pixelWidth;
    this.pixelHeight = options.pixelHeight;
    this.reset();
  }

  setPixel(row, col, value) {
    this.pixels[this.numberPixelsInWidth * row + col] = value;
  }

  getPixel(row, col) {
    return this.pixels[this.numberPixelsInWidth * row + col];
  }

  // getArrayPixels() {
  //   return this.pixels;
  // }

  // setArrayPixels(pixels) {
  //   this.pixels = pixels;
  // }

  reset() {
    for (let col = 1; col <= this.numberPixelsInHeight; col += 1) {
      for (let row = 1; row <= this.numberPixelsInWidth; row += 1) {
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
