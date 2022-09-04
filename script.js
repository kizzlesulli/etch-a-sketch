const divs = {
    gridWrapper: document.querySelector('.grid-wrapper'),
//querySelectorAll arrays
    drawBoxes: document.querySelectorAll('.draw-box')
}

//Drag while hovering
divs.drawBoxes.forEach(box => box.addEventListener('mouseover', e => {

    e. target.style.background = 'black';
}));

//Draw while mousedown
//Mouseup fails when cursor gets stuck dragging on something

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