precision mediump float;

// grab texcoords from the vertex shader
varying vec2 vTexCoord;

// our texture coming from p5
uniform sampler2D tex0;

void main() {

  vec2 uv = vTexCoord;
  // the texture is loaded upside down and backwards by default so lets flip it
  uv = 1.0 - uv;

  // lets take a column of pixels from the middle of the screen and spread them across 
  vec2 tc = vec2(0.5, uv.y);

  // get the webcam as a vec4 using texture2D and our new tc variable
  vec4 tex = texture2D(tex0, tc);

  // output the texture
  gl_FragColor = tex;
}