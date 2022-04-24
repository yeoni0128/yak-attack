var yak, yakfront, yakback, yakleft, yakright, titleImage, title, obstacle1, obstacle2, obstaclesGroup, ex, b, bg, leftedge, rightedge

var PLAY = 1
var MENU = 0
var END = 2
var gamestate = MENU

var score = 0
var highscore = 0
var scoreList = []

function preload() {
  yakfront = loadAnimation("front1.png", "front2.png", "front3.png")
  yakback = loadAnimation("back1.png", "back2.png", "back3.png")
  yakleft = loadAnimation("left1.png", "left2.png", "left3.png")
  yakright = loadAnimation("right1.png", "right2.png", "right3.png")
  ex = loadAnimation("ex.gif")
  playButton = loadImage("play.png")
  titleImage = loadImage("title.png")
  obstacle1 = loadImage("rock.png")
  obstacle2 = loadImage("tree.png")
  b = loadImage("b.png")
}

function setup() {
  inc = 0
  createCanvas(400, 600);
  bg = createSprite(200, 0)
  bg.addImage("bg", b)
  yak = createSprite(200, 520)
  yak.addAnimation("front", yakfront)
  yak.addAnimation("left", yakleft)
  yak.addAnimation("right", yakright)
  yak.addAnimation("back", yakback)
  yak.addAnimation("oof", ex)
  title = createSprite(200, 200)
  title.addImage("title", titleImage)
  title.scale = 0.85
  leftedge = createSprite(0, 300, 10, 600)
  rightedge = createSprite(400, 300, 10, 600)
  leftedge.visible = false
  rightedge.visible = false
  obstaclesGroup = createGroup()
}

function draw() {
  bg.velocityY = score / 100 + 3
  if (bg.y > 470) {
    bg.y = 300
  }

  background(204, 230, 255);
  if (gamestate === MENU) {
    drawSprites();
    score = 0
    title.visible = true
    yak.scale = 2.5
    textSize(18)
    fill("white")
    text("Click Space to Play", 120, 370)
    if (keyIsDown(32)) {
      gamestate = PLAY
    }
  } else if (gamestate === PLAY) {
    score = score + 1
    drawSprites();
    textSize(16)
    fill("white")
    text("Score: " + score, 20, 20)
    text("High Score: " + highscore, 20, 40)
    title.visible = false
    yak.scale = 0.9
    spawnObstacles()
    if (keyIsDown(RIGHT_ARROW)) {
      yak.changeAnimation("right")
      yak.x = yak.x + 6
    } else if (keyIsDown(LEFT_ARROW)) {
      yak.changeAnimation("left")
      yak.x = yak.x - 6
    } else {
      yak.changeAnimation("back")
    }
    yak.collide(rightedge)
    yak.collide(leftedge)
    if (yak.isTouching(obstaclesGroup)) {
      gamestate = END
    }
  } else if (gamestate === END) {
    drawSprites();
    title.visible = true
    var scoree = score
    obstaclesGroup.destroyEach();
    yak.changeAnimation("oof")
    yak.scale = 0.5
    textSize(16)
    fill("white")
    text("Click Space to Restart", 120, 370)
    text("Your Score was " + scoree + ".", 120, 350)
  }
}

function spawnObstacles() {
  if (frameCount % 10 === 0) {
    var obstacle = createSprite(random(0, 400), 0);
    obstacle.velocityY = score / 100 + 10;
    var rand = Math.round(random(1, 2));
    switch (rand) {
      case 1: obstacle.addImage(obstacle1);
        obstacle.scale = 0.06;
        break;
      default: obstacle.addImage(obstacle2);
        obstacle.scale = 0.095
        break;
    }
    obstacle.lifetime = 60;
    obstaclesGroup.add(obstacle);
  }
}

function highScore() {
  for(var i = 0;i < scoreList.length;i++){
    if(scoreList[i] > highscore){
      highscore = scoreList[i]
    }
    }
  }


function keyReleased() {
  if (keyCode === 32 && gamestate === END) {
    scoreList.push(score)
    highScore()
    gamestate = PLAY
    score = 0
    inc = 0
  }
}