export default class Tool {
  constructor() {
    this.parentElement = document.getElementById('tools-container');
    this.listTools = this.parentElement.getElementsByClassName('tool_btn');

    const currentActiveTool = this.parentElement.getElementsByClassName('active');
    this.currentTool = currentActiveTool[0].id;
    this.changeActiveTool();

    this.penSize = +document.querySelector('input[name="penSize"]:checked').value;
    document.getElementById('list-penSize').addEventListener('click', () => this.changePenSize());
    document.addEventListener('keydown', event => this.handleKeyDown(event));
  }

  changePenSize() {
    this.penSize = +document.querySelector('input[name="penSize"]:checked').value;
  }

  getPenSize() {
    return this.penSize;
  }

  changeActiveTool() {
    const setActiveTool = (id) => {
      this.currentTool = id;
    };

    for (let i = 0; i < this.listTools.length; i += 1) {
      this.listTools[i].addEventListener('click', function click() {
        const current = document.getElementsByClassName('active');
        current[0].className = current[0].className.replace(' active', '');
        this.className += ' active';
        setActiveTool(this.id);
      });
    }
  }

  handleKeyDown(event) {
    const deleteActiveClass = () => {
      const current = this.parentElement.getElementsByClassName('active');
      current[0].className = current[0].className.replace(' active', '');
    };

    const keyboardEvent = {
      p: 80,
      e: 69,
      b: 66,
      c: 67,
      s: 83,
      n: 78,
    };

    if (event.keyCode === keyboardEvent.p) {
      deleteActiveClass();
      document.getElementById('tool-pen').className += ' active';
      this.currentTool = 'tool-pen';
    } else if (event.keyCode === keyboardEvent.e) {
      deleteActiveClass();
      document.getElementById('tool-eraser').className += ' active';
      this.currentTool = 'tool-eraser';
    } else if (event.keyCode === keyboardEvent.b) {
      deleteActiveClass();
      document.getElementById('tool-paint-bucket').className += ' active';
      this.currentTool = 'tool-paint-bucket';
    } else if (event.keyCode === keyboardEvent.c) {
      deleteActiveClass();
      document.getElementById('tool-color-picker').className += ' active';
      this.currentTool = 'tool-color-picker';
    } else if (event.keyCode === keyboardEvent.s) {
      deleteActiveClass();
      document.getElementById('tool-stroke').className += ' active';
      this.currentTool = 'tool-stroke';
    } else if (event.keyCode === keyboardEvent.n) {
      deleteActiveClass();
      document.getElementById('tool-custom').className += ' active';
      this.currentTool = 'tool-custom';
    }
    return false;
  }

  getCurrentTool() {
    return this.currentTool;
  }
}
