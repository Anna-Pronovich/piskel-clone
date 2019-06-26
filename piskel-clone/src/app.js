import './index.css';
import PixelStorage from './screens/canvas/PixelStorage';
import ImageCanvas from './screens/canvas/ImageCanvas';
import FramesList from './components/frames-list/FramesList';
// import Preview from './screens/preview/Preview';

class App {
  constructor() {
    this.zoom = 5;
    this.canvasSize = +document.querySelector('input[name="canvasSize"]:checked').value;

    this.pixelStorage = null;
    this.imageCanvas = null;

    this.framesList = new FramesList();

    document.getElementById('canvasZoomInfo').innerHTML = `zoom:  ${this.zoom}`;
    document.getElementById('canvasSizeInfo').innerHTML = `canvas size :
      ${this.canvasSize} x ${this.canvasSize}`;
    document.getElementById('mouseCoordinatesInfo').innerHTML = 'coordinates x/y:  0 x 0 ';

    document.getElementById('resize_btn').addEventListener('click', () => this.resiseCanvas());
    document.getElementById('add-frame_btn').addEventListener('click', () => this.addNewFrame());
  }

  init() {
    this.pixelStorage = new PixelStorage(this.canvasSize, this.zoom);
    this.imageCanvas = new ImageCanvas(this.pixelStorage);
    this.framesList.setCurrentPixelStorage(this.pixelStorage);
    this.framesList.drawImageInFrame();
  }

  addNewFrame() {
    this.framesList.updateFramesStorage();
    this.framesList.removeActiveClass();
    this.framesList.drawFrame();
    this.framesList.updateActiveElements();
    this.init();
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
    this.framesList.update();
    // this.preview.update();
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
