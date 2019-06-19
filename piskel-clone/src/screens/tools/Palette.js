import { mouseProperties } from '../mouse';

export default class Palette {
  constructor() {
    this.offset = { x: 10, y: 10 };
    this.loaded = false;
    this.cCache = null;

    this.canvas = document.createElement('canvas');
    this.canvas.width = 43;
    this.canvas.height = 222;
    this.context = this.canvas.getContext('2d');
    // this.canvas.setAttribute('id', 'palette');
    // document.body.appendChild(this.canvas);


    this.palette = [
      '#000000',
      '#FFFFFF',
      '#9D9D9D',
      '#BE2633',
      '#E06F8B',
      '#493C2B',
      '#A46422',
      '#EB8931',
      '#F7E26B',
      '#2F484E',
      '#44891A',
      '#A3CE27',
      '#1B2632',
      '#005784',
      '#31A2F2',
      '#B2DCEF',
    ];

    this.currentColor = '#000000';
    this.hasFocus = false;
    this.paletteMousePositions = [];
    this.setUpMousePositions();
  }

  setUpMousePositions() {
    this.paletteMousePositions = [];
    let x = 1;
    let y = 1;

    for (let i = 0; i <= this.palette.length - 1; i += 1) {
      const temp = {
        x1: 0,
        x2: 0,
        y1: 0,
        y2: 0,
        color: this.palette[i],
      };

      temp.x1 = x;
      temp.y1 = y;
      temp.x2 = temp.x1 + 20;
      temp.y2 = temp.y1 + 20;

      x += 21;

      if (i % 2 === 1) {
        y += 21;
        x = 1;
      }
      this.paletteMousePositions[i] = temp;
    }
    this.loaded = true;
  }

  update(step, canvas) {
    // Sometimes this method is called by the main loop before the objects
    // constructor has time to initialise, the following line stops
    // that from happening.
    if (this.loaded === false) {
      return;
    }

    // Check to see if the Pallet object has focus, and resetting the mouse
    // cursor if not.
    if (
      mouseProperties.x >= this.offset.x
      && mouseProperties.x <= (this.offset.x + 43)
      && mouseProperties.y >= this.offset.y
      && mouseProperties.y <= (this.offset.y + 222)
    ) {
      this.hasFocus = true;
    } else {
      this.hasFocus = false;
      canvas.style.cursor = 'auto';
    }

    if (this.hasFocus === true) {
      // Check to see if the mouse cursor is within the pallet picker
      // area, and over a selectable color then change the cursor to
      // let the user know that they can interact
      if (
        mouseProperties.x >= (this.offset.x + 1)
        && mouseProperties.x <= (this.offset.x + 43)
        && mouseProperties.y >= (this.offset.y + 1)
        && mouseProperties.y <= (this.offset.y + 168)
      ) {
        canvas.style.cursor = 'pointer';

        // If the mouse is clicked then the current palette color
        // to the hex value of the selected item
        if (mouseProperties.events.mousedown) {
          for (let i = 0; i <= this.paletteMousePositions.length - 1; i += 1) {
            if (
              mouseProperties.x >= (this.offset.x + this.paletteMousePositions[i].x1)
              && mouseProperties.x <= (this.offset.x + this.paletteMousePositions[i].x2)
              && mouseProperties.y >= (this.offset.y + this.paletteMousePositions[i].y1)
              && mouseProperties.y <= (this.offset.y + this.paletteMousePositions[i].y2)
            ) {
              if (this.currentColor !== this.paletteMousePositions[i].color) {
                this.currentColor = this.paletteMousePositions[i].color;
              }
            }
          }
        }
      } else {
        canvas.style.cursor = 'auto';
      }
    }
  }

  render(context) {
    // Sometimes this method is called by the main loop before the objects
    // constructor has time to initialise, the following line stops
    // that from happening.
    if (this.loaded === false) {
      return;
    }

    // Clear the Palette context, ready for a re-draw
    this.context.clearRect(0, 0, 42, 170);

    // Draw a border and background
    this.context.fillStyle = '#000000';
    this.context.fillRect(0, 0, 43, 169);
    this.context.fillStyle = '#000000';
    this.context.fillRect(0, 179, 43, 43);

    // Draw each colored box for the pallet
    let x = 1;
    let y = 1;

    for (let i = 0; i <= this.palette.length - 1; i += 1) {
      this.context.fillStyle = this.palette[i];
      this.context.fillRect(x, y, 20, 20);

      x += 21;

      if (i % 2 === 1) {
        y += 21;
        x = 1;
      }
    }

    // Draw the current color
    this.context.fillStyle = this.currentColor;
    this.context.fillRect(1, 180, 41, 41);

    // Get the image data from the palette context and apply
    // it to the main canvas context passed through by the
    // main loop
    context.putImageData(this.context.getImageData(0, 0, 43, 222), this.offset.x, this.offset.y);
  }

  getCurrentColor() {
    return this.currentColor;
  }
}
