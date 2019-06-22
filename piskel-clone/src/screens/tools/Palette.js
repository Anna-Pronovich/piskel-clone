import Color from '../../../node_modules/vanilla-picker';

export default class Palette {
  constructor(options) {
    this.currentColor = options;
    this.previousColor = 'transparent';
    const palette = document.getElementById('palette');
    const picker = new Color(palette);

    picker.onChange = (color) => {
      palette.style.background = color.rgbaString;
      this.update();
      this.currentColor = color.rgbaString;
    };
  }

  update() {
    const palette = document.getElementById('palette');
    const containerPreviousColor = document.getElementById('previousColor');
    this.previousColor = this.currentColor;
    containerPreviousColor.style.background = this.currentColor;
    this.currentColor = palette.style.background;
  }

  getCurrentColor() {
    return this.currentColor;
  }
}
