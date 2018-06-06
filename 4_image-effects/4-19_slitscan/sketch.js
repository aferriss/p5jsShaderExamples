// this sketch holds on to a collection of old frames in order to create a slitscan effect
// it actually doesn't use a shader but it's often lumped in with graphics things so here it is

// the camera variable
let cam;

let pastFrames = []; // an array to store old frames
let numFrames = 256; // how many frames to store. We will run out of memory at a certain point so don't make this too big
let step, windowStep; // the height of our slit strips

// the width and height of our past frames
// we make them smaller so that we can store more
// at the expense of image quality
let w = 512;
let h = 512;

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(windowWidth, windowHeight);
  noStroke();

  // initialize the webcam at the window size
  cam = createCapture(VIDEO);
  cam.size(windowWidth, windowHeight);

  // hide the html element that createCapture adds to the screen
  cam.hide();

  // calculate the height of each horizontal strip
  // might have to floor this to prevent gaps...
  step = h / numFrames;

  windowStep = height / numFrames;

  // for every frame, add a graphics layer
  for(let i = 0; i<numFrames; i++){
    let p = createGraphics(w, h);
    pastFrames.push(p);
  }
}

function draw() {  

  
  // draw the current camera frame in the first element of the array
  pastFrames[0].image(cam, 0, 0, w, h);
  
  // draw our slit scan to the screen
  // we loop through all the frames and draw a slice at each step along the y axis
  for(let i = 0; i<pastFrames.length; i++){
    // image(img, x, y, w, h, srcX, srcY, srcW, srcH);
    image(pastFrames[i], 0, windowStep * i, width, windowStep, 0, step*i, w, step);
  }

  // move every element forward by 1, except the last element
  // this is important to keep the frames cycling 
  // otherwise we'd just see one frame updating at a time
  for(let i = 0; i<pastFrames.length-1; i++){
    pastFrames[i] = pastFrames[i+1];
  }

  // move the last element to the beginning
  pastFrames[pastFrames.length-1] = pastFrames[0];

}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);

  step = (h / numFrames);
}