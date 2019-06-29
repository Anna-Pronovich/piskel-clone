export default class Preview {
  constructor() {
    this.canvasPreview = document.getElementById('canvas-preview');
    this.canvasPreview.width = 150;
    this.canvasPreview.height = 150;
    this.contextPreview = this.canvasPreview.getContext('2d');
    this.update();
  }

  update() {
    let count = 0;

    setInterval(() => {
      const canvases = document.getElementsByClassName('canvas-in-frame');
      const arrayCanvases = [...canvases];
      if (count === arrayCanvases.length) {
        count = 0;
      }
      const canvas = arrayCanvases[count];
      this.contextPreview.clearRect(0, 0, this.canvasPreview.width, this.canvasPreview.height);
      this.contextPreview.drawImage(canvas, 0, 0);
      count += 1;
    }, 1000);
  }
}
