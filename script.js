let drawingMode = true;
let isPaused = true;
let currentColor = '#000000';

let container = document.querySelector('.box-container');
let slider = document.querySelector('#slider');
let sliderLabel = document.querySelector('#slider-label');

let drawButton = document.querySelector('#draw');
let eraseButton = document.querySelector('#erase');
let resetButton = document.querySelector('#reset');
let colorPicker = document.querySelector('#color-picker');

let currentModeLbl = document.querySelector('#mode');
let currentStatusLbl = document.querySelector('#status');

container.addEventListener('click', () => {
    isPaused = !isPaused;
    if(isPaused)
        currentStatusLbl.textContent = "PAUSED";
    else
        currentStatusLbl.textContent = "ACTIVE";
});

drawButton.addEventListener('click', () => {
    drawingMode = true;
    currentModeLbl.textContent = "DRAWING";
});

eraseButton.addEventListener('click', () => {
    drawingMode = false;
    currentModeLbl.textContent = "ERASING";
});

resetButton.addEventListener('click', () => {
    let currentNode = container.firstChild;

    while(currentNode != null) {
        currentNode.setAttribute('style', 'background-color: white');
        currentNode = currentNode.nextSibling;
    }
});

colorPicker.addEventListener('change', () => {
    currentColor = colorPicker.value;
});

function setUp() {
    addBoxes(10);
}

function updateGrid(num) {
    container.setAttribute('style', `grid-template-columns: repeat(${num}, 1fr);`);
    if(num*num > container.childNodes.length)
        addBoxes(num);
    else
        removeBoxes(num);
}

function addBoxes(num) {
    let i = 0;
    while(container.childNodes.length != (num*num)) {
        let div = document.createElement('div');
        div.classList.add('box');

        div.addEventListener('mouseover', () => {
            if(!isPaused) {
                if(drawingMode) {
                    div.setAttribute('style', `background-color: ${currentColor}`);
                }
                else
                    div.setAttribute('style', `background-color: white`);
            }
        });
        container.appendChild(div);
    }
}

function removeBoxes(num) {
    while(container.childNodes.length != (num*num)) {
        container.removeChild(container.firstChild);
    }
}

function resetContainer(num) {
    clearContainer();
    addBoxes(num);
    
}

function updateSliderLabel(value) {
    sliderLabel.textContent = value;
}

slider.addEventListener('input', () => {
    let value = Math.floor(slider.value);
    updateSliderLabel(value);
    updateGrid(value);
});

setUp();