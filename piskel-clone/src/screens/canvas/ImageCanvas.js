import { mouseProperties, addMouseListeners } from './mouse';
import Palette from '../tools/Palette';
import Tool from '../tools/Tool';

export default class ImageCanvas {
  constructor(pixelStorage, zoom) {
    this.palette = new Palette();
    this.tool = new Tool();

    this.pixelStorage = pixelStorage;

    this.pixelsInWidth = this.pixelStorage.getCanvasSize();
    this.pixelsInHeight = this.pixelStorage.getCanvasSize();

    this.pixelWidth = this.pixelStorage.getPixelSize();
    this.pixelHeight = this.pixelStorage.getPixelSize();

    this.canvas = document.getElementById('canvas-main');
    this.context = this.canvas.getContext('2d');
    this.canvas.width = this.pixelsInWidth * this.pixelWidth;
    this.canvas.height = this.pixelsInHeight * this.pixelHeight;

    this.context.fillStyle = '#FFFFFF';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.canvasGrid = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);

    this.zoom = zoom;
    addMouseListeners(this.canvas, this.zoom);
  }

  setPixelSrorage(newPixelStorage) {
    this.pixelStorage = newPixelStorage;
  }

  getPixelStorage() {
    return this.pixelStorage;
  }

  getCanvassize() {
    return this.pixelsInWidth;
  }

  fillCanvas() {
    const currentColor = this.palette.getCurrentColor();
    const pixelsArray = this.pixelStorage.getArrayPixels();
    for (let i = 0; i < pixelsArray.length; i += 1) {
      if (pixelsArray[i]) {
        pixelsArray[i].color = currentColor;
      }
    }
  }

  static checkMouseInPixel(currentPixel) {
    const isInWidth = (mouseProperties.x >= currentPixel.x)
      && mouseProperties.x <= (currentPixel.x + currentPixel.w);

    const isInHeight = (mouseProperties.y >= currentPixel.y)
      && mouseProperties.y <= (currentPixel.y + currentPixel.h);

    return isInWidth && isInHeight;
  }

  paintPenSize2x(x, y, currentColor) {
    const currentPixelTop = this.pixelStorage.getPixel(x, y + 1);
    const currentPixelTopLeft = this.pixelStorage.getPixel(x - 1, y + 1);
    const currentPixelleft = this.pixelStorage.getPixel(x - 1, y);

    currentPixelTop.color = currentColor;
    currentPixelTopLeft.color = currentColor;
    currentPixelleft.color = currentColor;

    this.pixelStorage.setPixel(x, y + 1, currentPixelTop);
    this.pixelStorage.setPixel(x - 1, y + 1, currentPixelTopLeft);
    this.pixelStorage.setPixel(x - 1, y, currentPixelleft);
  }

  customShape(x, y, currentColor) {
    const pixelTopRight = this.pixelStorage.getPixel(x + 1, y + 1);
    const pixelTopleft = this.pixelStorage.getPixel(x - 1, y + 1);
    const pixelBottomRight = this.pixelStorage.getPixel(x + 1, y - 1);
    const pixelBottomleft = this.pixelStorage.getPixel(x - 1, y - 1);

    pixelTopRight.color = currentColor;
    pixelTopleft.color = currentColor;
    pixelBottomRight.color = currentColor;
    pixelBottomleft.color = currentColor;

    this.pixelStorage.setPixel(x + 1, y + 1, pixelTopRight);
    this.pixelStorage.setPixel(x - 1, y + 1, pixelTopleft);
    this.pixelStorage.setPixel(x + 1, y - 1, pixelBottomRight);
    this.pixelStorage.setPixel(x - 1, y - 1, pixelBottomleft);
  }

  drawLine(x0, y0, x1, y1, color) {
    let xStart = x0;
    let yStart = y0;
    const setPixel = (newX, newY) => {
      for (let y = 1; y <= this.pixelsInHeight; y += 1) {
        for (let x = 1; x <= this.pixelsInWidth; x += 1) {
          const currentPixel = this.pixelStorage.getPixel(x, y);
          if ((newX >= currentPixel.x)
            && newX <= (currentPixel.x + currentPixel.w)
            && (newY >= currentPixel.y)
            && newY <= (currentPixel.y + currentPixel.h)) {
            currentPixel.color = color;
            this.pixelStorage.setPixel(x, y, currentPixel);
          }
        }
      }
    };

    const dx = Math.abs(x1 - xStart);
    const dy = Math.abs(y1 - yStart);
    const sx = (xStart < x1) ? 1 : -1;
    const sy = (yStart < y1) ? 1 : -1;
    let err = dx - dy;
    const continueStroke = true;
    while (continueStroke) {
      setPixel(xStart, yStart);

      if ((xStart === x1) && (yStart === y1)) break;
      const e2 = 2 * err;
      if (e2 > -dy) { err -= dy; xStart += sx; }
      if (e2 < dx) { err += dx; yStart += sy; }
    }
  }

  update() {
    for (let y = 1; y <= this.pixelsInHeight; y += 1) {
      for (let x = 1; x <= this.pixelsInWidth; x += 1) {
        const currentPixel = this.pixelStorage.getPixel(x, y);

        currentPixel.mouseOver = false;

        const currentColor = this.palette.getCurrentColor();
        const curentTool = this.tool.getCurrentTool();
        const penSize = this.tool.getPenSize();

        if (ImageCanvas.checkMouseInPixel(currentPixel)) {
          currentPixel.mouseOver = true;
          if (curentTool !== 'tool-stroke') {
            if (mouseProperties.events.mousedown && mouseProperties.events.mouseButton === 1) {
              currentPixel.selected = true;

              if (curentTool === 'tool-pen') {
                currentPixel.color = currentColor;
                this.pixelStorage.setPixel(x, y, currentPixel);

                if (penSize === 2) {
                  this.paintPenSize2x(x, y, currentColor);
                }
              } else if (curentTool === 'tool-eraser') {
                currentPixel.color = '#ffffff';
                this.pixelStorage.setPixel(x, y, currentPixel);

                if (penSize === 2) {
                  this.paintPenSize2x(x, y, '#ffffff');
                }
              } else if (curentTool === 'tool-color-picker') {
                this.palette.setCurrentColor(currentPixel.color);
              } else if (curentTool === 'tool-paint-bucket') {
                this.fillCanvas();
              } else if (curentTool === 'tool-custom') {
                this.customShape(x, y, currentColor);
              }
            }
          }

          if (curentTool === 'tool-stroke') {
            if (mouseProperties.events.mouseover) {
              if (mouseProperties.events.mouseup) {
                const startPosX = mouseProperties.xStart;
                const startPosY = mouseProperties.yStart;
                const endPosX = mouseProperties.xEnd;
                const endPosY = mouseProperties.yEnd;
                this.drawLine(startPosX, startPosY, endPosX, endPosY, currentColor);
              }
            }
          }
        }
      }
    }
  }

  render() {
    this.context.putImageData(this.canvasGrid, 0, 0);

    for (let y = 1; y <= this.pixelsInHeight; y += 1) {
      for (let x = 1; x <= this.pixelsInWidth; x += 1) {
        const currentPixel = this.pixelStorage.getPixel(x, y);
        this.context.fillStyle = currentPixel.color;
        this.context.fillRect(currentPixel.x, currentPixel.y,
          this.pixelWidth, this.pixelHeight);

        if (currentPixel.mouseOver) {
          this.context.fillStyle = 'rgba(0,0,0,0.2)';
          this.context.fillRect(currentPixel.x, currentPixel.y,
            this.pixelWidth, this.pixelHeight);
        }
      }
    }
  }
}
