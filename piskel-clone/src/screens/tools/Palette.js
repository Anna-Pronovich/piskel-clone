import Color from '../../../node_modules/vanilla-picker';

export default class Palette {
  constructor() {
    const palette = document.getElementById('palette');
    this.currentColor = window.getComputedStyle(palette).backgroundColor;
    this.previousColor = 'transparent';

    const picker = new Color(palette);
    picker.onChange = (color) => {
      window.console.log('color.rgbaString: ', color.rgbaString);
      palette.style.background = color.rgbaString;
      this.updatePreviousColor();
      this.currentColor = color.rgbaString;
    };
  }

  updatePreviousColor() {
    this.previousColor = this.currentColor;
    const containerPreviousColor = document.getElementById('previousColor');
    containerPreviousColor.style.background = this.currentColor;
  }

  setCurrentColor(color) {
    this.currentColor = color;
    const palette = document.getElementById('palette');
    palette.style.background = color;
  }

  getCurrentColor() {
    return this.currentColor;
  }
}
