precision mediump float;

// grab texcoords from the vertex shader
varying vec2 vTexCoord;

// our texture coming from p5
uniform sampler2D tex0;
uniform float mouseX;

// this is a common glsl function of unknown origin to convert rgb colors to luminance
// it performs a dot product of the input color against some known values that account for our eyes perception of brighness
// i pulled this one from here https://github.com/hughsk/glsl-luma/blob/master/index.glsl
float luma(vec3 color) {
  return dot(color, vec3(0.299, 0.587, 0.114));
}


void main() {

  vec2 uv = vTexCoord;
  // the texture is loaded upside down and backwards by default so lets flip it
  uv = 1.0 - uv;

  // get the webcam as a vec4 using texture2D
  vec4 tex = texture2D(tex0, uv);

  // convert the texture to grayscale by using the luma function  
  float gray = luma(tex.rgb);

  // here we will use the step function to convert the image into black or white
  // any color less than mouseX will become black, any color greater than mouseX will become white
  float thresh = step(mouseX, gray);

  // output the threshold value in all three rgb color channels
  gl_FragColor = vec4(thresh, thresh, thresh, 1.0);
}