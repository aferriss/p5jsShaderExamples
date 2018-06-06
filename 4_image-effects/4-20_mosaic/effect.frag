precision mediump float;

// grab texcoords from vert shader
varying vec2 vTexCoord;

// our textures coming from p5
uniform sampler2D tex0;
uniform vec2 resolution;


float amt = 0.1; // the amount of displacement, higher is more
float squares = 20.0; // the number of squares to render vertically

void main() {
  float aspect = resolution.x / resolution.y;
  float offset = amt * 0.5;

  vec2 uv = vTexCoord;
  
  // the texture is loaded upside down and backwards by default so lets flip it
  uv.y = 1.0 - uv.y;

  // copy of the texture coords
  vec2 tc = uv;

  // move into a range of -0.5 - 0.5
  uv -= 0.5;

  // correct for window aspect to make squares
  uv.x *= aspect;

  // tile will be used to offset the texture coordinates
  // taking the fract will give us repeating patterns
  vec2 tile = fract(uv * squares + 0.5) * amt;

  // sample the texture using our computed tile
  // offset will remove some texcoord edge artifacting
  vec4 tex = texture2D(tex0, tc + tile - offset);

  // render the output
  gl_FragColor = tex;
}