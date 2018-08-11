const canvas = document.getElementById("my-canvas");
const ctx = canvas.getContext("2d");
ctx.beginPath();

const data = {
    ship: {x: 400, y: 400, size: 50},
    rocks: [],
    bullets: []
};

generateRock();
generateRock();
generateRock();

function drawSpaceship(ship) {
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(ship.x, ship.y, ship.size, ship.size);
}

function drawRock(rock) {
    ctx.fillStyle = "#000000";
    ctx.fillRect(rock.x, rock.y, rock.size, rock.size);
}

function drawBullet(bullet) {
    ctx.fillStyle = "#0000FF";
    ctx.fillRect(bullet.x, bullet.y, bullet.size, bullet.size);
}

function drawAll() {
    data.rocks.forEach(function (rock) {
        drawRock(rock);
    });
    data.bullets.forEach(function (bullet) {
        drawBullet(bullet);
    });
    drawSpaceship(data.ship);
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
        y: data.ship.y,
        size: 5
    })
}

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

function generateRock() {
    data.rocks.push({
        x: getRandomInt(canvas.width),
        y: 0,
        size: 30
    })
}

function generateNewRocks() {
    if (getRandomInt(8) === 0) {
        generateRock();
    }
}

function isCrashed() {
    return data.rocks.some(function (rock) {
        return isHit(rock, data.ship)
    });
}

function showGameOver() {
    ctx.font = "80px Arial";
    ctx.fillStyle = "#FF0000";
    ctx.fillText("Game Over", 200, 300);
}

function isHit(square1, square2) {
    function centerX(square) {
        return square.x + square.size / 2;
    }

    function centerY(square) {
        return square.y + square.size / 2;
    }

    const minDistance = (square1.size + square2.size) / 2;
    const invalidX = Math.abs(centerX(square1) - centerX(square2)) < minDistance;
    const invalidY = Math.abs(centerY(square1) - centerY(square2)) < minDistance;
    return invalidX && invalidY;
}

function removeRocksHitByBullets() {
    const deadRocks = [], deadBullets = [];
    data.rocks.forEach(function (rock) {
        data.bullets.forEach(function (bullet) {
            if (isHit(rock, bullet)) {
                deadRocks.push(rock);
                deadBullets.push(bullet);
            }
        });
    });
    data.rocks = data.rocks.filter(function (rock) {
        return deadRocks.indexOf(rock) === -1;
    });
    data.bullets = data.bullets.filter(function (bullet) {
        return deadBullets.indexOf(bullet) === -1;
    });
}

let currentKeyCode = undefined;

document.addEventListener("keydown", function (event) {
    currentKeyCode = event.keyCode;
});
document.addEventListener("keyup", function () {
    currentKeyCode = undefined;
});

function moveSpaceship() {
    const [LEFT, RIGHT, UP, DOWN, SPACE] = [37, 39, 38, 40, 32];
    if (currentKeyCode === undefined) return;
    const step = 10;
    switch (currentKeyCode) {
        case LEFT:
            data.ship.x -= step;
            break;
        case RIGHT:
            data.ship.x += step;
            break;
        case UP:
            data.ship.y -= step;
            break;
        case DOWN:
            data.ship.y += step;
            break;
        case SPACE :
            generateNewBullet();
            break;
    }
}

let gameOver = false;

function isInScreen(square) {
    return (square.y + square.size) >= 0 && square.y <= canvas.height;
}

function removeRocksOutOfScreen() {
    data.rocks = data.rocks.filter(function (rock) {
        return isInScreen(rock);
    })
}

function removeBulletsOutOfScreen() {
    data.bullets = data.bullets.filter(function (bullet) {
        return isInScreen(bullet);
    })
}

setInterval(function () {
    if (gameOver) return;

    moveSpaceship();
    if (isCrashed()) {
        gameOver = true;
        showGameOver();
    } else {
        rocksDown();
        bulletsUp();
        generateNewRocks();
        removeRocksHitByBullets();
        removeRocksOutOfScreen();
        removeBulletsOutOfScreen();
        redrawAll();
    }
}, 50);