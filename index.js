const canvas = document.getElementById("my-canvas");
const ctx = canvas.getContext("2d");
ctx.beginPath();

let shipX = 400, shipY = 400;

function drawSpaceship() {
    ctx.fillStyle = "#FF0000";
    const size = 50;
    ctx.fillRect(shipX, shipY, size, size);
}

function drawRock(x, y) {
    ctx.fillStyle = "#000000";
    const size = 30;
    ctx.fillRect(x, y, size, size);
}

function drawBullet(x, y) {
    ctx.fillStyle = "#0000FF";
    const size = 5;
    ctx.fillRect(x, y, size, size);
}


function drawAll() {
    drawRock(200, 200);
    drawRock(300, 500);
    drawRock(600, 100);

    drawBullet(140, 100);
    drawBullet(400, 200);

    drawSpaceship();
}

drawAll();

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function redrawAll() {
    clearCanvas();
    drawAll();
}

function moveLeft() {
    shipX -= 3;
    redrawAll();
}

function moveRight() {
    shipX += 3;
    redrawAll();
}

function moveUp() {
    shipY -= 3;
    redrawAll();
}

function moveDown() {
    shipY += 3;
    redrawAll();
}

document.addEventListener("keydown", function (event) {
    const LEFT = 37;
    const RIGHT = 39;
    const UP = 38;
    const DOWN = 40;

    switch (event.keyCode) {
        case LEFT:
            moveLeft();
            break;
        case RIGHT:
            moveRight();
            break;
        case UP:
            moveUp();
            break;
        case DOWN:
            moveDown();
            break;
    }
});