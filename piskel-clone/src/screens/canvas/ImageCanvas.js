import { mouseProperties, addMouseListeners } from './mouse';

export default class ImageCanvas {
  constructor(options, pixelStorage, palette, tool) {
    this.pixelStorage = pixelStorage;
    this.palette = palette;
    this.tool = tool;

    this.pixelsInWidth = options.canvasSize;
    this.pixelsInHeight = options.canvasSize;
    this.zoom = options.zoom;
    this.pixelWidth = this.zoom;
    this.pixelHeight = this.zoom;

    this.canvas = document.getElementById('canvas');
    this.context = this.canvas.getContext('2d');
    this.canvas.width = this.pixelsInWidth * this.pixelWidth;
    this.canvas.height = this.pixelsInHeight * this.pixelHeight;

    this.context.fillStyle = '#FFFFFF';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.canvasGrid = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);

    addMouseListeners(this.canvas, this.zoom);
  }

  static checkMouseInPixel(currentPixel) {
    const isInWidth = (mouseProperties.x >= currentPixel.x)
      && mouseProperties.x <= (currentPixel.x + currentPixel.w);

    const isInHeight = (mouseProperties.y >= currentPixel.y)
      && mouseProperties.y <= (currentPixel.y + currentPixel.h);

    return isInWidth && isInHeight;
  }

  update() {
    for (let y = 1; y <= this.pixelsInHeight; y += 1) {
      for (let x = 1; x <= this.pixelsInWidth; x += 1) {
        const currentPixel = this.pixelStorage.getPixel(x, y);

        currentPixel.mouseOver = false;

        if (ImageCanvas.checkMouseInPixel(currentPixel)) {
          currentPixel.mouseOver = true;
          if (mouseProperties.events.mousedown && mouseProperties.events.mouseButton === 1) {
            currentPixel.selected = true;
            const curentTool = this.tool.getCurrentTool();
            if (curentTool === 'tool-pen') {
              currentPixel.color = this.palette.getCurrentColor();
            } else if (curentTool === 'tool-eraser') {
              currentPixel.color = '#ffffff';
            } else if (curentTool === 'tool-color-picker') {
              this.palette.setCurrentColor(currentPixel.color);
            }
          }
        }
        this.pixelStorage.setPixel(x, y, currentPixel);
      }
    }
  }

  render() {
    this.context.putImageData(this.canvasGrid, 0, 0);

    for (let y = 1; y <= this.pixelsInHeight; y += 1) {
      for (let x = 1; x <= this.pixelsInWidth; x += 1) {
        const currentPixel = this.pixelStorage.getPixel(x, y);

        if (currentPixel.selected) {
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
