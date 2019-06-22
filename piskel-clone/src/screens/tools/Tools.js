export default class Tools {
  constructor(options) {
    this.currentTool = options.currentTool;
    this.parentElement = document.getElementById('tools-container');
    this.listTools = this.parentElement.getElementsByClassName('tool_btn');
    this.changeActive();
  }

  changeActive() {
    for (let i = 0; i < this.listTools.length; i += 1) {
      this.listTools[i].addEventListener('click', function click() {
        const current = document.getElementsByClassName('active');
        current[0].className = current[0].className.replace(' active', '');
        this.className += ' active';
      });
    }
  }

  getCurrentTool() {
    return this.currentTool;
  }
}
