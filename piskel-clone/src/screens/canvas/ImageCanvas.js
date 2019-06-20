import { mouseProperties, addMouseListeners } from './mouse';

export default class ImageCanvas {
  constructor(options, pixelStorage, palette) {
    this.pixelStorage = pixelStorage;
    this.palette = palette;

    this.numberPixelsInWidth = options.pixelsInCanvasWidth;
    this.numberPixelsInHeight = options.pixelsInCanvasHeight;
    this.pixelWidth = options.pixelWidth;
    this.pixelHeight = options.pixelHeight;

    this.canvas = document.getElementById('canvas');
    this.context = this.canvas.getContext('2d');
    this.canvas.width = this.numberPixelsInWidth * this.pixelWidth;
    this.canvas.height = this.numberPixelsInHeight * this.pixelHeight;

    this.context.fillStyle = '#FFFFFF';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.canvasGrid = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
    this.hasFocus = false;

    addMouseListeners(this.canvas);
  }

  update() {
    for (let y = 1; y <= this.numberPixelsInHeight; y += 1) {
      for (let x = 1; x <= this.numberPixelsInWidth; x += 1) {
        const currentPixel = this.pixelStorage.getPixel(x, y);

        currentPixel.mouseOver = false;

        const condition1 = (mouseProperties.x >= currentPixel.x)
          && mouseProperties.x <= (currentPixel.x + currentPixel.w);

        const condition2 = (mouseProperties.y >= currentPixel.y)
          && mouseProperties.y <= (currentPixel.y + currentPixel.h);


        if (condition1 && condition2) {
          currentPixel.mouseOver = true;
          if (mouseProperties.events.mousedown && mouseProperties.events.mouseButton === 1) {
            currentPixel.on = true;
            currentPixel.color = this.palette.getCurrentColor();
            // currentPixel.color = '#000000';
          }
        }
        this.pixelStorage.setPixel(x, y, currentPixel);
      }
    }
  }

  render() {
    this.context.putImageData(this.canvasGrid, 0, 0);

    for (let y = 1; y <= this.numberPixelsInHeight; y += 1) {
      for (let x = 1; x <= this.numberPixelsInWidth; x += 1) {
        const currentPixel = this.pixelStorage.getPixel(x, y);

        if (currentPixel.on) {
          this.context.fillStyle = currentPixel.color;
          this.context.fillRect(currentPixel.x, currentPixel.y,
            this.pixelWidth, this.pixelHeight);
        }

        if (currentPixel.mouseOver) {
          this.context.fillStyle = 'rgba(0,0,0,0.2)';
          this.context.fillRect(currentPixel.x, currentPixel.y,
            this.pixelWidth, this.pixelHeight);
        }
      }
    }
  }
}
