//create 2 variables for storing music
music_1 = "";
music_2 = "";

//define preload function to load the 2 songs
function preload(){
    music_1 = loadSound("music1.mp3");
    music_2 = loadSound("music_2.mp3");
}

function setup(){
    //create the canvas
    canvas = createCanvas(480,480);
    canvas.center();

    //access the webcam
    video = createCapture(VIDEO);

    //hiding the extra component
    video.hide();
}

function draw(){
    //place the webcam live view on the canvas
    image(video,0,0,480,480);
}