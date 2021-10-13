//create 2 variables for storing music
music_1 = "";
music_2 = "";

//4 variables to hold the x and y coordinates of the left and right wrist
leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

// 1. var to store score of left wrist
score_left = 0;

// var to store the score of right wrist
score_right = 0;

// 2. var to hold status of song files
song_status = "";

// var to store ststus of song 2
song2_status = "";

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

    // 4.1 color and border color of circle
    fill('#FF0000');
    stroke('#FF0000');

    // 4.2 get status of song 1
    song_status = music_1.isPlaying();
    console.log(song_status);

    // 4.3 if condition to check if the score of left wrist is greater than 0.2
    if(score_left > 0.2){

        // draw a a circle on the left wrist
        circle(leftWristX,leftWristY,20);

        //stop song 2 playing
        music_2.stop();

        
    // 4.4 if condition to check if status of song 1 is false (song is stopped)
    if(song_status == false){

        // play song 1
        music_1.play();
      
        // update the name of the song in the heading displayed on the webpage
        document.getElementById("song_name").innerHTML = " Name of the Song : Five Hundred Miles";

        //update the name of the singer
        document.getElementById("singer_name").innerHTML = "Singer : Justin Timberlake";
    }

    }

    //get the status of song
    song2_status = music_2.isPlaying();

    if(score_right > 0.2){
        //draw a circle on right wrist
        circle(rightWristX,rightWristY,20);

        //stop song 1
        music_1.stop();

        //check if song 2 is stopped
        if(song2_status == false){
            //play song 2
            music_2.play();

            //update the heading tag with the name of song 2 
            document.getElementById("song_name").innerHTML = "Name of the Song : Jamaica Farewell";

            //update the name of the singer
            document.getElementById("singer_name").innerHTML = "Singer : Harry Belafonte";
        }
    }

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

    // 3. fetch score of left wrist
    score_left = results[0].pose.keypoints[9].score;
    console.log("Score of Left Wrist : " + score_left);

    //fetch the score of right wrist
    score_right = results[0].pose.keypoints[10].score;
    console.log("Score of Right Wrist : " + score_right);
}