// this example shows you how to draw a n-sided shape with a shader

//this variable will hold our shader object
let shapeShader;

function preload(){
  shapeShader = loadShader('base.vert', 'polygon.frag');
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
}

function draw() {  
  // shader() sets the active shader with our shader
  shader(shapeShader);

  // lets send the time and resolution to our shader
  shapeShader.setUniform('resolution', [width, height]);
  shapeShader.setUniform('time', frameCount * 0.01);
  
  // rect gives us some geometry on the screen
  rect(0,0,width, height);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}