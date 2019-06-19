import { mouseProperties } from '../mouse';
import PixelStorage from './PixelStorage';

export default class ImageCanvas {
  constructor(options) {
    this.numberPixelsInWidth = options.pixelsInCanvasWidth;
    this.numberPixelsInHeight = options.pixelsInCanvasHeight;
    this.pixelWidth = options.pixelWidth;
    this.pixelHeight = options.pixelHeight;
    this.offset = options.offset;

    this.pixelStorage = new PixelStorage(options);
    this.pixelStorage.reset();

    this.canvasWidth = (this.numberPixelsInWidth * this.pixelWidth);
    this.canvasHeight = (this.numberPixelsInHeight * this.pixelHeight);

    this.canvas = document.createElement('canvas');
    this.canvas.width = this.canvasWidth;
    this.canvas.height = this.canvasHeight;
    this.context = this.canvas.getContext('2d');

    this.context.fillStyle = '#999999';
    this.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.context.stroke();

    this.context.fillStyle = '#FFFFFF';
    this.context.fillRect(1, 1, (this.canvasWidth - 2), (this.canvasHeight - 2));
    // document.getElementById('canvasContainer').appendChild(this.canvas);

    this.canvasGrid = this.context.getImageData(0, 0, this.canvasWidth, this.canvasHeight);
  }

  setPalette(palette) {
    this.palette = palette;
  }

  get(property) {
    // if (this.hasOwnProperty(property)) {
    //   return this[property];
    // }
    // return null;
    return this.hasOwnProperty(property) ? this[property] : null;
  }

  // getCurrentPixel(x, y){
  //   const currentPixel = this.pixelStorage.getPixel(x, y);
  //   const posInWidth = this.offset.x + currentPixel.x;
  //   const posInHeight = this.offset.y + currentPixel.y;
  //   return { posInWidth, posInHeight };
  // }

  update() {
    for (let y = 1; y <= this.numberPixelsInHeight; y += 1) {
      for (let x = 1; x <= this.numberPixelsInWidth; x += 1) {
        // let currentPixel = getCurrentPixel(x, y);
        // console.log('currentPixel ' + currentPixel);
        const currentPixel = this.pixelStorage.getPixel(x, y);

        currentPixel.mouseOver = false;

        const condition1 = mouseProperties.x >= (this.offset.x + currentPixel.x)
          && mouseProperties.x <= (this.offset.x + currentPixel.x + currentPixel.w);

        const condition2 = mouseProperties.y >= (this.offset.y + currentPixel.y)
          && mouseProperties.y <= (this.offset.y + currentPixel.y + currentPixel.h);

        // const condition1 = (mouseProperties.x >= currentPixel.posInWidth)
        //   && mouseProperties.x <= (urrentPixel.posInWidth + this.pixelWidth);

        // const condition2 = (mouseProperties.y >= currentPixel.posInHeight)
        //   && mouseProperties.y <= (currentPixel.posInHeight + pixelHeight);

        if (condition1 && condition2) {
          currentPixel.mouseOver = true;
          if (mouseProperties.events.mousedown && mouseProperties.events.mouseButton === 1) {
            currentPixel.on = true;
            currentPixel.color = this.palette.getCurrentColor();
          }
        }
        this.pixelStorage.setPixel(x, y, currentPixel);
      }
    }
  }

  render(context) {
    context.putImageData(this.canvasGrid, this.offset.x, this.offset.y);

    for (let y = 1; y <= this.numberPixelsInHeight; y += 1) {
      for (let x = 1; x <= this.numberPixelsInWidth; x += 1) {
        const currentPixel = this.pixelStorage.getPixel(x, y);

        if (currentPixel.on) {
          context.fillStyle = currentPixel.color;
          context.fillRect(
            (this.offset.x + currentPixel.x),
            (this.offset.y + currentPixel.y),
            (this.pixelWidth),
            (this.pixelHeight),
          );
        }

        if (currentPixel.mouseOver) {
          context.fillStyle = 'rgba(0,0,0,0.2)';
          context.fillRect(
            (this.offset.x + currentPixel.x),
            (this.offset.y + currentPixel.y),
            (this.pixelWidth),
            (this.pixelHeight),
          );
        }
      }
    }
  }
}
