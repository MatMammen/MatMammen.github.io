var gridContainer = document.querySelector(".grid-container");
addGridChildTotal(16, 1);
var gridItems = document.querySelectorAll('.grid-item');
colorChange();
reload();
resize();

function addGridChildTotal(num) {
    deleteGrid();
    for (let i = 0; i < (num * num); i++) {
        addGridChild();
    }
    gridContainer.style.gridTemplateColumns = `repeat(${num}, 1fr)`
    gridContainer.style.gridTemplateRows = `repeat(${num}, 1fr)`
    gridItems = document.querySelectorAll(".grid-item");
    gridItems.forEach((Item) => {
        Item.addEventListener('mouseover',() => {
            Item.style.background = 'black';
        });
        Item.addEventListener('touchmove',() => {
            Item.style.background = 'black'; 
        });
    });
    
}
function deleteGrid() {
    let theGrid = document.querySelector(".grid-container");
    while (theGrid.hasChildNodes()) {
        theGrid.removeChild(theGrid.firstChild)
    }
}
function addGridChild() {
    const gridItem = document.createElement('div');
    gridItem.className = "grid-item";
    document.getElementById("grid-container").appendChild(gridItem);
}
function colorChange() { 
    let colorPicker = document.createElement('input');
    colorPicker.type = 'color';
    colorPicker.className = 'color-picker';
    document.body.appendChild(colorPicker);

    let colorButton = document.createElement('button');
    colorButton.textContent = 'Press me to change to chosen color!' ;
    colorButton.className = 'color-picker-confirm';
    document.body.appendChild(colorButton);
    colorButton.addEventListener('click', () => {
        gridItems.forEach((Item) => {
            Item.addEventListener('mouseover',() => {
                Item.style.background = `${colorPicker.value}`; 
            });
            Item.addEventListener('touchmove',() => {
                Item.style.background = `${colorPicker.value}`; 
            });
        })
    })
}
function reload() {
    const reload = document.createElement('button');
    reload.textContent = 'Restart';
    reload.className = 'restart';
    document.body.appendChild(reload);

    reload.addEventListener('click', () => {
        gridItems.forEach((Item) => {
            Item.style.background = "white";
        })
    })
}
function resize() {
    const resize = document.createElement('button');
    resize.textContent = 'Resize';
    resize.className = 'resize';
    document.body.appendChild(resize);
    let resizePrompt = document.createElement('input')
    resizePrompt.className = 'text-box';
    resizePrompt.placeholder = "How many blocks per side?"
    document.body.appendChild(resizePrompt);
    resize.addEventListener('click', () => {
        addGridChildTotal(resizePrompt.value);
    })
}

   
