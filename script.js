const divs = {
    gridSilder: document.querySelector('.grid-picker'),
    gridWrapper: document.querySelector('.grid-wrapper'),
    gridSizeDisplay: document.querySelector('.slider-value'),
    mouseDownToggle: document.querySelector('.mouse-down'),
    //Arrays
    gridPickerButtons: document.querySelectorAll('.grid-picker'),
    colorPickerButtons: document.querySelectorAll('.color-picker'),
    buttons: document.querySelectorAll('.button')
}

//Global configuration variables
let mouseDown; //boolean changes with mousedown and mouseup events

//Change color with user input

function getRainbowHex () {

    let randSeven = Math.floor(Math.random() * 7);
    
    switch (randSeven) {
        case 0: 
            return 'fc0303';
        case 1:
            return 'fc6b03';
        case 2:
            return 'fcf003';
        case 3:
            return '03fc18';
        case 4:
            return '036ffc';
        case 5:
            return '4e03fc';
        case 6:
            return 'fc03f4';
    }
}

function getColor () {
    
    let color = document.querySelector('.color-picker.selected').classList[0];

    if (color === 'rainbow') {

        let rainbowColor = '#' + getRainbowHex();
        
        return rainbowColor;
    
    } else {
        
        return color;
    }
} 

function applyColor (evt) {

    //Check if mouse down is toggled
    //Mouse can get stuck dragging page elements and breaks mouseup event listener
    let mouseDownToggle = divs.mouseDownToggle.classList.contains('selected');

    if (mouseDownToggle === true) {

        if (evt.type === 'mousedown') {

            evt.target.style.background = getColor();

        } else if (mouseDown === true) {
            
            evt.target.style.background = getColor();
        }
    
    } else if (evt.type === 'mouseenter') {
        
        evt.target.style.background = getColor();
    }
}

//Change grid layout with user input

function clearGrid () {
    
    divs.gridWrapper.innerHTML = '';
    
    //For grid size inputs through buttons
    // divs.gridWrapper.classList.remove('sixteen');
    // divs.gridWrapper.classList.remove('thirty-two');
    // divs.gridWrapper.classList.remove('sixty-four');
}

function makeRow (gridSize) {

    let row = document.createElement('div');
    row.classList.add('grid-row');

    for (let cells = gridSize; cells > 0; cells--) {

        //width of whole grid is 512px
        let cellSize = 512 / gridSize;

        let cell = document.createElement('div');
        cell.classList.add('draw-box');
        cell.style.width = cellSize;
        cell.style.height = cellSize;
        cell.addEventListener('mouseenter', applyColor);
        cell.addEventListener('mousedown', applyColor);
        
        row.appendChild(cell);
    }

    return row;
}

function createGrid () {

    let gridSize = parseInt(divs.gridSilder.value);

    clearGrid();
    
    //For grid size inputs through buttons
    // divs.gridWrapper.classList.add(gridClass);

    for (let rows = gridSize; rows > 0; rows--) {

        let row = makeRow(gridSize);
        
        divs.gridWrapper.appendChild(row);
    }
}

function clearGridColor () {
    
    let drawBoxes = document.querySelectorAll('.draw-box');
    drawBoxes.forEach(box => box.style.background = 'white');
}

//Handle button presses and toggles

function changeButtonSelected (evt, buttonGroup) {
    
    if (buttonGroup === 'color-picker') {
        
        divs.colorPickerButtons.forEach(picker => picker.classList.remove('selected'));
        evt.target.classList.add('selected'); 
    
    } else if (buttonGroup === 'mouse-down') {

        let buttonToggled = evt.target.classList.contains('selected');

        if (buttonToggled === true) {
        
            evt.target.classList.remove('selected');
    
        } else if (buttonToggled === false) {
            
            evt.target.classList.add('selected');
        }
    }

    //For grid size inputs through buttons
    // if (buttonGroup === 'grid-picker') {

    //     divs.gridPickerButtons.forEach(picker => picker.classList.remove('selected'));
    //     evt.target.classList.add('selected');
    // } 
}

function handleButtonPress (evt) {

    if (evt.target.classList.contains('color-picker')) {

        changeButtonSelected(evt, 'color-picker');

    } else if (evt.target.classList.contains('clear')) {

        clearGridColor();

    } else if (evt.target.classList.contains('mouse-down')) {

        changeButtonSelected(evt, 'mouse-down');
    }

    //For grid size inputs through buttons
    // if (evt.target.classList.contains('grid-picker')) {

    //     changeButtonSelected(evt, 'grid-picker');

    //     let gridSize = parseInt(evt.target.innerHTML);
    //     let gridClass = evt.target.classList[0];

    //     createGrid(gridSize, gridClass); 
    // } 
}

function handleSilderInput (evt) {

    let gridSize = evt.target.value;
    divs.gridSizeDisplay.innerText = `${gridSize} x ${gridSize}`;
}


function toggleMousePosition(evt) {

    if (evt.type === 'mousedown') {
        mouseDown = true;

    } else if (evt.type === 'mouseup') {
        mouseDown = false;
    }
}

divs.buttons.forEach(button => button.addEventListener('click', handleButtonPress));

//Event listeners for grid size slider input; not needed for button input
divs.gridSilder.addEventListener('input', handleSilderInput);
divs.gridSilder.addEventListener('click', createGrid);

//Event listeners to draw when mouse down selected
//Mouse can get stuck dragging page elements and breaks mouseup event listener
divs.gridWrapper.addEventListener('mousedown', toggleMousePosition);
document.addEventListener('mouseup', toggleMousePosition);

createGrid();