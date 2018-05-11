precision mediump float;

// this is the same variable we declared in the vertex shader
// we need to declare it here too!
varying vec2 vTexCoord;

void main() {

  // copy the vTexCoord
  // vTexCoord is a value that goes from 0.0 - 1.0 depending on the pixels location
  // we can use it to access every pixel on the screen
  vec2 coord = vTexCoord;
  
  // lets multiply the coordinates by a factor of 10
  coord *= 10.0;

  // use the fract function so that the values always fluctuate between 0 - 1
  // fract will return whatever number is to the right of the decimal point
  // it is built in to glsl 
  coord = fract(coord);
  gl_FragColor = vec4(coord.x, coord.y, 0.5, 1.0 );
}