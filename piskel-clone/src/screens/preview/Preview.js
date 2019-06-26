import FramesList from "../../components/frames-list/FramesList";

// import FramesList from '../../components/frames-list/FramesList'
export default class Preview {
  constructor(framesList) {

    // this.framesList = new FramesList();
    // this.lidt = this.framesList.getFramesList();
    this.pixelStorage = pixelStorage;

    this.pixelsInCanvasWidth = this.pixelStorage.pixelsInWidth;
    this.pixelsInCanvasHeight = this.pixelStorage.pixelsInHeight;

    this.canvasPreview = document.getElementById('canvas-preview');
    this.canvasPreview.width = this.pixelsInCanvasWidth;
    this.canvasPreview.height = this.pixelsInCanvasHeight;
    this.contextPreview = this.canvasPreview.getContext('2d');

    this.cachePreview = null;
  }

  update() {
    this.contextPreview.clearRect(0, 0, this.canvasPreview.width, this.canvasPreview.height);

    for (let y = 1; y <= this.pixelsInCanvasHeight; y += 1) {
      for (let x = 1; x <= this.pixelsInCanvasWidth; x += 1) {
        const currentPixel = this.pixelStorage.getPixel(x, y);
        this.contextPreview.fillStyle = currentPixel.color;
        this.contextPreview.fillRect((0 + x - 1), (0 + y - 1), 2, 2);
      }
    }

    this.cachePreview = this.contextPreview.getImageData(0, 0,
      this.canvasPreview.width, this.canvasPreview.height);
  }
}
