//created variables
var trex ,trex_running, trexstop;
var ground, ground_img, invisibleground;
var cloud, cloud_img;
var obstacle, o1, o2, o3, o4, o5, o6;
var score;
var cloudsgroup, obstaclesgroup;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var restart, restart_img;
var gameover, gameover_img;
var checkPoint, jump, die;

function preload(){
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  ground_img = loadAnimation("ground2.png");
  cloud_img = loadAnimation("cloud.png");
  o1 = loadAnimation("obstacle1.png");
  o2 = loadAnimation("obstacle2.png");
  o3 = loadAnimation("obstacle3.png");
  o4 = loadAnimation("obstacle4.png");
  o5 = loadAnimation("obstacle5.png");
  o6 = loadAnimation("obstacle6.png");
  trexstop = loadAnimation("trex_collided.png");
  restart_img = loadAnimation("restart.png");
  gameover_img = loadAnimation("gameOver.png");
  checkPoint = loadSound("checkPoint.mp3");
  jump = loadSound("jump.mp3");
  die = loadSound("die.mp3");
}

function setup(){
  createCanvas(600,200);
  
  //create a trex sprite
  trex = createSprite(50,170,20,50);
  trex.addAnimation('run',trex_running);
  trex.addAnimation('stop', trexstop);
  trex.scale = 0.5;
  
  restart = createSprite(300, 150, 100, 100);
  restart.addAnimation('restarting', restart_img);
  restart.scale = 0.8;
  restart.visible = false;
  gameover = createSprite(300, 50, 50, 50);
  gameover.addAnimation('gameisover', gameover_img);
  gameover.scale = 0.8;
  gameover.visible = false;
  
  //creating the ground
  ground = createSprite(300, 170, 600, 10);  
  ground.addAnimation('move', ground_img);
  
  invisibleground = createSprite(300,185, 600, 10);
  invisibleground.visible = false;

  score = 0;
  
  obstaclesgroup = new Group();
  cloudsgroup = new Group();
  
  trex.setCollider("rectangle",0,0,100,100);
  
  //trex.debug = true;
}

function draw(){
  //console.time();
  background("lightblue")
  if(gamestate === PLAY){
    //creating infinite screen
    ground.velocityX = -4; 
    //Making dino jump
    if(keyDown('space') && trex.y>120){
      trex.velocityY = -12; 
      jump.play();
    }  
    //creating gravity
    trex.velocityY = trex.velocityY + 1;
    if(ground.x < 0){
      //ground.x = 300;
      ground.x = ground.width/2;
    }
    
    score = score + Math.round(frameCount/100);
    //console.log(frameCount);
    
    if(trex.isTouching(obstaclesgroup)){
       gamestate = END;
       die.play();
    }
  }
  
  if(gamestate === END){
     obstaclesgroup.setVelocityXEach(0);
     obstaclesgroup.setLifetimeEach(-1);
     ground.velocityX = 0;
     cloudsgroup.setVelocityXEach(0);
     cloudsgroup.setLifetimeEach(-1);
     trex.changeAnimation('stop', trexstop);
     restart.visible = true;
     gameover.visible = true;
  }

  console.log(gamestate);
  //Making trex not fall down out of screen
  trex.collide(invisibleground);
  
  //console.log(trex.y);
  //console.timeEnd();
  //console.count();
  //console.info(); grey
  //console.warn(); yellow
  //console.error(); red
  //console.log(frameCount);
  
  //displaying score
    fill("black");
    text("Score: " + score, 500, 50);

  createCloud();
  obstacles();
  
  drawSprites();

}

function createCloud(){
    if(frameCount % 60 === 0){
      cloud = createSprite(650, 50, 50, 50);
      cloud.velocityX = -2; 
      cloud.addAnimation('cloud', cloud_img);
      cloud.scale = 0.8;
      //creating random number
      //console.log(rand);
      var rand = Math.round(random (0, 100));
      cloud.y = rand;
    
      cloud.lifetime = 300;
    
      //adjusting depths
      //console.log(cloud.depth);
      cloud.depth = trex.depth;
      trex.depth = trex.depth + 1; 
      
      cloudsgroup.add(cloud);
  }
}

function obstacles(){
  if(frameCount % 150 === 0){
     obstacle = createSprite(650, 150, 50, 50);
     obstacle.velocityX = -2;
     var rand = Math.round(random(1,6));
     switch(rand){
       case 1: obstacle.addAnimation('obstacle1',o1);
               break;
       case 2: obstacle.addAnimation('obstacle2', o2);
               break;
       case 3: obstacle.addAnimation('obstacle3', o3);
               break;
       case 4: obstacle.addAnimation('obstacle4', o4);
               break;
       case 5: obstacle.addAnimation('obstacle5', o5);
               break;
       case 6: obstacle.addAnimation('obstacle6', o6);
               break;
       default: obstacle.addAnimation('obstacle4', o4); 
                break;
     }
    obstaclesgroup.add(obstacle);
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
  }
}