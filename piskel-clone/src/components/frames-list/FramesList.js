import Frame from './Frame';

export default class FramesList {
  constructor() {
    this.framesStorage = [];
    this.currentPixelStorage = null;
    this.frame = null;
    this.currentActiveFrame = null;
    this.currentActiveCanvas = null;
    this.imageCanvas = null;

    this.count = 0;
    this.containerFramesList = document.getElementById('conteiner-frames_list');
    this.drawFrame();
    this.updateActiveElements();

    this.containerFramesList.addEventListener('click', event => this.frameManagment(event));
  }

  drawFrame() {
    const frame = `<div class="frame active" id="${this.count}">
                <canvas class="canvas-in-frame"></canvas>
                <button class="number-frame"></button>
                <button class="tool-tip_delete" data-title-action="delete"></button>
                <button class="tool-tip_copy"  data-title-action="clone"></button>
                </div>`;
    this.containerFramesList.insertAdjacentHTML('beforeend', frame);
    this.count += 1;
  }

  setCurrentPixelStorage(pixelStorage) {
    this.currentPixelStorage = pixelStorage;
  }

  setImageCanvas(imageCanvas) {
    this.imageCanvas = imageCanvas;
  }

  drawImageInFrame() {
    this.frame = new Frame(this.currentPixelStorage, this.currentActiveCanvas);
  }

  updateFramesStorage() {
    this.framesStorage.push(this.frame);
  }

  updateActiveElements() {
    const [firstActiveFrame] = this.containerFramesList.getElementsByClassName('active');
    const frames = document.querySelectorAll('.frame');

    const setActiveCanvas = (elem) => {
      const [activeCanvas] = elem.getElementsByTagName('canvas');
      this.currentActiveCanvas = activeCanvas;
      this.currentActiveFrame = elem;
    };

    if (!firstActiveFrame) { // ----if we delete active frame----
      const lastElem = [...frames][frames.length - 1];
      lastElem.className += ' active';
      setActiveCanvas(lastElem);
    } else {
      this.currentActiveFrame = firstActiveFrame;
      const [activeCanvas] = this.currentActiveFrame.getElementsByTagName('canvas');
      this.currentActiveCanvas = activeCanvas;
    }
  }

  removeActiveClass() {
    this.currentActiveFrame.className = this.currentActiveFrame.className.replace(' active', '');
  }

  frameManagment(event) {
    const clickedElem = event.target;
    const frameClickedElem = clickedElem.parentNode;
    const idFrame = +frameClickedElem.id;
    const frameOfClickedElem = this.framesStorage[idFrame];

    if (clickedElem.classList.contains('tool-tip_delete')
      && (this.containerFramesList.childNodes.length > 1)) {
      delete this.framesStorage[idFrame];
      this.containerFramesList.removeChild(frameClickedElem);
      this.updateActiveElements();
    } else if (clickedElem.classList.contains('tool-tip_copy')) {
      const contextClickedElem = frameClickedElem.getElementsByClassName('canvas-in-frame')[0];
      const cloneFrame = frameClickedElem.cloneNode(true);
      const cloneCanvas = cloneFrame.getElementsByClassName('canvas-in-frame')[0];
      const contextCloneFrame = cloneCanvas.getContext('2d');
      contextCloneFrame.drawImage(contextClickedElem, 0, 0);
      this.containerFramesList.insertBefore(cloneFrame, frameClickedElem);

      if (cloneFrame.classList.contains('active')) {
        cloneFrame.className = cloneFrame.className.replace(' active', '');
      }

      cloneFrame.setAttribute('id', `${this.count}`);
      this.count += 1;
      this.framesStorage.push(frameOfClickedElem);
    } else {
      this.currentActiveFrame.className = this.currentActiveFrame.className.replace(' active', '');
      frameClickedElem.className += ' active';

      const pixelStorageClikedElem = frameOfClickedElem.getPixelStorage();
      this.imageCanvas.setPixelSrorage(pixelStorageClikedElem);
      this.frame.setPixelStorage(pixelStorageClikedElem);
      this.updateActiveElements();
    }
  }

  update() {
    this.frame.updateCanvasInFrame();
  }
}
