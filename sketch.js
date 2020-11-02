var PLAY=1;
var END=0;
var gameState=1;
var sword,swordImage;
var gameover;
var score;

function preload(){

  swordImage = loadImage("sword.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  alien1=loadAnimation("alien1.png");
  alien2=loadAnimation("alien2.png");
  gameOverImage=loadImage("gameover.png");
  knifeSwooshSound=loadSound("knifeSwooshSound.mp3");
  gameoverSound=loadSound("gameover.mp3");
}
function setup(){
  createCanvas(600,400);
  score=0;
  sword = createSprite(40,200,20,20);
  if(gameState===PLAY){
    sword.addImage(swordImage);
  }
  sword.scale=0.7;
  EnemyGroup=new Group();
  fruitsGroup=new Group();
}
function draw(){

  background('lightBlue');
  if(gameState===PLAY){
  sword.x=mouseX;
  sword.y=mouseY;
  fruits();
  enemy();
  if(fruitsGroup.isTouching(sword)){
  fruitsGroup.destroyEach();
  
  knifeSwooshSound.play();
  score=score+1;
  }
  }
  if(gameState===END){
    fruitsGroup.destroyEach();
    EnemyGroup.destroyEach();
    fruitsGroup.velocityX=0;
    EnemyGroup.velocityX=0;
    sword.addImage(gameOverImage);
    sword.scale=2;
    sword.x=300;
    sword.y=200;
  }
   if(EnemyGroup.isTouching(sword)){
   gameoverSound.play();
   gameState=END;
    }
  fill('white');
  text("YOUR SCORES : "+score,250,30);
  drawSprites();
}

function fruits(){
  if(frameCount%40===0){
    fruit = createSprite(300,400,20,20);
    fruit.scale=0.2;
  
    F=Math.round(random(1,4));
    if(F==1){
      fruit.y=400;
      fruit.velocityY=-(10+score/4);
      fruit.addImage(fruit1);
    }else if(F==2){
      fruit.y=0;
      fruit.velocityY=(10+score/4);
      fruit.addImage(fruit2);
    }else if(F==3){
      fruit.y=400;
      fruit.velocityY=-(10+score/4);
      fruit.addImage(fruit3);
    }else if(F==4){
      fruit.y=0;
      fruit.velocityY=(10+score/4);
      fruit.addImage(fruit4);
    }
     fruit.x=Math.round(random(4,400));
     fruit.setLifetime=100;
     fruitsGroup.add(fruit);
  }
}
function enemy(){
  if(frameCount%50===0){
    monster=createSprite(200,400,20,20);
    
 r=Math.round(random(1,2))
    if(r==1){
      monster.y=400
      monster.addAnimation("moving",alien1);
      monster.velocityY=-(10+score/10);
    }
    if(r==2){
      monster.y=0;
      monster.addAnimation("moving",alien2);
      monster.velocityY=(10+score/10);
    }
    monster.x=Math.round(random(4,400));
    monster.setLifetime=50;
    EnemyGroup.add(monster);

  }
}
   