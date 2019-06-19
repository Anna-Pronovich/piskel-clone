export default class App {
  constructor(options) {
    const {
      update, fps, render, canvas,
    } = options;
    const context = canvas.getContext('2d');
    const step = 1 / fps;

    function frame() {
      update(step, canvas, context);
      render(0, canvas, context);
      window.requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  }
}
