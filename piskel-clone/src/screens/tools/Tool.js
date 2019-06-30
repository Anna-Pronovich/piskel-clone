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

    if (event.keyCode === 80) {
      deleteActiveClass();
      document.getElementById('tool-pen').className += ' active';
      this.currentTool = 'tool-pen';
    } else if (event.keyCode === 69) {
      deleteActiveClass();
      document.getElementById('tool-eraser').className += ' active';
      this.currentTool = 'tool-eraser';
    } else if (event.keyCode === 66) {
      deleteActiveClass();
      document.getElementById('tool-paint-bucket').className += ' active';
      this.currentTool = 'tool-paint-bucket';
    } else if (event.keyCode === 67) {
      deleteActiveClass();
      document.getElementById('tool-color-picker').className += ' active';
      this.currentTool = 'tool-color-picker';
    } else if (event.keyCode === 83) {
      deleteActiveClass();
      document.getElementById('tool-stroke').className += ' active';
      this.currentTool = 'tool-stroke';
    } else if (event.keyCode === 78) {
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
