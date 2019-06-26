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
    const allActiveFrame = this.containerFramesList.getElementsByClassName('active');
    const frames = document.querySelectorAll('.frame');
    const setActiveCanvas = (elem) => {
      this.currentActiveCanvas = elem.getElementsByTagName('canvas')[0];
    };

    this.currentActiveFrame = allActiveFrame[0];

    if (!this.currentActiveFrame) { // ----if we delete active frame----
      const lastElem = [...frames][frames.length - 1];
      lastElem.className += ' active';
      setActiveCanvas(lastElem);
    } else {
      this.currentActiveCanvas = this.currentActiveFrame.getElementsByTagName('canvas')[0];
    }

    console.log('in update', this.currentActiveFrame);
  }

  drawImageInFrame() {
    this.frame = new Frame(this.currentPixelStorage, this.currentActiveCanvas);
  }

  removeActiveClass() {
    this.currentActiveFrame.className = this.currentActiveFrame.className.replace(' active', '');
  }

  removeAllActiveState() {
    const allActiveFrame = this.containerFramesList.getElementsByClassName('active');
    if (allActiveFrame[0]) {
      allActiveFrame[0].className = allActiveFrame[0].className.replace(' active', '');
    }
  }

  changeActiveClass() {
    const frames = document.querySelectorAll('.frame');

    for (let i = 0; i < frames.length; i += 1) {
      frames[i].addEventListener('click', function clickFrame() {
        console.log(this.currentActiveFrame);
        this.currentActiveFrame.className = this.currentActiveFrame.className.replace(' active', '');
        this.className += ' active';
        this.updateActiveElements();
      });
    }
  }

  frameManagment(event) {
    const clickedElem = event.target;
    const frameClickedElem = clickedElem.parentNode;

    if (clickedElem.classList.contains('tool-tip_delete')
      && (this.containerFramesList.childNodes.length > 1)) {
      this.containerFramesList.removeChild(frameClickedElem);
        //нужно удалить его пиксель сторадж из  фрейм лист сторадж
      this.updateActiveElements();
    } else if (clickedElem.classList.contains('tool-tip_copy')) {
      const cloneFrame = frameClickedElem.cloneNode(true);
      //нужно добавить в локал сорадж
      this.removeActiveClass();
      this.updateActiveElements();

      const contextClickedElem = frameClickedElem.getElementsByClassName('canvas-in-frame')[0];
      const activeCanvas = cloneFrame.getElementsByClassName('canvas-in-frame')[0];
      const contextInFrame = activeCanvas.getContext('2d');
      contextInFrame.drawImage(contextClickedElem, 0, 0);

      this.containerFramesList.appendChild(cloneFrame);
      // this.changeActiveClass();
    } else {
      this.changeActiveClass();
    }
  }

  updateFramesStorage() {
    this.framesStorage.push(this.currentPixelStorage);
    console.log('this.framesList ', this.framesStorage);
  }

  getFramesList() {
    return this.framesStorage;
  }

  update() {
    this.frame.updateCanvasInFrame();
  }
}
