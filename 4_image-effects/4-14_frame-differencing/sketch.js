// in this sketch we're going to send the current frame and one past frame to the shader
// we will subtract one frame from the other to find the difference between the frames
// frame differencing can be useful  when you want to detect if something is moving in front of the camera, or as a stepping stone to something like determining optical flow

// the shader variable
let camShader;

// the camera variable
let cam;

// we need one extra createGraphics layer for the previous video frame
let pastFrame;

function preload(){
  // load the shader
  camShader = loadShader('effect.vert', 'effect.frag');
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();

  // the pastFrame layer doesn't need to be WEBGL
  pastFrame = createGraphics(windowWidth, windowHeight);

  // initialize the webcam at the window size
  cam = createCapture(VIDEO);
  cam.size(windowWidth, windowHeight);

  // hide the html element that createCapture adds to the screen
  cam.hide();

}

function draw() {  
  // shader() sets the active shader with our shader
  shader(camShader);

  // lets just send the cam to our shader as a uniform
  camShader.setUniform('tex0', cam);

  // send the pastframe layer to the shader
  camShader.setUniform('tex1', pastFrame);

  // also send the mouseX value but convert it to a number between 0 and 1
  camShader.setUniform('mouseX', mouseX/width);

  // rect gives us some geometry on the screen
  rect(0,0,width, height);


  // draw the cam into the createGraphics layer at the very end of the draw loop
  // because this happens at the end, if we use it earlier in the loop it will still be referencing an older frame
  pastFrame.image(cam, 0,0, windowWidth, windowHeight);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}