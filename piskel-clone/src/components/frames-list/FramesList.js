import Frame from './Frame';

export default class FramesList {
  constructor() {
    this.framesStorage = [];
    this.currentPixelStorage = null;
    this.frame = null;
    this.currentActiveFrame = null;
    this.currentActiveCanvas = null;

    this.containerFramesList = document.getElementById('conteiner-frames_list');
    this.drawFrame();
    this.updateActiveElements();

    this.containerFramesList.addEventListener('click', event => this.frameManagment(event));
    // this.containerFramesList.addEventListener('click', event => this.frameManagment(event));
  }

  drawFrame() {
    const frame = `<div class="frame active">
                <canvas class="canvas-in-frame"></canvas>
                <button class="number-frame"></button>
                <button class="tool-tip_delete" data-title-action="delete"></button>
                <button class="tool-tip_copy"  data-title-action="clone"></button>
                </div>`;
    this.containerFramesList.insertAdjacentHTML('beforeend', frame);
  }

  setCurrentPixelStorage(pixelStorage) {
    this.currentPixelStorage = pixelStorage;
  }

  updateActiveElements() {
    const [firstActiveFrame] = this.containerFramesList.getElementsByClassName('active');
    const frames = document.querySelectorAll('.frame');

    const setActiveCanvas = (elem) => {
      const [activeCanvas] = elem.getElementsByTagName('canvas');
      this.currentActiveCanvas = activeCanvas;
      this.currentActiveFrame = elem;
      window.console.log('new this.currentActiveCanvas: ', this.currentActiveCanvas);
      window.console.log('new this.currentActiveFrame: ', this.currentActiveFrame);
    };

    if (!firstActiveFrame) { // ----if we delete active frame----
      const lastElem = [...frames][frames.length - 1];
      lastElem.className += ' active';
      setActiveCanvas(lastElem);
    } else {
      this.currentActiveFrame = firstActiveFrame;
      const [activeCanvas] = this.currentActiveFrame.getElementsByTagName('canvas');
      this.currentActiveCanvas = activeCanvas;
      // this.currentPixelStorage = activeCanvas.getPixelStorage();
      window.console.log('new this.currentActiveCanvas: ', this.currentActiveCanvas);
      window.console.log('new this.currentActiveFrame: ', this.currentActiveFrame);
    }

    window.console.log('in update', this.currentActiveFrame);
  }

  drawImageInFrame() {
    this.frame = new Frame(this.currentPixelStorage, this.currentActiveCanvas);
  }

  removeActiveClass() {
    window.console.log('removeActiveClass before: ', this.currentActiveFrame);
    this.currentActiveFrame.className = this.currentActiveFrame.className.replace(' active', '');
    window.console.log('removeActiveClass after: ', this.currentActiveFrame);
  }

  removeAllActiveState() {
    const allActiveFrames = this.containerFramesList.getElementsByClassName('active');
    if (allActiveFrames[0]) {
      allActiveFrames[0].className = allActiveFrames[0].className.replace(' active', '');
    }
  }

  frameManagment(event) {
    const clickedElem = event.target;
    const frameClickedElem = clickedElem.parentNode;

    if (clickedElem.classList.contains('tool-tip_delete')
      && (this.containerFramesList.childNodes.length > 1)) {
      this.containerFramesList.removeChild(frameClickedElem);
      // нужно удалить его пиксель сторадж из  фрейм лист сторадж
    } else if (clickedElem.classList.contains('tool-tip_copy')) {
      window.console.log('copy: ', frameClickedElem);

      const cloneFrame = frameClickedElem.cloneNode(true);
      // нужно добавить в локал сторадж
      this.removeActiveClass();
      const contextClickedElem = frameClickedElem.getElementsByClassName('canvas-in-frame')[0];
      const activeCanvas = cloneFrame.getElementsByClassName('canvas-in-frame')[0];
      const contextInFrame = activeCanvas.getContext('2d');
      contextInFrame.drawImage(contextClickedElem, 0, 0);

      this.containerFramesList.appendChild(cloneFrame);
    } else {
      window.console.log('change active frame by ckick, frameClickedElem: ', frameClickedElem);
      this.currentActiveFrame.className = this.currentActiveFrame.className.replace(' active', '');
      frameClickedElem.className += ' active';
    }
    this.updateActiveElements();
  }

  updateFramesStorage() {
    this.framesStorage.push(this.currentPixelStorage);
    // window.console.log('this.framesList ', this.framesStorage);
  }

  getFramesList() {
    return this.framesStorage;
  }

  update() {
    this.frame.updateCanvasInFrame();
  }
}
