const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = innerWidth;
const height = canvas.height = innerHeight;

const halfWidth = width / 2;
const halfHeight = height / 2;

document.body.appendChild(canvas);

const h = 100;
const rad = 10;

const ballConfig = {
    vel: {
        x: 7,
        y: 15
    }
}

const ballSpeedX = 7;
const ballSpeedY = 15;

const ball = {
    // x: halfWidth,
    // y: halfHeight,
    coor: {
        x: halfWidth,
        y: halfHeight
    },
    vel: {
        x: randNum(-ballConfig.vel.x, ballConfig.vel.x),
        y: randNum(-ballConfig.vel.y, ballConfig.vel.y)
    },
}

const player1 = {
    x: 10,
    y: halfHeight - h / 2,
    width: 10,
    height: h
}

const player2 = {
    x: width - 20,
    y: halfHeight - h / 2,
    width: 10,
    height: h
}

const score = {
    player: 0,
    com: 0
}

const topScore = 30;
const fontSize = 24;

var players = [];

ctx.font = `bold ${24}px Arial`;

function randNum(...arr) { return arr[Math.floor(Math.random() * arr.length)] }

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.coor.x, ball.coor.y, rad, 0, Math.PI * 2);
    ctx.fill();
}

function drawText(text, x, y) {
    ctx.beginPath();
    ctx.fillText(text, x, y);
}

function moveBall() {
    ball.coor.x += ball.vel.x;
    ball.coor.y += ball.vel.y;


    if (ball.coor.x - rad < 0 || ball.coor.x + rad > width) {
        if (ball.coor.x - rad <= 0) score.com += 1;
        if (ball.coor.x + rad >= width) score.player += 1;
        players[1].y = halfHeight - h / 2;
        [ball.coor.x, ball.coor.y] = [halfWidth, halfHeight];
        [ball.vel.x, ball.vel.y] = [randNum(-ballSpeedX, ballSpeedX), randNum(-ballSpeedY, ballSpeedY)];
    }

    if (ball.coor.y - rad < 0 || ball.coor.y + rad > height) ball.vel.y *= -1;

    players[1].y += ball.vel.y / 1.2;

    if (players[0].x + players[0].width >= ball.coor.x && (ball.coor.y >= players[0].y || ball.coor.y + rad >= players[0].y) && (ball.coor.y <= players[0].y + players[0].height || ball.coor.y - rad <= players[0].y + players[0].height)) {
        ball.vel.x *= -1;
        ball.coor.x = players[0].x + rad;
    }

    if (players[1].x <= ball.coor.x && (ball.coor.y >= players[1].y || ball.coor.y + rad >= players[1].y) && (ball.coor.y <= players[1].y + players[1].height || ball.y - rad <= players[1].y + players[1].height)) {
        ball.vel.x *= -1;
        ball.coor.x = players[1].x - rad;
    }

}

function init() {
    players.push(player1);
    players.push(player2);
}

function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "white";

    for (var i = 0; i < players.length; i++) {
        ctx.beginPath();
        ctx.fillRect(players[i].x, players[i].y, players[i].width, players[i].height);
    }

    drawBall();

    drawText(`Score: ${score.player}`, halfWidth / 2 - fontSize * 2, topScore);
    drawText(`Score: ${score.com}`, width - halfWidth / 2 - fontSize * 2, topScore);

    ctx.fillStyle = "rgba(255, 255, 255,.3)";

    for (var y = (height / 20) / 3; y <= height; y += height / 20) {
        ctx.beginPath();
        ctx.fillRect(width / 2 - 5, y, 10, 15);
    }

    moveBall();
}

init();

canvas.onmousemove = ({ y }) => { players[0].y = y - players[0].height / 2 }

function game() {
    draw();
    requestAnimationFrame(game);
}

game();