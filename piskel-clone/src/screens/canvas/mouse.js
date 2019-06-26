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

const addMouseListeners = (canvasElem, zoom) => {
  const getCoords = (elem) => {
    const rect = elem.getBoundingClientRect();
    return {
      top: (rect.top + document.body.scrollTop),
      left: (rect.left + document.body.scrollLeft),
    };
  };

  canvasElem.addEventListener('mouseover', function mouseover(e) {
    mouseProperties.events.mouseover = true;

    mouseProperties.x = Math.floor(e.clientX - getCoords(this).left);
    mouseProperties.y = Math.floor(e.clientY - getCoords(this).top);
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

  canvasElem.addEventListener('mousemove', function mousemove(e) {
    mouseProperties.events.mousemove = true;
    mouseProperties.x = Math.floor(e.clientX - getCoords(this).left);
    mouseProperties.y = Math.floor(e.clientY - getCoords(this).top);
    const containerWithCoordinates = document.getElementById('mouseCoordinatesInfo');
    containerWithCoordinates.innerHTML = `coordinates x/y:  ${Math.floor(mouseProperties.x / zoom)}:${Math.floor(mouseProperties.y / zoom)}`;
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
