const divs = {
    gridWrapper: document.querySelector('.grid-wrapper'),
    gridPickers: document.querySelectorAll('.grid-picker'),
    colorPickers: document.querySelectorAll('.color-picker'),
    buttons: document.querySelectorAll('.button')
}

//Global configuration variables

let color = 'black'; //manipulated by getColor function
let mouseBehavior = 'mouseover'; //used to toggle hover draw or drag draw behavior
let mouseDown; //boolean changes with mousedown and mouseup events
let target;
let colorInterval;


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
    
    //let color = document.querySelector('.color-picker.selected').classList[0];

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

    if (mouseBehavior === 'mouseover') {

        evt.target.style.background = getColor();
    
    } else if (mouseBehavior === 'mousedown') {

        stopMouseDown();

        colorInterval = setInterval(function() {
    
                target.style.background = getColor();
        }, 1);
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
        cell.addEventListener(mouseBehavior, e => applyColor(e));
        cell.addEventListener('mouseover', e => target = e.target);
        
        row.appendChild(cell);
    }

    return row;
}

function changeGrid (gridSize, gridClass) {

    clearGridColor()
    clearGrid()
    divs.gridWrapper.classList.add(gridClass);

    for (let rows = gridSize; rows > 0; rows--) {

        let row = makeRow(gridSize, mouseBehavior);
        divs.gridWrapper.appendChild(row);
    }
}

//Change mouse behavior between press and drag, and hover

function changeMouseBehavior(buttonToggled, evt) {

    let drawBoxes = document.querySelectorAll('.draw-box');
    let gridSize = parseInt(document.querySelector('.grid-picker.selected').innerHTML);
    let gridClass = document.querySelector('.grid-picker.selected').classList[0];

    if (buttonToggled === true) {
        
        evt.target.classList.remove('selected');
        mouseBehavior = 'mouseover';
        changeGrid(gridSize, gridClass);
        // document.removeEventListener('mouseup', () => clearInterval(colorInterval));
        // drawBoxes.forEach(box => box.removeEventListener('mousedown', e => applyColor(e)));
        // drawBoxes.forEach(box => box.removeEventListener('mouseover', e => target = e.target));
        // drawBoxes.forEach(box => box.addEventListener('mouseover', e => applyColor(e)))

    } else if (buttonToggled === false) {
        
        evt.target.classList.add('selected');
        mouseBehavior = 'mousedown';
        changeGrid(gridSize, gridClass);
        // document.addEventListener('mouseup', () => clearInterval(colorInterval));
        // drawBoxes.forEach(box => box.removeEventListener('mouseover', e => applyColor(e)));
        // drawBoxes.forEach(box => box.addEventListener('mouseover', e => target = e.target));
        // drawBoxes.forEach(box => box.addEventListener('mousedown', e => applyColor(e)))
    }
    
    // if (mouseBehavior = 'mouseover') {
        
    //     document.removeEventListener('mouseup', () => clearInterval(colorInterval));
    //     drawBoxes.forEach(box => box.removeEventListener('mousedown', e => applyColor(e)));
    //     drawBoxes.forEach(box => box.removeEventListener('mouseover', e => target = e.target));
    //     drawBoxes.forEach(box => box.addEventListener('mouseover', e => applyColor(e)))

    // } else if (mouseBehavior = 'mousedown') {

    //     document.addEventListener('mouseup', () => clearInterval(colorInterval));
    //     drawBoxes.forEach(box => box.removeEventListener('mouseover', e => applyColor(e)));
    //     drawBoxes.forEach(box => box.addEventListener('mouseover', e => target = e.target));
    //     drawBoxes.forEach(box => box.addEventListener('mousedown', e => applyColor(e)))
    // }
}

function changeButtonSelected(evt, buttonGroup) {

    if (buttonGroup === 'grid-picker') {

        divs.gridPickers.forEach(picker => picker.classList.remove('selected'));
        evt.target.classList.add('selected');

    } else if (buttonGroup === 'color-picker') {
        
        console.log(divs.colorPickers);
        divs.colorPickers.forEach(picker => picker.classList.remove('selected'));
        evt.target.classList.add('selected'); 
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

    } else if (evt.target.classList.contains('mouse-press')) {

        let buttonToggled = evt.target.classList.contains('selected');
        changeMouseBehavior(buttonToggled, evt);
    }
}

divs.buttons.forEach(button => button.addEventListener('click', handleButtonPress));
divs.gridWrapper.addEventListener('mousedown', toggleMousePosition);
document.addEventListener('mouseup', toggleMousePosition);

changeGrid(16, 'sixteen');