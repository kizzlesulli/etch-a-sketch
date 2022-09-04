const divs = {
    gridWrapper: document.querySelector('.grid-wrapper'),
//querySelectorAll arrays
}

//Change grid layout with user input

function applyColor() {
    let color = getColorSelection();
        
} 

function createGrid (gridSize) {


    divs.gridWrapper.classList.remove('sixteen');
    divs.gridWrapper.classList.remove('thirty-two');
    divs.gridWrapper.classList.remove('sixty-four');
    
    divs.gridWrapper.classList.add('sixteen');

    divs.gridWrapper.innerHTML = '';

    for (let rows = gridSize; rows > 0; rows--) {

        let row = document.createElement('div');
        row.classList.add('grid-row');

        for (let cells = gridSize; cells > 0; cells--) {

            let cell = document.createElement('div');
            cell.classList.add('draw-box');

            cells.addEventListener('mouseover', applyColor());

            row.appendChild(cell);
        }
        console.log(row);
        divs.gridWrapper.appendChild(row);
    }
}


//Drag while hovering
cells.addEventListener('mouseover', e => e. target.style.background = 'black');

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