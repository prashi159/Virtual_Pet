var database ;
var foodS=0,foodStock;
var dog,dog1,dog2
var position
//var form
var feed,add,last 
var foodObject
var FeedTime
var Lastfeed
var name = "Dog"
var happyDog ,dogImg ,milkImage
function preload()
{
  happyDog = loadImage("happyDog.png")
  dogImg = loadImage("Dog.png")
  milkImage=loadImage('Milk.png');
	//load images here
}

function setup() {
  createCanvas(1000, 500);
  database = firebase.database();
  console.log(database);
  foodObject = new Food();

  dog = createSprite(550,250,10,10);
  dog.addImage(happyDog)
  dog.scale=0.2

  foodStock = database.ref('Food')
  foodStock.on("value",readStock);

  Lastfeed = database.ref('FeedTime')
  Lastfeed.on("value",readTime)

  var dogo = database.ref('Food');
  dogo.on("value", readPosition, showError);

  feed = createButton("FEED DOGO")
  feed.position(700,115)
  feed.mousePressed(FeedDog)

  add = createButton("ADD FOOD")
  add.position(600,115)
  add.mousePressed(AddFood)
 
   
}
function readTime(time){
  FeedTime = time.val()
}
function readStock(data){
 foodS = data.val();

}

function writeStocks(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1
  }

  database.ref('/').update({
    Food:x
  })
}

var pasttime,delay = 15,state = "idle";
function draw() {  

  background(46,139,87);

  foodObject.display()

  
  drawSprites();
   
  fill(255,255,254);
  textSize(15);
  //console.log(Feedtime)
  setToHour();
  text("Last Feed: "+pasttime, 600, 115)
 drawSprites();
 if(pt<frameCount-delay){
  dog.addImage(happyDog) 
 }
 if(pt>frameCount-delay){
  image(milkImage,500+(frameCount-pt),220,100,80);
 }
}
function setToHour(){
  //pasttime = "Undefined"
  if(FeedTime >=12){
    pasttime = FeedTime%12 +" PM"
   }
   else if(FeedTime == 0) {
     pasttime = "12 AM";
   }
   else{
     pasttime = FeedTime + " AM"
   }
  }

function readPosition(data){
  position = data.val();
  foodObject.updateFoodStock(position)
}

function showError(){
  console.log("Error in writing to the database");
}
function writePosition(nazo){
  if(nazo>0){
    nazo=nazo-1
  }
  else{
    nazo=0
  }
  database.ref('/').set({
    'Food': nazo
  })

}
var pt;
function FeedDog(){

  if(foodS>0){
    pt = frameCount;

    dog.addImage(dogImg) 
  foodObject.updateFoodStock(foodObject.getFoodStock()-1)
   database.ref('/').update({
     Food:foodObject.getFoodStock(),
     FeedTime:hour()
   })
  }
  }
  function AddFood(){
    position++
    database.ref('/').update({
      Food:position})
    }
    