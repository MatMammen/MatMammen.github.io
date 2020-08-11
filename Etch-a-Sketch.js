var gridContainer = document.querySelector(".grid-container");
addGridChildTotal(16, 1);
var gridItems = document.querySelectorAll('.grid-item');

console.log(gridItems);

gridItems.forEach((Item) => {
    Item.addEventListener('mouseover',() => {
        Item.style.background = 'green'; 
    });
    Item.addEventListener('touchmove',() => {
        Item.style.background = 'green'; 
    });
});

const reload = document.createElement('button');
reload.textContent = 'Press me to restart!';
reload.style.fontSize = '100px';
document.body.appendChild(reload);

reload.addEventListener('click', () => {
    let reloadPrompt = prompt("How many squares per size on the new grid?(up to 29)"); 
    addGridChildTotal(reloadPrompt, 0);
    console.log(gridItems);
    
});

const red = document.createElement('button');
red.textContent = 'Press me change color to red!';
red.style.fontSize = '100px';
document.body.appendChild(red);
red.addEventListener('click', () => {
    gridItems.forEach((Item) => {
        Item.addEventListener('mouseover',() => {
            Item.style.background = 'red'; 
        });
        Item.addEventListener('touchmove',() => {
            Item.style.background = 'red'; 
        });
    })
});

const blue = document.createElement('button');
blue.textContent = 'Press me change color to blue!';
blue.style.fontSize = '100px';
document.body.appendChild(blue);
blue.addEventListener('click', () => {
    gridItems.forEach((Item) => {
        Item.addEventListener('mouseover',() => {
            Item.style.background = 'blue'; 
        });
        Item.addEventListener('touchmove',() => {
            Item.style.background = 'blue'; 
        });
    })
});
function addGridChildTotal(num, num2) {
    if (num2 == 0) {
        gridItems.forEach((Item) => {
            gridContainer.removeChild(Item)
        gridItems = document.querySelectorAll(".grid-item");
        })
    }
    gridContainer.style.gridTemplateColumns = `repeat(${num}, 1fr)`
    gridContainer.style.gridTemplateRows = `repeat(${num}, 1fr)`
    for (let i = 0; i < (num * num); i++) {
        addGridChild();
    }
    gridItems = document.querySelectorAll(".grid-item");
    gridItems.forEach((Item) => {
        Item.addEventListener('mouseover',() => {
            Item.style.background = 'green'; 
        });
        Item.addEventListener('touchmove',() => {
            Item.style.background = 'green'; 
        });
    });
    
}
function addGridChild() {
    const gridItem = document.createElement('div');
    gridItem.className = "grid-item";
    gridContainer.appendChild(gridItem);
}
