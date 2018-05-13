// in this sketch we're going to use two passes with different shaders to create an efficient gaussian blur

// the shader variables
// we will have one shader that blurs horizontally, and one that blurs vertically
let blurH, blurV;
// the camera variable
let cam;

// we need two createGraphics layers for our blur algorithm
let pass1, pass2;

function preload(){
  // load the shaders, we will use the same vertex shader and frag shaders for both passes
  // we need two shader variables though because p5 has a bug where it doesn't let you re-use shaders
  blurH = loadShader('base.vert', 'blur.frag');
  blurV = loadShader('base.vert', 'blur.frag');
}

function setup() {
  // shaders require WEBGL mode to work
  // at present time, there is no WEBGL mode image() function so we will make our createGraphics() in WEBGL, but the canvas renderer will be P2D (the default)
  createCanvas(windowWidth, windowHeight);
  noStroke();

  // initialize the webcam at the window size
  cam = createCapture(VIDEO);
  cam.size(windowWidth, windowHeight);

  // hide the html element that createCapture adds to the screen
  cam.hide();

  // initialize the createGraphics layers
  pass1 = createGraphics(windowWidth, windowHeight, WEBGL);
  pass2 = createGraphics(windowWidth, windowHeight, WEBGL);

  // turn off the cg layers stroke
  pass1.noStroke();
  pass2.noStroke();
  
}

function draw() {  
  
  // set the shader for our first pass
  pass1.shader(blurH);

  // send the camera texture to the horizontal blur shader
  // send the size of the texels
  // send the blur direction that we want to use [1.0, 0.0] is horizontal
  blurH.setUniform('tex0', cam);
  blurH.setUniform('texelSize', [1.0/width, 1.0/height]);
  blurH.setUniform('direction', [1.0, 0.0]);

  // we need to make sure that we draw the rect inside of pass1
  pass1.rect(0,0,width, height);
  
  // set the shader for our second pass
  pass2.shader(blurV);

  // instead of sending the webcam, we will send our first pass to the vertical blur shader
  // texelSize remains the same as above
  // direction changes to [0.0, 1.0] to do a vertical pass
  blurV.setUniform('tex0', pass1);
  blurV.setUniform('texelSize', [1.0/width, 1.0/height]);
  blurV.setUniform('direction', [0.0, 1.0]);

  // again, make sure we have some geometry to draw on in our 2nd pass
  pass2.rect(0,0,width, height);

  // draw the second pass to the screen
  image(pass2, 0,0, width, height);
  
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}