const canvas = document.getElementById("my-canvas");
const ctx = canvas.getContext("2d");
ctx.beginPath();

const data = {
    ship: {x: 400, y: 400, size: 50},
    monsters: [],
    bullets: []
};

generateMonster();
generateMonster();
generateMonster();

const spaceshipImage = new Image();
spaceshipImage.src = './images/spaceship.png';

const monsterImage = new Image();
monsterImage.src = './images/monster.png';

const bulletImage = new Image();
bulletImage.src = './images/bullet.png';

function drawSpaceship(ship) {
    ctx.drawImage(spaceshipImage, ship.x, ship.y, ship.size, ship.size);
}

function drawMonster(monster) {
    ctx.drawImage(monsterImage, monster.x, monster.y, monster.size, monster.size);
}

function drawBullet(bullet) {
    ctx.drawImage(bulletImage, bullet.x, bullet.y, bullet.size, bullet.size);
}

function drawAll() {
    data.monsters.forEach(function (monster) {
        drawMonster(monster);
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

function monstersDown() {
    data.monsters.forEach(function (monster) {
        monster.y += 5;
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

function generateMonster() {
    data.monsters.push({
        x: getRandomInt(canvas.width),
        y: 0,
        size: 30
    })
}

function generateNewMonsters() {
    if (getRandomInt(8) === 0) {
        generateMonster();
    }
}

function isCrashed() {
    return data.monsters.some(function (monster) {
        return isHit(monster, data.ship)
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

function removeMonstersHitByBullets() {
    const deadMonsters = [], deadBullets = [];
    data.monsters.forEach(function (monster) {
        data.bullets.forEach(function (bullet) {
            if (isHit(monster, bullet)) {
                deadMonsters.push(monster);
                deadBullets.push(bullet);
            }
        });
    });
    data.monsters = data.monsters.filter(function (monster) {
        return deadMonsters.indexOf(monster) === -1;
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
            if (data.ship.x <= 0) {
                data.ship.x = canvas.width;
            }
            break;
        case RIGHT:
            data.ship.x += step;
            if (data.ship.x >= canvas.width) {
                data.ship.x = 0;
            }
            break;
        case UP:
            data.ship.y -= step;
            if (data.ship.y <= 0) {
                data.ship.y = canvas.height;
            }
            break;
        case DOWN:
            data.ship.y += step;
            if (data.ship.y >= canvas.height) {
                data.ship.y = 0;
            }
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

function removeMonstersOutOfScreen() {
    data.monsters = data.monsters.filter(function (monster) {
        return isInScreen(monster);
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
        monstersDown();
        bulletsUp();
        generateNewMonsters();
        removeMonstersHitByBullets();
        removeMonstersOutOfScreen();
        removeBulletsOutOfScreen();
        redrawAll();
    }
}, 50);