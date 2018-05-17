// in this sketch we're going to make a black and white checker pattern in the shader


// a shader variable
let texcoordShader;

function preload(){
  // load the shader
  texcoordShader = loadShader('texcoord.vert', 'texcoord.frag');
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
}

function draw() {  
  // shader() sets the active shader with our shader
  shader(texcoordShader);

  texcoordShader.setUniform('resolution', [width, height]);
  // rect gives us some geometry on the screen
  rect(0,0,width, height);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}