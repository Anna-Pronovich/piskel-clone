import './screens/index.css';
import { addMouseListeners } from './screens/mouse';
import App from './screens/App';
import ImageCanvas from './screens/canvas/ImageCanvas';
import Palette from './screens/tools/Palette';
import frames from './screens/frames/Frames'
// import Preview from './screens/preview/Preview';

const defaultOptions = {
  pixelsInCanvasWidth: 32,
  pixelsInCanvasHeight: 32,
  pixelWidth: 20,
  pixelHeight: 20,
  offset: { x: 10, y: 10 },
  pixelColour: '#000000',
};

window.onload = function load() {
  const palette = new Palette();
  const imageCanvas = new ImageCanvas(defaultOptions);
  imageCanvas.setPalette(palette);

  const preview = new Preview({ imageCanvas });

  const canvasElem = document.getElementById('canvas');
  // const canvasContainer = document.getElementById('canvasContainer');
  // canvasContainer.appendChild(imageCanvas);

  addMouseListeners(canvasElem);

  const initCanvas = {
    canvas: canvasElem,
    // canvas: imageCanvas,
    fps: 60,
    update(step, canvas, context) {
      imageCanvas.update(step, canvas, context);
      preview.update(step, canvas, context);
      palette.update(step, canvas, context);
    },
    render(step, canvas, context) {
      imageCanvas.render(context);
      preview.render(step, canvas, context);
      palette.render(context);
    },
  };

  const app = new App(initCanvas);
  frames();
  // app.start();
};
