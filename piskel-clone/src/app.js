import './index.css';
import PixelStorage from './screens/canvas/PixelStorage';
import ImageCanvas from './screens/canvas/ImageCanvas';
import Palette from './screens/tools/Palette';
// import Preview from './screens/preview/Preview';

const app = {
  imageCanvas: undefined,
  defaultOptions: {
    canvasSize: 32,
    zoom: 5,
    currentColor: '#00ccffff',
    currentTool: 'pen',
  },

  init(options) {
    const pixelStorage = new PixelStorage(options);
    const palette = new Palette(options.currentColor);
    this.imageCanvas = new ImageCanvas(options, pixelStorage, palette);


    document.getElementById('cavasZoom').innerHTML = `zoom:  ${options.zoom}`;
    document.getElementById('canvasSize').innerHTML = `canvas size :  ${options.canvasSize} x ${options.canvasSize}`;
    document.getElementById('mouseCoordinates').innerHTML = 'coordinates x/y:  0 x 0 ';


    document.getElementById('resize_btn').addEventListener('click', () => {
      const choosingCanvasSize = document.querySelector('input[name="canvasSize"]:checked').value;
      if (choosingCanvasSize === options.canvasSize) {
        return false;
      }
      if (confirm('Если Вы поменяете сейчас размер, то Вы потеряете свой рисунок. Продолжить?')) {
        options.canvasSize = choosingCanvasSize;
        app.init(options);
      }
      return false;
    });
  },

  update() {
    this.imageCanvas.update();
  },

  render() {
    this.imageCanvas.render();
  },

  run() {
    this.render();
    this.update();
    window.requestAnimationFrame(() => {
      app.run();
    });
  },

  start() {
    this.init(this.defaultOptions);
    this.run();
  },
};

// const pixelStorage = new PixelStorage(app.defaultOptions);
// const palette = new Palette(app.defaultOptions.pixelColor);
// const imageCanvas = new ImageCanvas(app.defaultOptions, pixelStorage, palette);
// const preview = new Preview(pixelStorage);

window.addEventListener('load', () => {
  app.start();
});
