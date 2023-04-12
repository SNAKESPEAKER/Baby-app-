var sound= "";
var Status= "";
var objects= [];
var status_of_song= ""

function preload() {
 sound= loadSound("Siren.mp3")
}

function setup() {
 canvas= createCanvas(600,400);
 canvas.center();   
 video= createCapture(VIDEO);
video.size(600,400);
video.hide();
obj= ml5.objectDetector("cocossd", modelLoaded);  
   document.getElementById("status").innerHTML= "Status: Detecting Objects"; 
}




function modelLoaded(){
   console.log("Model is loaded!");
   Status= true;
 }

function gotResult(error, result) {
   if (error) {
    console.error(error);
   } else{
    console.log(result);
    objects= result;
   }
}




function draw() {                                  
   image(video,0,0,600,400);                                                
   if (Status != "") {
      r= random(255);
      g= random(255); 
      b= random(255);
      obj.detect(video, gotResult);
      for ( index = 0; index < objects.length; index++) {
         document.getElementById("status").innerHTML= "Status: Object Detected";
         fill(r,g,b);
         stroke(r,g,b);
         noFill();
         percent= floor(objects[index].confidence *100);
         text(objects[index].label+" "+percent+"%",objects[index].x,objects[index].y);              
           rect(objects[index].x,objects[index].y,objects[index].width,objects[index].height); 
          
           if (objects[index].label=="person") {
            document.getElementById("baby_status").innerHTML="Baby Found";
            sound.stop();
           }
           else{
            document.getElementById("baby_status").innerHTML= "Baby Not Found"; 
            sound.play();
           }
         }
      if(objects.length==0){
         document.getElementById("baby_status").innerHTML= "Baby Not Found"; 
         sound.play();
   }
   }
   }