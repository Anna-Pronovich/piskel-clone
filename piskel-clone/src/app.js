import './index.css';
import PixelStorage from './screens/canvas/PixelStorage';
import ImageCanvas from './screens/canvas/ImageCanvas';
import FramesList from './components/frames-list/FramesList';
import Preview from './screens/preview/Preview';

class App {
  constructor() {
    this.zoom = 5;
    this.canvasSize = +document.querySelector('input[name="canvasSize"]:checked').value;

    this.pixelStorage = null;
    this.imageCanvas = null;

    this.framesList = new FramesList();
    this.preview = new Preview();

    document.getElementById('canvasZoomInfo').innerHTML = `zoom:  ${this.zoom}`;
    document.getElementById('canvasSizeInfo').innerHTML = `canvas size :
      ${this.canvasSize} x ${this.canvasSize}`;
    document.getElementById('mouseCoordinatesInfo').innerHTML = 'coordinates x/y:  0 x 0 ';

    document.getElementById('resize_btn').addEventListener('click', () => this.resiseCanvas());
    document.getElementById('add-frame_btn').addEventListener('click', () => this.addNewFrame());
    document.addEventListener('keydown', event => this.handleKeyDown(event));
  }

  handleKeyDown(event) {
    if (event.shiftKey && event.which === 81) {
      this.addNewFrame();
    }
  }

  init() {
    this.pixelStorage = new PixelStorage(this.canvasSize, this.zoom);
    this.imageCanvas = new ImageCanvas(this.pixelStorage, this.zoom);

    this.framesList.setCurrentPixelStorage(this.pixelStorage);
    this.framesList.setImageCanvas(this.imageCanvas);
    this.framesList.drawImageInFrame();
    this.framesList.updateFramesStorage();
  }

  addNewFrame() {
    // this.framesList.updateFramesStorage();
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

  function toggleOpenState() {
    const modalWindow = document.getElementById('modal-wrapper');
    modalWindow.classList.toggle('open');
  }

  function toggleBlurState() {
    const btnShortcuts = document.getElementById('shotcuts_btn-wrapper');
    btnShortcuts.classList.toggle('blur-it');
  }

  const btns = document.getElementsByClassName('trigger');
  [].forEach.call(btns, (btn) => {
    btn.addEventListener('click', toggleOpenState, false);
    btn.addEventListener('click', toggleBlurState, false);
  });

  const btnDownload = document.getElementById('save_btn');
  const canvasForSaving = document.getElementById('canvas-main');

  function download(canvas, filename) {
    const link = document.createElement('a');
    let newEvent;
    link.download = filename;
    link.href = canvas.toDataURL('image/png;base64');

    if (document.createEvent) {
      newEvent = document.createEvent('MouseEvents');
      newEvent.initMouseEvent('click', true, true, window,
        0, 0, 0, 0, 0, false, false, false,
        false, 0, null);

      link.dispatchEvent(newEvent);
    } else if (link.fireEvent) {
      link.fireEvent('onclick');
    }
  }
  btnDownload.onclick = function save() {
    download(canvasForSaving, 'myimage.png');
  };
});
