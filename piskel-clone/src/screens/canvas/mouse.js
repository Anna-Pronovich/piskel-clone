const mouseProperties = {
  x: 0,
  y: 0,

  events: {
    mouseover: false,
    mouseout: false,
    mousedown: false,
    mousemove: false,
    mouseButton: 0,
  },
  previousEvents: {
    mouseover: false,
    mouseout: false,
    mousedown: false,
    mousemove: false,
    mouseButton: 0,
  },
};

const addMouseListeners = (canvasElem) => {
  console.log('canvasElem =', canvasElem);

  const getCoords = (elem) => {
    const rect = elem.getBoundingClientRect();
    return {
      top: (rect.top + document.body.scrollTop),
      left: (rect.left + document.body.scrollLeft),
    };
  };

  canvasElem.addEventListener('mouseover', function (e) {
    mouseProperties.events.mouseover = true;
    console.log('this =', this);

    mouseProperties.x = Math.floor(e.clientX - getCoords(this).left);
    mouseProperties.y = Math.floor(e.clientY - getCoords(this).top);

    console.log('mouseProperties.x =', mouseProperties.x);
    console.log('mouseProperties.y =', mouseProperties.y);
  });

  canvasElem.addEventListener('mouseout', () => {
    mouseProperties.events.mousemove = false;
    mouseProperties.events.mouseover = false;
    mouseProperties.events.mousedown = false;
    mouseProperties.events.mouseout = true;
    mouseProperties.events.mouseButton = 0;

    mouseProperties.x = 0;
    mouseProperties.y = 0;
  });

  canvasElem.addEventListener('mousemove', function (e) {
    mouseProperties.events.mousemove = true;
    mouseProperties.x = Math.floor(e.clientX - getCoords(this).left);
    mouseProperties.y = Math.floor(e.clientY - getCoords(this).top);
    return false;
  });

  canvasElem.addEventListener('mousedown', (e) => {
    mouseProperties.events.mousedown = true;
    mouseProperties.events.mouseup = false;
    mouseProperties.events.mouseButton = e.which;
    return false;
  });

  canvasElem.addEventListener('mouseup', () => {
    mouseProperties.events.mousedown = false;
    mouseProperties.events.mouseup = true;
    mouseProperties.events.mouseButton = 0;
    return false;
  });

  canvasElem.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });
};

export { mouseProperties, addMouseListeners };