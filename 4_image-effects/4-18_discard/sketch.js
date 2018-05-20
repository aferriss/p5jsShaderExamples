// this sketch uses the discard command as a way to throw away pixels in the shader


// the shader variable
let camShader;

// the camera variable
let cam;


function preload(){
  // load the shader
  camShader = loadShader('effect.vert', 'effect.frag');
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();

  // initialize the webcam at the window size
  cam = createCapture(VIDEO);
  cam.size(windowWidth, windowHeight);

  // hide the html element that createCapture adds to the screen
  cam.hide();


}

function draw() {  


  // shader() sets the active shader with our shader
  shader(camShader);

  // send the camera and the two other past frames into the camera feed
  camShader.setUniform('tex0', cam);


  // rect gives us some geometry on the screen
  rect(0,0,width, height);


}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}