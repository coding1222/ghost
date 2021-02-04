var towerImg, tower;
var door, doorImg, doorGroup;
var climberImg, climber, climberGroup;
var ghost, ghostImg;
var invisibleBlock, invisibleBlockGroup;
var gameState = "play";
var spookySound ;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  doorGroup = new Group();
  climberGroup = new Group();
  invisibleBlockGroup = new Group();
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  spookySound.loop();
  tower = createSprite(300, 300);
  tower.addImage(towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage(ghostImg);
  ghost.scale = .3
}

function draw(){
  if(gameState === "play"){
  background(0);
  if(tower.y >400){
    tower.y = 300
  }
  if(keyDown("left_arrow")){
    ghost.x = ghost.x-3
  }  
  if(keyDown("right_arrow") ){
    ghost.x = ghost.x+3
  }
  if(keyDown("space")){
    ghost.velocityY = -5
  }
  
  ghost.velocityY = ghost.velocityY+0.8
  
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY = 0
  }
  
  if(invisibleBlockGroup.isTouching(ghost) || ghost.y>600){
    ghost.destroy();
    gameState = "end"
  }
  spawnDoors();
  drawSprites();
  }
  if(gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game over", 250,300);
  }
}

function spawnDoors(){
  if(frameCount%240 === 0){
    door = createSprite(200 ,-50)
    door.addImage(doorImg);
    
    climber = createSprite(200, 10);
    climber.addImage(climberImg);
    
    climberGroup.add(climber);
    doorGroup.add(door);
    
    invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    door.x = Math.round(random(120,400));
    door.velocityY = 1
    ghost.depth = door.depth+1;                
    
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 1;
    
    invisibleBlock.debug = true;
    invisibleBlockGroup.add(invisibleBlock);
    
    climber.x = door.x;
    climber.velocityY = 1; 
    door.lifetime= 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800
  }
}