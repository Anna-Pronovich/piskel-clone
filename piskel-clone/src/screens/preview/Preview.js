export default class Preview {
  constructor(pixelStorage) {
    this.pixelStorage = pixelStorage;

    this.pixelsInCanvasWidth = 32;
    this.pixelsInCanvasHeight = 32;

    this.canvasPreview = document.getElementById('canvas-preview');
    this.canvasPreview.width = 50;
    this.canvasPreview.height = 50;
    this.contextPreview = this.canvasPreview.getContext('2d');

    this.cachePreview = null;
  }

  // render(step, canvas, context) {
  //   if (!this.loaded) {
  //     return;
  //   }
  //   // context.putImageData(this.cachePreview,0, 0);
  // }

  update() {
    this.contextPreview.clearRect(0, 0, 50, 50);

    for (let y = 1; y <= this.pixelsInCanvasHeight; y += 1) {
      for (let x = 1; x <= this.pixelsInCanvasWidth; x += 1) {
        const currentPixel = this.pixelStorage.getPixel(x, y);
        if (currentPixel.on) {
          this.contextPreview.fillStyle = currentPixel.color;
          this.contextPreview.fillRect((0 + x - 1), (0 + y - 1), 2, 2);
        }
      }
    }

    this.cachePreview = this.contextPreview.getImageData(0, 0, 50, 50);
  }
}
