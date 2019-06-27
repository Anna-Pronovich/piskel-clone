export default class Frame {
  constructor(pixelStorage, currentCanvas) {
    this.pixelStorage = pixelStorage;
    this.pixelsInCanvasWidth = this.pixelStorage.getCanvasSize();
    this.pixelsInCanvasHeight = this.pixelStorage.getCanvasSize();
    this.zoomInFrame = 1;
    this.setZoomInFrame();

    this.canvasFrame = currentCanvas;
    this.canvasFrame.width = this.pixelsInCanvasWidth * this.zoomInFrame;
    this.canvasFrame.height = this.pixelsInCanvasHeight * this.zoomInFrame;
    this.contextFrame = this.canvasFrame.getContext('2d');

    this.cacheFrame = null;
  }

  setPixelStorage(newPixelStorage) {
    this.pixelStorage = newPixelStorage;
  }

  getPixelStorage() {
    return this.pixelStorage;
  }

  setZoomInFrame() {
    if (this.pixelsInCanvasWidth === 32) {
      this.zoomInFrame = 3;
    } else if (this.pixelsInCanvasWidth === 64) {
      this.zoomInFrame = 2;
    }
  }

  updateCanvasInFrame() {
    this.contextFrame.clearRect(0, 0, this.canvasFrame.width, this.canvasFrame.height);

    for (let y = 1; y <= this.pixelsInCanvasHeight; y += 1) {
      for (let x = 1; x <= this.pixelsInCanvasWidth; x += 1) {
        const currentPixel = this.pixelStorage.getPixel(x, y);
        this.contextFrame.fillStyle = currentPixel.color;
        this.contextFrame.fillRect(x * this.zoomInFrame, y * this.zoomInFrame,
          this.zoomInFrame, this.zoomInFrame);
      }
    }

    this.cacheFrame = this.contextFrame.getImageData(0, 0,
      this.canvasFrame.width, this.canvasFrame.height);
  }
}
