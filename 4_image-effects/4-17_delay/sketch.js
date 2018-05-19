// this sketch creates a "multix" or texture delay effect. 


// the shader variable
let camShader;

// the camera variable
let cam;

// we will need at least two layers for this effect
let shaderLayer;

// how many past frames should we store at once
// the more you store, the further back in time you can go
// however it's pretty memory intensive so don't push it too hard
let numLayers = 90;

// an array where we will store the past camera frames
let layers = [];

// three indices representing a given momeny in time
// index1 is current
// index2 is 30 frames behind
// index3 is 60 frames behind
let index1 = 0;
let index2 = numLayers/3; // 30
let index3 = numLayers/3 * 2; // 60

function preload(){
  // load the shader
  camShader = loadShader('effect.vert', 'effect.frag');
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(windowWidth, windowHeight);
  noStroke();

  // initialize the webcam at the window size
  cam = createCapture(VIDEO);
  cam.size(windowWidth, windowHeight);

  // hide the html element that createCapture adds to the screen
  cam.hide();

  // this layer will use webgl with our shader
  shaderLayer = createGraphics(windowWidth, windowHeight, WEBGL);

  // create a ton of createGraphics layers
  for (let i = 0; i < numLayers; i++){
    let l = createGraphics(windowWidth, windowHeight);
    layers.push(l);
  }

}

function draw() {  

  // draw the camera on the current layer
  layers[index1].image(cam, 0, 0, width, height);

  // shader() sets the active shader with our shader
  shaderLayer.shader(camShader);

  // send the camera and the two other past frames into the camera feed
  camShader.setUniform('tex0', layers[index1]);
  camShader.setUniform('tex1', layers[index2]);
  camShader.setUniform('tex2', layers[index3]);


  // rect gives us some geometry on the screen
  shaderLayer.rect(0,0,width, height);


  // render the shaderlayer to the screen
  image(shaderLayer, 0,0,width, height);

  // increase all indices by 1, resetting if it goes over layers.length
  // the index runs in a circle 0, 1, 2, ... 29, 30, 0, 1, 2, etc.
  // index1
  // index2 will be somewhere in the past
  // index3 will be even further into the past
  index1 = (index1 + 1)  % layers.length;
  index2 = (index2 + 1) % layers.length;
  index3 = (index3 + 1) % layers.length;
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}