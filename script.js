const divs = {
    clear: document.querySelector('.clear'),
    gridSixteen: document.querySelector('.sixteen'),
    gridThirtytwo: document.querySelector('.thirty-two'),
    gridSixtyfour: document.querySelector('.sixty-four'),
    colorBlack: document.querySelector('.black'),
    colorRainbow: document.querySelector('.rainbow'),
    gridWrapper: document.querySelector('.grid-wrapper'),
    buttons: document.querySelectorAll('.button')
}

//Global configuration variables

let color = 'black';
let mouseBehavior = 'mouseover';
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
    
    if (color === 'rainbow') {

        let rainbowColor = '#' + getRainbowHex();
        
        return rainbowColor
    
    } else {
        
        return color;
    }
} 

function applyColor (evt) {

    if (mouseBehavior === 'mouseover') {

        evt.target.style.background = getColor();
    
    } else if (mouseBehavior === 'mousedown') {

        clearInterval(colorInterval);

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

divs.buttons.forEach(button => button.addEventListener('click', e => {

    if (e.target.classList.contains('grid-picker')) {

        let gridSize = parseInt(e.target.innerHTML);
        let gridClass = e.target.classList[0];

        changeGrid(gridSize, gridClass);
        //toggleButton(); 

    } else if (e.target.classList.contains('color-picker')) {

        color = e.target.classList[0];
        //toggleButton(); 

    } else if (e.target.classList.contains('clear')) {

        clearGridColor();
        //toggleButton(); 

    } else if (e.target.classList.contains('mouse-press')) {

        let buttonToggled = e.target.classList.contains('selected');
        changeMouseBehavior(buttonToggled, e);

        // if (e.target.classList.contains('selected')) {
            
        //     e.target.classList.remove('selected');
        //     mouseBehavior = 'mouseover';
        //     changeMouseBehavior();
        // } else {
            
        //     e.target.classList.add('selected');
        //     mouseBehavior = 'mousedown';
        //     changeMouseBehavior();
        // }
    }
}));

document.addEventListener('mouseup', () => clearInterval(colorInterval));

changeGrid(16, 'sixteen');