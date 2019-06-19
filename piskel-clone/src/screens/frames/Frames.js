//---------------------------NEW Functionality -----------------------------
    //--------------------------for CONTEINER FRAMES----------------------------
    const containerFramesList = document.getElementById('conteiner-frames_list');

    let counter = 1;

    const updateCanvasInFrame = () => {
        const allActiveFrame = containerFramesList.getElementsByClassName("active");
        let activeFrame = [...allActiveFrame][0];
        let activeCanvas = [...activeFrame.getElementsByClassName('canvas-in-frame')][0];
        const contextInFrame = activeCanvas.getContext('2d');
        contextInFrame.clearRect(0, 0, activeCanvas.width, activeCanvas.height);
        contextInFrame.drawImage(canvas, 20, 10, 100, 130);
    }

    const changeActiveClass = () => {
        let frames = document.querySelectorAll('.frame');

        const allActiveFrame = containerFramesList.getElementsByClassName("active");
        if (!allActiveFrame[0]) {
            [...frames][frames.length - 1].className += " active";
        }
        for (let i = 0; i < frames.length; i++) {
            frames[i].addEventListener("click", function () {
                allActiveFrame[0].className = allActiveFrame[0].className.replace(" active", "");
                this.className += " active";
            });
        }

    }
    const removeAllActiveState = () => {
        const allActiveFrame = containerFramesList.getElementsByClassName("active");
        if (allActiveFrame[0]) {
            allActiveFrame[0].className = allActiveFrame[0].className.replace(" active", "");
        }
    }

    const drawFrame = () => {
        removeAllActiveState();
        const frame = `<div class="frame active">
            <canvas class="canvas-in-frame"></canvas>
            <button class="number-frame" data-number="${counter}">${counter}</button>
            <button class="tool-tip_delete" data-title-action="delete"></button>
            <button class="tool-tip_copy" data-title-action="clone"></button>
        </div>`;
        containerFramesList.insertAdjacentHTML('beforeend', frame);
        counter++;

        changeActiveClass();
        updateCanvasInFrame();
    }

    drawFrame();

    const buttonAddFrame = document.getElementById('btn-add-frame');
    buttonAddFrame.addEventListener('click', () => {
        returnDefaultCanvas();
        drawFrame();
    });

    containerFramesList.addEventListener('click', (event) => {
        const clickedElem = event.target;
        const frameClickedElem = clickedElem.parentNode;

        if (clickedElem.classList.contains('tool-tip_delete') && (containerFramesList.childNodes.length > 1)) {
            containerFramesList.removeChild(frameClickedElem);
            changeActiveClass();
        } else if (clickedElem.classList.contains('tool-tip_copy')) {
            const cloneFrame = frameClickedElem.cloneNode(true);
            removeAllActiveState();

            let contextClickedElem = frameClickedElem.getElementsByClassName('canvas-in-frame')[0];
            let activeCanvas = cloneFrame.getElementsByClassName('canvas-in-frame')[0];
            const contextInFrame = activeCanvas.getContext('2d');
            contextInFrame.drawImage(contextClickedElem, 0, 0);

            containerFramesList.appendChild(cloneFrame);
            changeActiveClass();

        };
    });
