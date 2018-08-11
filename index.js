const canvas = document.getElementById("my-canvas");
const ctx = canvas.getContext("2d");
ctx.beginPath();

function drawSpaceship(x, y) {
    ctx.fillStyle = "#FF0000";
    const size = 50;
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

drawSpaceship(400, 400);
drawBullet(140, 100);
drawBullet(400, 200);
drawRock(200, 200);
drawRock(300, 500);
drawRock(600, 100);