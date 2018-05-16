// in this sketch we're going to send the webcam to the shader and run different convolution kernels on the image
// kernel convolution is a process by which every pixel is multiplied by a matrix of values
// here's some more info about convolution http://setosa.io/ev/image-kernels/

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
  
  // the size of one pixel on the screen
  camShader.setUniform('stepSize', [1.0/width, 1.0/height]);

  // how far away to sample from the current pixel
  // 1 is 1 pixel away
  camShader.setUniform('dist', 3.0);

  // rect gives us some geometry on the screen
  rect(0,0,width, height);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}