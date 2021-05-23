const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var color = "red";
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = random(1, 5);
var dy = -2;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;
var velocidadPaddle = 5;
var velocidadbola = -7;
var brickRowCount = 5; //7
var brickColumnCount = 15; //15
var brickWidth = 25;
var brickHeight = 25;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 40;
var velocidad = 0;
var score = 0;
var pointsToWin = 0;
var lives = 2;
var presh = 0;

const velocitylevel = document.getElementById("velocitylevel");
const btn = document.getElementById('btn');
const btnFinish = document.getElementById('btnFinish');
const modal = document.getElementById('ventanaModal');
const btnModal = document.getElementById('btnModal')
const inputUser = document.getElementById('inputUser');
const alerthtml = document.getElementById('alert');




//var user = prompt("Introduzca su nombre para empezar a jugar: ");
var user = "";

btn.onclick = game;
 function game(){
  console.log(presh,'presh');
  if(presh == 0){
    
      btn.innerText = "Finish Game";
      btn.classList.remove('btn-success')
      btn.classList.add('btn-danger')
      playgame();


  }
  else{
    document.location.reload();
  }

};
function date(){
  dt = new Date();
  date = `${dt.getDate()}/${dt.getMonth()+1}/${dt.getFullYear()} ${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}`
  return date; 
}


async function submit(inputUser, score) {
  //var date = await Date();
  var user = document.getElementById('inputUser').value;
  if(user == ""){
    console.log('No user');
  }
  else{
    var fecha = date();
    const data = { user, score, fecha};
    console.log(data);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    await fetch("/score", options);
  }

}

var bricks = [];
for (c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

inputUser.onkeyup = function startGameInput(e){
  if(e.keyCode == 13 && presh == 0 ){
    game();  
  }
  else{
    console.log('No se ha pulsado enter')
  }
}

function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  //console.log(relativeX);
  if (relativeX > 35 && relativeX < canvas.width - 35) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

function keyDownHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = true;
  } else if (e.keyCode == 37) {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = false;
  } else if (e.keyCode == 37) {
    leftPressed = false;
  }
}
function collisionDetection() {
  for (c = 0; c < brickColumnCount; c++) {
    for (r = 0; r < brickRowCount; r++) {
      var b = bricks[c][r];
      if (b.status == 1) {
        if (
          x > b.x &&
          x < b.x + brickWidth &&
          y > b.y &&
          y < b.y + brickHeight
        ) {
          dy = -dy;
          b.status = 0;
          color = colorRandom();
          score += 2;
          pointsToWin++;
          if (pointsToWin == brickRowCount * brickColumnCount) {
            console.log("Has gandado");
            alert("YOU WIN, CONGRATULATIONS!, SCORE: " + score);
            document.location.reload();
          }
        }
      }
    }
  }
}
function drawScore() {
  ctx.font = "12px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("Score: " + score, 8, 20);
}

function drawLives() {
  ctx.font = "12px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();
}

function colorRandom() {
  var letters = "123456789ABCDEF";
  var string = "";

  for (i = 0; i < 6; i++) {
    string += letters[Math.floor(Math.random() * 15)];
  }
  string = "#" + string;
  return string;
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
//paddleX = dx;
}
function drawBricks() {
  for (c = 0; c < brickColumnCount; c++) {
    for (r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status == 1) {
        var brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        var brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = color;
        ctx.strokeStyle = "black";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function playgame(){

  presh = 1;
  console.log('playgame()');
  //game();
  function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();

  collisionDetection();

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
    color = colorRandom();
    document.body.style.background = colorRandom();
  }
  if (y + dy < ballRadius) {
    dy = -dy;
    color = colorRandom();
    document.body.style.background = colorRandom();
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      if (velocidad >= 7) {
        dy = velocidadbola;
        velocitylevel.innerText = `Nivel Velocidad 7`;
      } else {
        dy = velocidadbola;
        velocidadbola = velocidadbola - 1;
        velocidad += 1;
        velocitylevel.innerText = `Nivel Velocidad ${velocidad}`;

      }
    } else { 
      lives--;
      velocidadbola = -7;
      console.log('lives',lives);
    
      if (lives === 0) {
        console.log("lives === 0")
        submit(user, score);
        alert("GAME OVER, TE HAS QUEDADO SIN VIDAS");
        document.location.reload()
    } 
    else {
      alerthtml.classList.remove('d-none')
      alerthtml.innerText = `Te quedan ${lives} vidas`;
      setTimeout(()=>alerthtml.classList.add('d-none'),1000);
      x = canvas.width / 2;
      y = canvas.height - 30;
      dx = 3;
      dy = -3;
      paddleX = (canvas.width - paddleWidth) / 2;
    }

   
    }
  }
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += velocidadPaddle;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= velocidadPaddle;
  }

  x += dx;
  y += dy;
  requestAnimationFrame(draw);
}
draw();
}
