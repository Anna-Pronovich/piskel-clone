export default class Preview {
  constructor() {
    this.canvasPreview = document.getElementById('canvas-preview');
    this.canvasPreview.width = 150;
    this.canvasPreview.height = 150;
    this.contextPreview = this.canvasPreview.getContext('2d');
    this.update();
  }

  // update() {
  //   let canvases = document.getElementsByClassName('canvas-in-frame');
  //   const arrayCanvases = [...canvases];
  //   // console.log(list);
  //   for (let i = 0; i < arrayCanvases.length; i += 1) {
  //     // const currentCanvas = list[i];
  //     // console.log('currentCanvas', currentCanvas);
  //     this.contextPreview.clearRect(0, 0, this.canvasPreview.width, this.canvasPreview.height);
  //     this.contextPreview.drawImage(arrayCanvases[i], 0, 0);
  //   }

  // }
  update() {
    const drawReview = (canvasInFrame) => {
      this.contextPreview.clearRect(0, 0, this.canvasPreview.width, this.canvasPreview.height);
      this.contextPreview.drawImage(canvasInFrame, 0, 0);
    }

    let count = 0;
    let fps = 1;

    setInterval(() => {
      const canvases = document.getElementsByClassName('canvas-in-frame');
      const arrayCanvases = [...canvases];
      if (count === arrayCanvases.length) {
        count = 0;
      }
      const canvas = arrayCanvases[count];
      drawReview(canvas);
      count += 1;
    }, 1000 / fps);

    const slider = document.getElementById('fpsRange');
    const output = document.getElementById('fpsValue');
    output.innerHTML = slider.value;

    slider.oninput = function () {
      output.innerHTML = this.value;
      fps = this.value;
    };
  }
}
