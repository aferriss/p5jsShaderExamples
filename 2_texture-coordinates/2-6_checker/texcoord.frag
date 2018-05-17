precision mediump float;

// this is the same variable we declared in the vertex shader
// we need to declare it here too!
varying vec2 vTexCoord;

uniform vec2 resolution;



void main() {

  // copy the vTexCoord
  // vTexCoord is a value that goes from 0.0 - 1.0 depending on the pixels location
  // we can use it to access every pixel on the screen
  vec2 coord = vTexCoord;

  // correct the aspect ration on the x direction
  coord.x *= resolution.x / resolution.y;

  // how many tiles to make across the y axis
  float tiles = 100.0;
  
  // multiply both coords by the amount of tiles and floor them so that we have tex coords that just count up, 0, 1, 2, 3, 4 ...
  float col = floor(coord.x * tiles) + floor(coord.y * tiles);

  // mod the col by 2.0 so that it alternates between 0 and 1
  col = mod(col, 2.0);

  gl_FragColor = vec4(col, col, col, 1.0 );
}