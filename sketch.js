var space,spaceImg;
var ship,shipImg;
var goldbar,goldbarImg,goldbarGroup;
var goldcoin,goldcoinImg,goldcoinGroup;
var star,starImg,starGroup;
var bomb,bombImg,bombGroup;
var points = 0;
var goldbarGroup,goldcoinGroup,bombGroup,starGroup;
var gameOver;
var burst,burstImg;
//Game States
var PLAY = 1;
var END = 0;
var gameState = 1;

function preload(){
  spaceImg = loadImage("space-2.jpg");
  shipImg = loadImage("ship01.png");
  goldbarImg = loadImage("goldbar.png");
  goldcoinImg = loadImage("goldcoin.png");
  starImg = loadImage("powerupYellow_star.png");
  bombImg = loadImage("gameplayobject_item_03.png");
  endImg = loadImage("textGameOver.png");
  burstImg = loadImage("burst06.png")
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  //Moving background
  space = createSprite(width/2,300);
  space.addImage(spaceImg);
  space.velocityY = 1;
  
  
  //Creating ship
  ship = createSprite (width/2,height-20,10,10);
  ship.addImage("ship",shipImg);
  ship.scale = 0.25;
  
  
  goldbarGroup = new Group();
  goldcoinGroup = new Group();
  bombGroup = new Group();
  starGroup = new Group();
}

function draw() {
  if(space.y>height){
    space.y=height/2
  }
  ship.x = World.mouseX;
  ship.y = World.mouseY;
  edges= createEdgeSprites();
  ship.collide(edges);
 
  background("pink");
    if (gameState === PLAY) {
    
    
    
    
    
    createGoldbar();
    createGoldcoin();
    createBomb();
    createStar();
    
    if(goldbarGroup.isTouching(ship)) {
      goldbarGroup.destroyEach();
      points=points+50;
    }
    else if(goldcoinGroup.isTouching(ship)){
      goldcoinGroup.destroyEach();
      points=points+100;
    }
    else if(starGroup.isTouching(ship)){
      starGroup.destroyEach();
      points=points+150;
      
    }
    else{
      if(bombGroup.isTouching(ship)){
        gameState = END;
        if(keyDown("space")){
          restart();
        }
        
        ship.addImage("ship",shipImg)
        
        ship.x = 200;
        ship.y = 300;
        ship.scale = 0.25;
        
        goldbarGroup.destroyEach();
        goldcoinGroup.destroyEach();
        starGroup.destroyEach();
        bombGroup.destroyEach();
        
        goldbarGroup.setVelocityEach(0);
        goldcoinGroup.setVelocityEach(0);
        starGroup.setVelocityEach(0);
        bombGroup.setVelocityEach(0);
        
        
      }
    }
    }
    if (gameState===END){
      space.visibe = false;
      
      
      burst =createSprite(width/2,200)
      burst.addImage("burst",burstImg)
      burst.scale = 0.5
      
      gameOver = createSprite(width/2,200)
      gameOver.addImage("gameOver",endImg)
      gameOver.scale = 0.5
      
    }
  
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Points:"+points,50,30);
  
  
}

function createGoldbar(){
  if(World.frameCount%80 == 0){
    var goldbar = createSprite(Math.round(random(50,width-300),40,10,10))
    goldbar.addImage(goldbarImg);
    goldbar.scale=0.1;
    goldbar.velocityY = 9;
    goldbar.lifetime = 150;
    goldbarGroup.add(goldbar);
  }
}
function createGoldcoin(){
  if(World.frameCount%50 == 0) {
    var goldcoin = createSprite(Math.round(random(50,width-300),40,10,10));
    goldcoin.addImage(goldcoinImg);
    goldcoin.scale = 0.5;
    goldcoin.velocityY = 9;
    goldcoin.lifetime = 150;
    goldcoinGroup.add(goldcoin);
    
  }
}
function createStar(){
  if(World.frameCount%60 == 0) {
    var star = createSprite(Math.round(random(50,width-300),40,10,10));
    star.addImage(starImg);
    star.scale = 0.7;
    star.velocityY = 9;
    star.lifetime = 150;
    starGroup.add(star);
  }
}
function createBomb(){
  if(World.frameCount%70 == 0){
    var bomb = createSprite(Math.round(random(50,width-300),40,10,10));
    bomb.addImage(bombImg);
    bomb.scale = 0.1;
    bomb.velocityY = 9;
    bomb.lifetime = 150;
    bombGroup.add(bomb);
    
  }
}