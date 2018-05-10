// in this example we use a time uniform to drive an animation with a few of glsl's built in math functions
// you can find more info for GLSL functions online
// i like this page http://www.shaderific.com/glsl-functions/

precision mediump float;

// lets grab texcoords just for fun
varying vec2 vTexCoord;

// our time uniform variable coming from p5
uniform float time;


void main() {

  vec2 uv = vTexCoord;


  // the length function returns the square root of the sum of the squared components
  // for instance if you have vec3 abc;
  // length(abc) is the same as sqrt( a*a + b*b + c*c )
  // we can use it with our uv's to generate a circle
  float circle = length(uv*2.0 - 1.0);

  // lets slow down our time variable by multiplying it by a small number
  // try changing the speed
  float speed = 0.005;
  float slowTime = time * speed;

  // add the time to the circle
  // what happens if you comment out this line
  // what happens if slowTime is subtracted?
  // what happens if slowTime is multiplied
  circle += slowTime;

  // the fract function is built into glsl
  // it returns the 'fract'ional part of a number (everything to the right of the decimal point)
  circle = fract(circle);

  // make a vec4 out of our circle variable
  vec4 color = vec4(circle, circle, circle, 1.0);

  gl_FragColor = color;
}