precision mediump float;

// this is the same variable we declared in the vertex shader
// we need to declare it here too!
varying vec2 vTexCoord;

void main() {

  // copy the vTexCoord
  // vTexCoord is a value that goes from 0.0 - 1.0 depending on the pixels location
  // we can use it to access every pixel on the screen
  vec2 coord = vTexCoord;
  
  // lets use it to make some colors
  // the x axis will fade from black to red
  // the y axis will fade from black to green
  // we'll also add a little (0.5) blue in there for fun
  // try different variations of this line!
  // what happens when you use coord.x in all three color slots
  gl_FragColor = vec4(coord.x, coord.y, 0.5, 1.0 );
}