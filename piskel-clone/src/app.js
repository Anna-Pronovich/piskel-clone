import './index.css';
import PixelStorage from './screens/canvas/PixelStorage';
import ImageCanvas from './screens/canvas/ImageCanvas';
import Palette from './screens/tools/Palette';
import Preview from './screens/preview/Preview';
import Tools from './screens/tools/Tools';

const app = {
  imageCanvas: undefined,
  preview: undefined,
  defaultOptions: {
    canvasSize: 32,
    zoom: 10,
    currentColor: '#00ccffff',
    currentTool: 'pen',
  },

  init(options) {
    const pixelStorage = new PixelStorage(options);
    const palette = new Palette(options.currentColor);
    const tools = new Tools(options.currentTool);
    this.imageCanvas = new ImageCanvas(options, pixelStorage, palette);
    this.preview = new Preview(pixelStorage);

    document.getElementById('cavasZoom').innerHTML = `zoom:  ${options.zoom}`;
    document.getElementById('canvasSize').innerHTML = `canvas size :  ${options.canvasSize} x ${options.canvasSize}`;
    document.getElementById('mouseCoordinates').innerHTML = 'coordinates x/y:  0 x 0 ';

    document.getElementById('resize_btn').addEventListener('click', () => {
      const newOptions = options;
      const choosingCanvasSize = +document.querySelector('input[name="canvasSize"]:checked').value;
      if (choosingCanvasSize !== options.canvasSize) {
        // if (confirm('If you change the canvas size, you will lose your picture. Continue?')) {}
        newOptions.canvasSize = choosingCanvasSize;
        newOptions.currentColor = palette.getCurrentColor();
        newOptions.currentTool = tools.getCurrentTool();
        app.init(options);
      }
    });
  },

  update() {
    this.imageCanvas.update();
    this.preview.update();
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

window.addEventListener('load', () => {
  app.start();
});
