import './index.css';
import PixelStorage from './screens/canvas/PixelStorage';
import ImageCanvas from './screens/canvas/ImageCanvas';
import Palette from './screens/tools/Palette';
import Preview from './screens/preview/Preview';
import Tool from './screens/tools/Tool';


const app = {
  imageCanvas: undefined,
  frame: undefined,
  preview: undefined,
  defaultOptions: {
    canvasSize: 64,
    zoom: 5,
    currentColor: '#00ccffff',
    currentTool: 'tool-pen',
    penSize: 2,
  },

  init(options) {
    const pixelStorage = new PixelStorage(options);
    const palette = new Palette(options.currentColor);
    const tool = new Tool(options.currentTool);
    this.imageCanvas = new ImageCanvas(options, pixelStorage, palette, tool);
    this.preview = new Preview(pixelStorage);

    document.getElementById('cavasZoomInfo').innerHTML = `zoom:  ${options.zoom}`;
    document.getElementById('canvasSizeInfo').innerHTML = `canvas size :  ${options.canvasSize} x ${options.canvasSize}`;
    document.getElementById('mouseCoordinatesInfo').innerHTML = 'coordinates x/y:  0 x 0 ';

    document.getElementById('resize_btn').addEventListener('click', () => {
      const newOptions = options;
      const choosingCanvasSize = +document.querySelector('input[name="canvasSize"]:checked').value;
      if (choosingCanvasSize !== options.canvasSize) {
        // if (confirm('If you change the canvas size, you will lose your picture. Continue?')) {}
        newOptions.canvasSize = choosingCanvasSize;
        newOptions.currentColor = palette.getCurrentColor();
        newOptions.currentTool = tool.getCurrentTool();
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
