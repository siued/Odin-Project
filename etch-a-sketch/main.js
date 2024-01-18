function makeGrid(gridSize) {
    const container = document.querySelector('#grid-container');

    if (gridSize > 100) {
        gridSize = 100;
    }

    for (let i = 0; i < gridSize * gridSize; i++) {
        const div = document.createElement('div');
        div.classList.add('grid-item');
        div.addEventListener('mouseover', function(e) {
            //check if mouse is clicked
            if (e.buttons == 1) {
                e.target.classList.add('clicked');
            } else {
                e.target.classList.add('hovered');
            }
        });
        div.addEventListener('mouseout', function(e) {
            e.target.classList.remove('hovered');
        });
        div.addEventListener('click', function(e) {
            e.target.classList.toggle('clicked');
        });
        div.style.width = `${960 / gridSize}px`;
        div.style.height = `${960 / gridSize}px`;
        div.draggable = false;
        container.appendChild(div);
    }
} 

document.querySelector('#clear').addEventListener('click', function(e) {
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(gridItem => {
        gridItem.classList.remove('clicked');
    });
});

document.querySelector('#resize').addEventListener('click', function(e) {
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(gridItem => {
        gridItem.remove();
    });
    doGrid();
});

function doGrid() {
    let gridSize = prompt("How many squares per side?");
    makeGrid(gridSize);
}

doGrid();