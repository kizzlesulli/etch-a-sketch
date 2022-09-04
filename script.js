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

//Change color with user input

let color = 'black';

function getRainbowColor () {

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

function applyColor (evt) {
    
    if (color === 'black') {

        evt.target.style.background = 'black';
    
    } else if (color === 'rainbow') {

        let rainbowColor = getRainbowColor();

        evt.target.style.background = '#' + rainbowColor;
    } else if (color === 'erase') {

        evt.target.style.background = 'white';
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
        cell.addEventListener('mouseover', e => applyColor(e));

        row.appendChild(cell);
    }

    return row;
}

function changeGrid (gridSize, gridClass) {

    clearGridColor()
    clearGrid()
    divs.gridWrapper.classList.add(gridClass);

    for (let rows = gridSize; rows > 0; rows--) {

        let row = makeRow(gridSize);
        divs.gridWrapper.appendChild(row);
    }
}


divs.buttons.forEach(button => button.addEventListener('click', e => {

    if (e.target.classList.contains('grid-picker')) {

        let gridSize = parseInt(e.target.innerHTML);
        let gridClass = e.target.classList[0];

        changeGrid(gridSize, gridClass);

    } else if (e.target.classList.contains('color-picker')) {

        color = e.target.classList[0]; 

    } else if (e.target.classList.contains('clear')) {

        clearGridColor();
    }
}));

//Drag while hovering

changeGrid(16, 'sixteen');

//Draw while mousedown
//Mouseup fails to trigger when cursor gets stuck dragging objects

// let target;
// let colorInterval;

// divs.drawBoxes.forEach(box => box.addEventListener('mouseover', e => {
    
//     target = e.target;
// }));

// document.addEventListener('mouseup', e => {

//     console.log(e.type);
//     clearInterval(colorInterval);
// });

// divs.drawBoxes.forEach(box => box.addEventListener('mousedown', e => {

//     clearInterval(colorInterval);

//     colorInterval = setInterval(function() {

//             target.style.background = 'black';
//     }, 50);
// }));