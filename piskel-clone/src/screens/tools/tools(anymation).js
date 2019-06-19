//-----TOOLS-----
const colorPicker = document.getElementById('color-picker');
const elemForPaint = document.getElementById('paint-bucket');
const elemForMove = document.getElementById('move');
const elemForTransform = document.getElementById('transform');

const sizeCanvas = canvas.getBoundingClientRect();
const offsetX = sizeCanvas.left;
const offsetY = sizeCanvas.top;
let clickX;
let clickY;
let currentColor = 'gray';
let prevColor = 'lightgreen';

function getClickedElem(e) {
    clickX = parseInt((e.clientX - offsetX), 10);
    clickY = parseInt((e.clientY - offsetY), 10);

    for (let i = 0; i < currentCanvasElems.length; i += 1) {
        if (currentCanvasElems[i].type === 'rectangle') {
            const rectangle = currentCanvasElems[i];

            if (clickX > rectangle.x && clickX < rectangle.x + rectangle.width
                && clickY > rectangle.y && clickY < rectangle.y + rectangle.height) {
                return rectangle;
            }
        }
        if (currentCanvasElems[i].type === 'circle') {
            const circle = currentCanvasElems[i];
            const distanceFromCenter = Math.sqrt(
                ((circle.x - clickX) ** 2)
                + ((circle.y - clickY) ** 2),
            );

            if (distanceFromCenter <= circle.radius) {
                return circle;
            }
        }
    }
    return false;
}

function moveElem() {
    let dragElem = false;
    let startX;
    let startY;
    let previousSelectedElem;

    function mouseDown(e) {
        e.preventDefault();
        e.stopPropagation();

        const chosenElement = getClickedElem(e);
        if (chosenElement) {
            dragElem = true;
            chosenElement.isDragging = true;
        }
        startX = clickX;
        startY = clickY;
        if (previousSelectedElem != null) {
            previousSelectedElem.isSelected = false;
        }

        previousSelectedElem = chosenElement;
        chosenElement.isSelected = true;
        chosenElement.zIndex += 1;
        currentCanvasElems.sort((a, b) => {
            if (a.zIndex > b.zIndex) {
                return 1;
            }
            if (a.zIndex < b.zIndex) {
                return -1;
            }
            return 0;
        });
        draw();
        updateCanvasInFrame();
    }

    function mouseMove(e) {
        if (dragElem) {
            e.preventDefault();
            e.stopPropagation();

            clickX = parseInt((e.clientX - offsetX), 10);
            clickY = parseInt((e.clientY - offsetY), 10);

            const distanceX = clickX - startX;
            const distanceY = clickY - startY;

            for (let i = 0; i < currentCanvasElems.length; i += 1) {
                const elem = currentCanvasElems[i];
                if (elem.isDragging) {
                    elem.x += distanceX;
                    elem.y += distanceY;
                }
            }

            draw();
            updateCanvasInFrame();
            startX = clickX;
            startY = clickY;
        }
    }

    function mouseUp(e) {
        e.preventDefault();
        e.stopPropagation();

        dragElem = false;
        for (let i = 0; i < currentCanvasElems.length; i += 1) {
            currentCanvasElems[i].isDragging = false;
            currentCanvasElems[i].isSelected = false;
            currentCanvasElems[i].zIndex = 0;
        }
        draw();
        updateCanvasInFrame();
    }

    if (elemForMove.classList.contains('active')) {
        canvas.onmousedown = mouseDown;
        canvas.onmousemove = mouseMove;
        canvas.onmouseup = mouseUp;
    } else {
        canvas.onmousedown = null;
        canvas.onmousemove = null;
        canvas.onmouseup = null;
    }
}

function transormElement() {
    function transformClick(e) {
        clickX = parseInt((e.clientX - offsetX), 10);
        clickY = parseInt((e.clientY - offsetY), 10);

        const chosenElement = getClickedElem(e);
        if (chosenElement.type === 'rectangle') {
            const circleX = chosenElement.x + chosenElement.width / 2;
            const circleY = chosenElement.y + chosenElement.height / 2;
            chosenElement.x = circleX;
            chosenElement.y = circleY;
            chosenElement.type = 'circle';
        } else if (chosenElement.type === 'circle') {
            const rectX = chosenElement.x - chosenElement.radius;
            const rectY = chosenElement.y - chosenElement.radius;
            chosenElement.x = rectX;
            chosenElement.y = rectY;
            chosenElement.type = 'rectangle';
        }
        draw();
        updateCanvasInFrame();
    }
    if (elemForTransform.classList.contains('active')) {
        canvas.onclick = transformClick;
    } else {
        canvas.onclick = null;
    }
}

function showColor() {
    const elemWithCurrentColor = document.getElementById('current-color');
    const elemWithPrevColor = document.getElementById('prev-color');
    elemWithCurrentColor.style.background = currentColor;
    elemWithPrevColor.style.background = prevColor;
}

const getColor = function (e) {
    if (e.target.tagName === 'CANVAS') {
        const choosenElem = getClickedElem(e);
        prevColor = currentColor;
        currentColor = choosenElem.color;
        showColor();
    } else {
        const colorBg = window.getComputedStyle(e.target, null).getPropertyValue('background-color');
        prevColor = currentColor;
        currentColor = colorBg;
        showColor();
    }
};

function changeColor() {
    function changeColorClick(e) {
        clickX = parseInt((e.clientX - offsetX), 10);
        clickY = parseInt((e.clientY - offsetY), 10);

        const choosenElement = getClickedElem(e);
        if (choosenElement) {
            choosenElement.color = currentColor;
        }
        draw();
        updateCanvasInFrame();
    }
    if (elemForPaint.classList.contains('active')) {
        canvas.onclick = changeColorClick;
    } else {
        canvas.onclick = null;
    }
}

colorPicker.addEventListener('click', () => {
    if (colorPicker.classList.contains('active')) {
        document.addEventListener('click', getColor);
    } else {
        document.removeEventListener('click', getColor);
    }
});

elemForPaint.addEventListener('click', () => {
    changeColor();
});

elemForMove.addEventListener('click', () => {
    moveElem();
});

elemForTransform.addEventListener('click', () => {
    transormElement();
});
};

function toggleActiveState() {
this.classList.toggle('active');
}

const btns = document.querySelectorAll('.btn-block');
[].forEach.call(btns, (btn) => {
btn.addEventListener('click', toggleActiveState, false);
});
