import './index.css';
import PixelStorage from './screens/canvas/PixelStorage';
import ImageCanvas from './screens/canvas/ImageCanvas';
import Preview from './screens/preview/Preview';
// import Frame from './components/frames-list/Frames';

class App {
  constructor() {
    this.zoom = 5;
    this.canvasSize = +document.querySelector('input[name="canvasSize"]:checked').value;

    this.pixelStorage = null;
    this.imageCanvas = null;

    // this.frame = null;
    this.preview = null;

    document.getElementById('canvasZoomInfo').innerHTML = `zoom:  ${this.zoom}`;
    document.getElementById('canvasSizeInfo').innerHTML = `canvas size :
      ${this.canvasSize} x ${this.canvasSize}`;
    document.getElementById('mouseCoordinatesInfo').innerHTML = 'coordinates x/y:  0 x 0 ';

    document.getElementById('resize_btn').addEventListener('click', () => this.resiseCanvas());
  }

  init() {
    this.pixelStorage = new PixelStorage(this.canvasSize, this.zoom);
    this.imageCanvas = new ImageCanvas(this.pixelStorage);
    // this.frame = new Frame(this.pixelStorage);
    this.preview = new Preview(this.pixelStorage);
  }

  resiseCanvas() {
    const choosingCanvasSize = +document.querySelector('input[name="canvasSize"]:checked').value;
    if (choosingCanvasSize !== this.imageCanvas.getCanvassize()) {
      this.canvasSize = choosingCanvasSize;
      this.init(this.canvasSize, this.zoom);
    }
  }

  update() {
    this.imageCanvas.update();
    this.preview.update();
    // this.frame.updateCanvasInFrame();
  }

  render() {
    this.imageCanvas.render();
  }

  run() {
    this.render();
    this.update();
    window.requestAnimationFrame(() => {
      this.run();
    });
  }

  start() {
    this.init(this.canvasSize, this.zoom);
    this.run();
  }
}

window.addEventListener('load', () => {
  const app = new App();
  app.start();
});
