
function preload(){
  boyAnimation=loadAnimation("boy1.png","boy2.png","boy3.png","boy1.png","boy2.png","boy3.png")
  boyStanding = loadAnimation ("boy3.png")
  bg=loadImage ("start image.jpg")
  logoimg = loadImage ("logo.png")
  village = loadImage ("bg.png")
  boulder=loadImage ("boulder.png")
  wood = loadImage ("wood.png")
  coinimg = loadImage ("coin.png")
  ko = loadImage ("gameover.png")
}

function setup() {

  createCanvas(windowWidth,windowHeight)

  gamestate = "start"

  bg2=createSprite (width/2,height/2)
  bg2.addImage (village)
  bg2.scale = 1.3


  boy = createSprite(100,height-150)
  boy.addAnimation("boyrunning",boyAnimation)
  boy.addAnimation ("boyStanding",boyStanding)
  boy.scale=0.2

  logo = createSprite (width/2,100)
  logo.addImage (logoimg)

  ground = createSprite (width/2,height-70,width,20)
  ground.visible = false
  
  gameover = createSprite (width/2,height/2)
  gameover.addImage (ko)

  coinsGroup=createGroup ()
  obstaclesGroup = createGroup ()

  score = 0
  level1 = "play"
}

function draw() {
  background(0)
  drawSprites ()
  if (gamestate == "start") {
    background (bg)
    boy.visible=false
    logo.visible = true
    bg2.visible  = false 
    gameover.visible = false

    textAlign (CENTER)
    textSize (40)
    fill ("black")
    text ("Press `enter` to start on your journey",width/2,height/2)

    if (keyDown ("enter")) {
      gamestate = "level1"
    }

  }
  if (gamestate == "level1") {
    background (0)

    drawSprites ()
    textAlign (CENTER)
    textSize (20)
    fill ("white")
    text ("Score:"+score, 50,50)

    boy.visible = true
    gameover.visible = false
    logo.visible=false
    bg2.visible = true
    bg2.velocityX = -7
    
    if (bg2.x<0) {
      bg2.x = bg2.width/2
    }

    boy.collide (ground)
    if (keyDown ("space")&&boy.y>height-200) {
      boy.velocityY = -30
    }
    boy.velocityY +=1.5
    createCoins ()
    createObstacles ()
    
    for (var i=0;i<coinsGroup.length;i++){
      if (boy.isTouching(coinsGroup[i])){
        score +=1
        coinsGroup[i].destroy()
      }
    }
    if (obstaclesGroup.isTouching(boy)) {
      obstaclesGroup.setVelocityXEach(0)
      coinsGroup.setVelocityXEach(0)
      boy.velocityY = 0
      bg2.velocityX=0
      boy.changeAnimation ("boyStanding")
      obstaclesGroup.setLifetimeEach(-1)
      coinsGroup.setLifetimeEach (-1)
      gamestate = "gameOver"
    }
  }

  if (gamestate =="gameOver") {
    gameover.visible = true
  }
 
  
}

function createCoins () {
  if (frameCount%80 == 0  ) {
    coin = createSprite (width,random (height/2,height-200))
    coin.addImage(coinimg)
    coin.velocityX=-7
    coin.scale = 0.2
    coin.lifetime = 1000
    coinsGroup.add (coin)
  }
}

function createObstacles () {
  if  (frameCount%100==0) {
    o = createSprite (width,height-100)
    o.velocityX = -7
    r = Math.round (random(1,2))
    switch (r) {
      case 1 :o.addImage (boulder)
      o.scale = 0.3
      break 
      case 2:o.addImage (wood)
      o.scale = 0.2
      break
      default:break
    }
    o.scale = 0.3
    o.lifetime = 1000
    obstaclesGroup.add (o)
    o.debug = false
    o.setCollider ("circle",0,0,100)
  }
}