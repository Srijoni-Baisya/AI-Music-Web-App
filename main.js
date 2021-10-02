//create 2 variables for storing music
music_1 = "";
music_2 = "";

//4 variables to hold the x and y coordinates of the left and right wrist
leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

//define preload function to load the 2 songs
function preload(){
    music_1 = loadSound("music1.mp3");
    music_2 = loadSound("music_2.mp3");
}

function setup(){
    //create the canvas
    canvas = createCanvas(400,350);
    canvas.center();

    //access the webcam
    video = createCapture(VIDEO);

    //hiding the extra component
    video.hide();

    //initialize poseNet model
    poseNet = ml5.poseNet(video,modelLoaded);

    //execute poseNet model
    poseNet.on('pose',gotPoses);
}

//define modelLoaded() function
function modelLoaded(){
    console.log("PoseNet is initialized !")
}

function draw(){
    //place the webcam live view on the canvas
    image(video,0,0,400,350);
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
    }

    //fetch the x and y coordinates of the left and the right wrist, store them and display on console
    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("Left Wrist X : " + leftWristX + " , Left Wrist Y : " + leftWristY);

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("Right Wrist X : " + rightWristX + " , Right Wrist Y : " + rightWristY);
}