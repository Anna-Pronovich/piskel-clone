import ImageCanvas from './ImageCanvas';

describe('ImageCanvas testing', () => {

  it('Should return true if position of mouse in pixel', () => {
    const currentPixel = {
      mouseOver: false,
      color: '#ffffff',
      selected: false,
      x: 0,
      y: 0,
      h: 5,
      w: 5,
    };
    expect(true).toEqual(ImageCanvas.checkMouseInPixel(currentPixel));
  });

  it('Should return true if position of mouse in pixel', () => {
    const currentPixel = {
      mouseOver: false,
      color: '#ffffff',
      selected: false,
      x: 15,
      y: 24,
      h: 5,
      w: 5,
    };
    expect(false).toEqual(ImageCanvas.checkMouseInPixel(currentPixel));
  });
});
