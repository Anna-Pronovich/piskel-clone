import './screens/index.css';

import App from './screens/App';
import PixelStorage from './screens/canvas/PixelStorage';
import ImageCanvas from './screens/canvas/ImageCanvas';
import Palette from './screens/tools/Palette';
import Preview from './screens/preview/Preview';

const defaultOptions = {
  pixelsInCanvasWidth: 32,
  pixelsInCanvasHeight: 32,
  pixelWidth: 10,
  pixelHeight: 10,
  pixelColor: '#000000',
};

window.onload = function load() {
  const canvasElem = document.getElementById('canvas');

  const pixelStorage = new PixelStorage(defaultOptions);
  const palette = new Palette(defaultOptions.pixelColor);
  const imageCanvas = new ImageCanvas(defaultOptions, pixelStorage, palette);
  const preview = new Preview(pixelStorage);

  const initCanvas = {
    canvas: canvasElem,
    fps: 60,
    update(step, canvas, context) {
      imageCanvas.update(step, canvas, context);
      preview.update(step, canvas, context);
      palette.update();
    },
    render(step, canvas, context) {
      imageCanvas.render(context);
      // preview.render(step, canvas, context);
      // palette.render(context);
    },
  };

  const app = new App(initCanvas);

  // frames();
  // app.start();
};
