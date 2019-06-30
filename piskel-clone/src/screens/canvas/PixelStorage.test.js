import PixelStorage from './PixelStorage';

describe('PixelStorage testing', () => {
  const pixelSize = 5;

  it('Should return canvas size after init', () => {
    const pixelStorage = new PixelStorage(32, 5);
    expect(32).toEqual(pixelStorage.getCanvasSize());
  });

  it('Should return zoom after init', () => {
    const pixelStorage = new PixelStorage(32, 5);
    expect(5).toEqual(pixelStorage.getPixelSize());
  });

  it('Should set pixel value in array', () => {
    const pixelStorage = new PixelStorage(32, 5);

    const row = 3;
    const col = 5;
    const value = {
      mouseOver: false,
      color: '#ffffff',
      selected: false,
      x: ((row - 1) * pixelSize),
      y: ((col - 1) * pixelSize),
      h: (pixelSize),
      w: (pixelSize),
    };

    pixelStorage.setPixel(row, col, value);
    expect(value).toEqual(pixelStorage.getPixel(row, col));
  });

  it('Should reset all pixel value in array', () => {
    const pixelStorage = new PixelStorage(32, 5);

    const row1 = 3;
    const col1 = 5;
    const row2 = 13;
    const col2 = 32;

    const value1 = {
      mouseOver: true,
      color: '#aaaffff',
      selected: true,
      x: ((row1 - 1) * pixelSize),
      y: ((col1 - 1) * pixelSize),
      h: (pixelSize),
      w: (pixelSize),
    };

    const value2 = {
      mouseOver: true,
      color: '#bbbfff',
      selected: true,
      x: ((row2 - 1) * pixelSize),
      y: ((col2 - 1) * pixelSize),
      h: (pixelSize),
      w: (pixelSize),
    };

    const defaultPixel = {
      mouseOver: false,
      color: '#ffffff',
      selected: false,
      h: pixelSize,
      w: pixelSize,
    }

    pixelStorage.setPixel(row1, col1, value1);
    pixelStorage.setPixel(row2, col2, value2);
    pixelStorage.reset();

    const numberNotDefaultPixels = pixelStorage.getArrayPixels().filter(pixel => {
      return pixel.mouseOver !== defaultPixel.mouseOver  ||
      pixel.color !== defaultPixel.color ||
      pixel.selected !== defaultPixel.selected ||
      pixel.h !== defaultPixel.h ||
      pixel.w !== defaultPixel.w
    }).length;

    expect(0).toEqual(numberNotDefaultPixels);
  });
});
