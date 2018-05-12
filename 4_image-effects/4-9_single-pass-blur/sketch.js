// in this sketch we're going to use a shader to blur the webcam in a single pass

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

  // lets just send the cam to our shader as a uniform
  camShader.setUniform('tex0', cam);

  // also send the size of 1 texel on the screen
  camShader.setUniform('texelSize', [1.0/width, 1.0/height]);

  // rect gives us some geometry on the screen
  rect(0,0,width, height);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}