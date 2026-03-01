const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

ctx.fillStyle = '#8d1f1f'; 
ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight); 

console.log("test");

let testobject = {
  keytest: "valuetest",
};

let x = true;
let y = false;
if (x && y) {
  console.log(testobject.keytest);
  console.log(6 % -4);
}

let array = [];
for (let i = 0; i < 5; i++) {
    array.push(Math.floor(Math.random() * 5));
}
// console.log(array.filter(element => element % 2 == 0));

class GridCell {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        ctx.fillStyle = '#16e95c'; 
        ctx.fillRect(x, y, 10, 10);
    }
}

class EmptyCell {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        ctx.fillStyle = '#8d1f1f'; 
        ctx.fillRect(x, y, 10, 10);
    }
}

let cells = [];
let emptyCells = [];

let draw = function() {
    // console.log(Date.now());
}

let forever = setInterval(draw, 1000/60);

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case "z":
            cells.push(new GridCell(0, 0));
            console.log(cells);
        break;
        case "p":
            clearInterval(forever);
        break;
        case "r":
            cells = [];
            ctx.fillStyle = '#8d1f1f'; 
            ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight); 
        break;
    }
});

function roundToGrid(x) {
    return Math.round(x / 20) * 20;
}

canvas.addEventListener("mousedown", (event) => {
    // console.log("click");
    if (cells.some(cell => cell.x == roundToGrid(event.offsetX) && cell.y == roundToGrid(event.offsetY))) {
        cells.splice(cells.find(cell => cell.x == roundToGrid(event.offsetX) && cell.y == roundToGrid(event.offsetY)), 1);
        emptyCells.push(new EmptyCell(roundToGrid(event.offsetX), roundToGrid(event.offsetY)));
    } else {
        cells.push(new GridCell(roundToGrid(event.offsetX), roundToGrid(event.offsetY)));
    }
});

canvas.addEventListener("mousemove", (event) => {
    if (event.buttons == 0) {
        return;
    }
    if (event.shiftKey) {
        cells.splice(cells.find(cell => cell.x == roundToGrid(event.offsetX) && cell.y == roundToGrid(event.offsetY)), 1);
        emptyCells.push(new EmptyCell(roundToGrid(event.offsetX), roundToGrid(event.offsetY)));
    } else {
        cells.push(new GridCell(roundToGrid(event.offsetX), roundToGrid(event.offsetY)));
    }
});
