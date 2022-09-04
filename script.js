const divs = {
    gridWrapper: document.querySelector('.grid-wrapper'),
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
            return 'fc0303'
        case 1:
            return 'fc6b03'
        case 2:
            return 'fcf003'
        case 3:
            return '03fc18'
        case 4:
            return '036ffc'
        case 5:
            return '4e03fc'
        case 6:
            return 'fc03f4'
    }
}

function getColor () {
    
    let color = document.querySelector('.color-picker.selected').classList[0];

    if (color === 'rainbow') {

        let rainbowColor = '#' + getRainbowHex();
        
        return rainbowColor
    
    } else {
        
        return color;
    }
} 

function toggleMousePosition(evt) {

    if (evt.type === 'mousedown') {
        mouseDown = true;

    } else if (evt.type === 'mouseup') {
        mouseDown = false;
    }

    console.log(evt.type, mouseDown)
}

function applyColor (evt) {

    //Check if mouse drag is toggled
    let mouseDownToggle = divs.mouseDownToggle.classList.contains('selected');

    if (mouseDownToggle === true) {

        if (mouseDown === true) {
            
            evt.target.style.background = getColor();
        }
    
    } else {
        
        evt.target.style.background = getColor();
    }
}

//Change grid layout with user input

function clearGridColor() {
    
    let drawBoxes = document.querySelectorAll('.draw-box');
    drawBoxes.forEach(box => box.style.background = 'white');
}

function clearGrid() {
    
    divs.gridWrapper.innerHTML = '';
    divs.gridWrapper.classList.remove('sixteen');
    divs.gridWrapper.classList.remove('thirty-two');
    divs.gridWrapper.classList.remove('sixty-four');
}

function makeRow (gridSize) {

    let row = document.createElement('div');
    row.classList.add('grid-row');

    for (let cells = gridSize; cells > 0; cells--) {

        let cell = document.createElement('div');
        cell.classList.add('draw-box');
        cell.addEventListener('mouseenter', applyColor);
        
        row.appendChild(cell);
    }

    return row;
}

function changeGrid (gridSize, gridClass) {

    clearGrid()
    divs.gridWrapper.classList.add(gridClass);

    for (let rows = gridSize; rows > 0; rows--) {

        let row = makeRow(gridSize);
        
        divs.gridWrapper.appendChild(row);
    }
}

//Handle button presses and toggles

function changeButtonSelected(evt, buttonGroup) {

    if (buttonGroup === 'grid-picker') {

        divs.gridPickerButtons.forEach(picker => picker.classList.remove('selected'));
        evt.target.classList.add('selected');

    } else if (buttonGroup === 'color-picker') {
        
        divs.colorPickerButtons.forEach(picker => picker.classList.remove('selected'));
        evt.target.classList.add('selected'); 
    
    } else if (buttonGroup === 'mouse-down') {

        let buttonToggled = evt.target.classList.contains('selected');

        if (buttonToggled === true) {
        
            evt.target.classList.remove('selected');
    
        } else if (buttonToggled === false) {
            
            evt.target.classList.add('selected');
        }
        
        return buttonToggled;
    }
}

function handleButtonPress (evt) {
    
    if (evt.target.classList.contains('grid-picker')) {

        changeButtonSelected(evt, 'grid-picker');

        let gridSize = parseInt(evt.target.innerHTML);
        let gridClass = evt.target.classList[0];

        changeGrid(gridSize, gridClass); 

    } else if (evt.target.classList.contains('color-picker')) {

        changeButtonSelected(evt, 'color-picker');

    } else if (evt.target.classList.contains('clear')) {

        clearGridColor();

    } else if (evt.target.classList.contains('mouse-down')) {

        changeButtonSelected(evt, 'mouse-down');
    }
}

divs.buttons.forEach(button => button.addEventListener('click', handleButtonPress));
divs.gridWrapper.addEventListener('mousedown', toggleMousePosition);
document.addEventListener('mouseup', toggleMousePosition);

changeGrid(16, 'sixteen');