status="";
object = [];

function preload(){
    mysound = loadSound("e.mp3");
}

function setup(){ 
    canvas = createCanvas(380, 320);
    canvas.center()
    video = createCapture(VIDEO);
    video.size(380, 320);
    video.hide();
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML ="Status:Detecting Image";
}

function draw(){

    image(video , 0 , 0, 380, 320);
    if(status != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult)
        for(i=0; i < object.length; i++){
            document.getElementById("status").innerHTML = "Status = Objects Detected.";
            document.getElementById("number").innerHTML = "Number of object detections is " + object.length;

            fill(r, g, b);
            percent = floor(object[i].confidence * 100);
            text(object[i].label + "" + percent + "%" ,object[i].x, object[i].y);
            noFill();
            stroke(r, g, b);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }

        if(object == []){
            mysound.play();
        }
    }
}

function modelLoaded(){
    console.log("Modal has loaded");
    status= true;
    objectDetector.detect(video, gotResult);
}
function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    object = results;
    
    
    }
    

