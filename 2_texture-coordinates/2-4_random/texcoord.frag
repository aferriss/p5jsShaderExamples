precision mediump float;

// this is the same variable we declared in the vertex shader
// we need to declare it here too!
varying vec2 vTexCoord;


// there is not a random() function in glsl so we will need to make our own
// a common way to do this in glsl is to use a math function that is chaotic enough to seem naturally random
// if you fiddle with this function a bit, you might see some artifacts appear
// this is a common glsl rand function of unknown origin feel free to use it wherever you like!
// there is more info about it (and other random functions) here: https://stackoverflow.com/questions/4200224/random-noise-functions-for-glsl
// the general gist of the math is that we just take the fractional part of a sine wave, meaning whatever is to the right of the decimal in the output of a sine function
float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main() {

  // copy the vTexCoord
  // vTexCoord is a value that goes from 0.0 - 1.0 depending on the pixels location
  // we can use it to access every pixel on the screen
  vec2 coord = vTexCoord;
  
  // call the random function using our texture coordinates
  // this will give us a new random number for every pixel on the screen
  // what happens if you multiply the coords by another number?
  float random = rand(coord);

  gl_FragColor = vec4(random, random, random, 1.0 );
}