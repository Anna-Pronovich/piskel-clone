import Color from '../../../node_modules/vanilla-picker';

export default class Palette {
  constructor(options) {
    this.currentColor = options;

    const palette = document.getElementById('palette');
    const picker = new Color(palette);
    picker.onChange = function (color) {
      palette.style.background = color.rgbaString;
    };
  }

  update() {
    const palette = document.getElementById('palette');
    this.currentColor = palette.style.background;
  }

  getCurrentColor() {
    return this.currentColor;
  }
}
