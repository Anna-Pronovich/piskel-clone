const mouseProperties = {
  x: 0,
  y: 0,
  xStart: 0,
  yStart: 0,
  xEnd: 0,
  yEnd: 0,

  events: {
    mouseover: false,
    mouseout: false,
    mousedown: false,
    mousemove: false,
    mouseup: true,
    mouseButton: 0,
    dragging: false,
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

  canvasElem.addEventListener('mousedown', function mousedown(e) {
    mouseProperties.events.mousedown = true;
    mouseProperties.events.mouseup = false;
    mouseProperties.events.mouseButton = e.which;
    mouseProperties.events.dragging = true;
    mouseProperties.xStart = Math.floor(e.clientX - getCoords(this).left);
    mouseProperties.yStart = Math.floor(e.clientY - getCoords(this).top);
    return false;
  });

  canvasElem.addEventListener('mouseup', function mouseup(e) {
    mouseProperties.events.mousedown = false;
    mouseProperties.events.mouseup = true;
    mouseProperties.events.mouseButton = 0;
    mouseProperties.events.dragging = false;
    mouseProperties.xEnd = Math.floor(e.clientX - getCoords(this).left);
    mouseProperties.yEnd = Math.floor(e.clientY - getCoords(this).top);
    return false;
  });

  canvasElem.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });
};

export { mouseProperties, addMouseListeners };
