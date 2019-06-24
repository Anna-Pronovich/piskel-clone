export default class Tool {
  constructor() {
    this.parentElement = document.getElementById('tools-container');
    this.listTools = this.parentElement.getElementsByClassName('tool_btn');

    const currentActiveTool = this.parentElement.getElementsByClassName('active');
    this.currentTool = currentActiveTool[0].id;
    this.changeActiveTool();

    this.penSize = +document.querySelector('input[name="penSize"]:checked').value;
    document.getElementById('list-penSize').addEventListener('click', () => this.changePenSize());
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

  getCurrentTool() {
    return this.currentTool;
  }
}
