song = ""
scoreRightWrist = 0;
scoreLeftWrist = 0;
LeftWristX = 0;
RightWristX = 0;
RightWristY = 0;
LeftWristY  = 0;
function preload(){
    song = loadSound("We Rollin-Shubh.mp3")
}
function setup(){
    canvas = createCanvas(500,400);
    canvas.position(550,300);
    video = createCapture(VIDEO);
    video.hide()
    poseNet = ml5.poseNet(video , modelLoaded)
    poseNet.on( "pose" , gotPoses)

}
function modelLoaded(){
    console.log("Posenet Is Intiliazed")
}
function gotPoses(results){
console.log(results)
if(results.length > 0){
scoreRightWrist = results[0].pose.keypoints[10].score
scoreLeftWrist = results[0].pose.keypoints[9].score
LeftWristX = results[0].pose.leftWrist.x
RightWristX = results[0].pose.rightWrist.x
LeftWristY = results[0].pose.leftWrist.y
RightWristY = results[0].pose.rightWrist.y
}

}

function draw(){
    console.log("scoreLeftWrist")
    image(video,0,0,500.400)
    fill("#FF0000");
    stroke("#FF0000");
    console.log("scorerightWrist = "+ scoreRightWrist)
    if(scoreRightWrist > 0.2)
    {
        console.log("true")
        circle(RightWristX,RightWristY,30);
        if(RightWristY > 0 && RightWristY <= 100){
            document.getElementById("speed").innerHTML = "Speed = 0.5x"
            song.rate(0.5);
        }
        else if(RightWristY > 100 && RightWristY <=200){
            document.getElementById("speed").innerHTML = "Speed = 1x"
            song.rate(1);
        }
        else if(RightWristY > 200 && RightWristY <=300){
            document.getElementById("speed").innerHTML = "Speed = 1.5x"
            song.rate(1.5);
        }
        else if(RightWristY > 300 && RightWristY <=400){
            document.getElementById("speed").innerHTML = "Speed = 2x"
            song.rate(2);
        }
        else if(RightWristY >400){
            document.getElementById("speed").innerHTML = "Speed = 2.5x"
            song.rate(2.5);
        }
        }
        if(scoreLeftWrist > 0.2){
            circle(LeftWristX,LeftWristY,20);
            numericalleftWristY = Number(LeftWristY)
            remove_decimals = floor(numericalleftWristY)
            volume = remove_decimals/ 500;
            document.getElementById("volume").innerHTML = "Volume = "+volume;
            song.setVolume(volume)
        }
        
    }

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}



