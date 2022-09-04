const divs = {
    gridWrapper: document.querySelector('.grid-wrapper'),
}

//Change color with user input

function getColorSelection () {

    let color;

    Math.random
}

function applyColor (evt) {
    
    //let color = getColor();

    evt.target.style.background = 'black';

    if (color = 'black') {
        
        evt.target.style.background = 'black';
    } else if(colorSelected = 'rainbow'); {

        evt.target.style.background = 'black';
    }

    //red #fc0303
    //orange #fc6b03
    //yellow #fcf003
    //green #03fc18
    //blue #036ffc
    //purple #4e03fc
    //pink #fc03f4
} 

//Change grid layout with user input

function clearGrid () {
    
    divs.gridWrapper.innerHTML = '';
    divs.gridWrapper.classList.remove('sixteen');
    divs.gridWrapper.classList.remove('thirty-two');
    divs.gridWrapper.classList.remove('sixty-four');
}

function makeRow () {

}

function createGrid (gridSize) {

    clearGrid();
    
    divs.gridWrapper.classList.add('sixteen');

    for (let rows = gridSize; rows > 0; rows--) {

        let row = document.createElement('div');
        row.classList.add('grid-row');

        for (let cells = gridSize; cells > 0; cells--) {

            let cell = document.createElement('div');
            cell.classList.add('draw-box');

            console.log(cell);
            cell.addEventListener('mouseover', e => applyColor(e));

            row.appendChild(cell);
        }
        console.log(row);
        divs.gridWrapper.appendChild(row);
    }
}


//Drag while hovering

createGrid(16);

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