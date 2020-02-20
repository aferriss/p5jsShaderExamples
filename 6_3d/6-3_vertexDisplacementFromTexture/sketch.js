// This line is used for auto completion in VSCode
/// <reference path="../../node_modules/@types/p5/global.d.ts" />
//this variable will hold our shader object

let myShader;
let noise;

function preload() {
  // a shader is composed of two parts, a vertex shader, and a fragment shader
  // the vertex shader prepares the vertices and geometry to be drawn
  // the fragment shader renders the actual pixel colors
  // loadShader() is asynchronous so it needs to be in preload
  // loadShader() first takes the filename of a vertex shader, and then a frag shader
  // these file types are usually .vert and .frag, but you can actually use anything. .glsl is another common one
  myShader = loadShader("shader.vert", "shader.frag");

  noise = loadImage("noise.png");
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
}

function draw() {
  background(0);
  // shader() sets the active shader with our shader
  shader(myShader);

  // Send the frameCount to the shader
  myShader.setUniform("uFrameCount", frameCount);
  myShader.setUniform("uNoiseTexture", noise);

  // Rotate our geometry on the X and Y axes
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.005);

  // Draw some geometry to the screen
  // We're going to tessellate the sphere a bit so we have some more geometry to work with
  sphere(width / 10, 200, 200);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
