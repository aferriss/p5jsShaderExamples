// this example shows you how to draw a circle with a shader

//this variable will hold our shader object
let circleShader;

function preload(){
  circleShader = loadShader('base.vert', 'circle.frag');
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
}

function draw() {  
  // shader() sets the active shader with our shader
  shader(circleShader);

  // lets send the time and resolution to our shader
  circleShader.setUniform('resolution', [width, height]);
  circleShader.setUniform('time', frameCount * 0.05);
  
  // rect gives us some geometry on the screen
  rect(0,0,width, height);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}