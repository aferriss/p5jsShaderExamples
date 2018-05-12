precision mediump float;

// lets grab texcoords just for fun
varying vec2 vTexCoord;

// our texture coming from p5
uniform sampler2D tex0;
uniform vec2 resolution;

void main() {

  vec2 uv = vTexCoord;
  // the texture is loaded upside down and backwards by default so lets flip it
  uv = 1.0 - uv;

  // lets figure out how big a pixel is on our screen
  // we can do this by diving 1 by the width and height of our sketch
  vec2 pixelSize = vec2(1.0) / resolution;

  // this variable will be used to offset the color channels
  // try changing the 10.0 here to see a bigger or smaller change
  vec2 offset = pixelSize * 10.0;

  // make a vec4 for each color channel (rgb)
  // on the red and blue channels, we will move the texture coordinates just a little
  vec4 rTex = texture2D(tex0, uv - offset);
  vec4 gTex = texture2D(tex0, uv);
  vec4 bTex = texture2D(tex0, uv + offset);

  // recombine the three texures into a single one for output
  vec4 color = vec4(rTex.r, gTex.g, bTex.b, 1.0);

  gl_FragColor = color;
}