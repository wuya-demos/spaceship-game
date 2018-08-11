const canvas = document.getElementById("my-canvas");
const ctx = canvas.getContext("2d");
ctx.beginPath();

const data = {
    ship: {x: 400, y: 400, size: 50},
    rocks: [
        {x: 200, y: 200},
        {x: 300, y: 500},
        {x: 600, y: 100}
    ],
    bullets: [
        {x: 140, y: 100},
        {x: 400, y: 200}
    ]
};

function drawSpaceship(x, y) {
    ctx.fillStyle = "#FF0000";
    const size = data.ship.size;
    ctx.fillRect(x, y, size, size);
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
    data.rocks.forEach(function (rock) {
        drawRock(rock.x, rock.y);
    });
    data.bullets.forEach(function (bullet) {
        drawBullet(bullet.x, bullet.y);
    });
    drawSpaceship(data.ship.x, data.ship.y);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function redrawAll() {
    clearCanvas();
    drawAll();
}

drawAll();

function generateNewBullet() {
    data.bullets.push({
        x: data.ship.x + (data.ship.size / 2),
        y: data.ship.y
    })
}

document.addEventListener("keydown", function (event) {
    const [LEFT, RIGHT, UP, DOWN, SPACE] = [37, 39, 38, 40, 32];
    switch (event.keyCode) {
        case LEFT:
            data.ship.x -= 3;
            break;
        case RIGHT:
            data.ship.x += 3;
            break;
        case UP:
            data.ship.y -= 3;
            break;
        case DOWN:
            data.ship.y += 3;
            break;
        case SPACE :
            generateNewBullet();
            break;
    }
});

function rocksDown() {
    data.rocks.forEach(function (rock) {
        rock.y += 5;
    });
}

function bulletsUp() {
    data.bullets.forEach(function (bullet) {
        bullet.y -= 5;
    });
}


function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function generateNewRocks() {
    if (getRandomInt(8) === 0) {
        data.rocks.push({
            x: getRandomInt(canvas.width),
            y: 0
        })
    }
}

setInterval(function () {
    rocksDown();
    bulletsUp();
    generateNewRocks();
    redrawAll();
}, 50);