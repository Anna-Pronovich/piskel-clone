import './index.css';
import PixelStorage from './screens/canvas/PixelStorage';
import ImageCanvas from './screens/canvas/ImageCanvas';
import Palette from './screens/tools/Palette';
// import Preview from './screens/preview/Preview';

const app = {
  imageCanvas: undefined,
  defaultOptions: {
    pixelsInCanvasWidth: 32,
    pixelsInCanvasHeight: 32,
    pixelWidth: 10,
    pixelHeight: 10,
    currentColor: '#000000',
    currentTool: 'pen',
  },

  init(options) {
    const pixelStorage = new PixelStorage(options);
    const palette = new Palette(options.currentColor);
    this.imageCanvas = new ImageCanvas(options, pixelStorage, palette);
  },

  update() {
    this.imageCanvas.update();
    // return true;
  },

  render() {
    this.imageCanvas.render();
    // return true;
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
