precision mediump float;

varying vec2 vTexCoord;

// we need the sketch resolution to perform some calculations
uniform vec2 resolution;
uniform float time;

// this is a function that turns an rgb value that goes from 0 - 255 into 0.0 - 1.0
vec3 rgb(float r, float g, float b){
  return vec3(r / 255.0, g / 255.0, b / 255.0);
}

// adapted from jono brandels simple circle https://www.shadertoy.com/view/XsjGDt
vec4 circle(float x, float y, float diam, vec3 col){
    vec2 coord = gl_FragCoord.xy;
    // flip the y coords for p5
    coord.y = resolution.y - coord.y;

    // store the x and y in a vec2 
    vec2 p = vec2(x, y);

    // calculate the circle
    // first you get the difference of the circles location and the screen coordinates
    // compute the length of that result and subtract the radius
    // this creates a black and white mask that we can use to multiply against our colors
    float c = length( p - coord) - diam*0.5;

    // restrict the results to be between 0.0 and 1.0
    c = clamp(c, 0.0,1.0);
  
    // send out the color, with the circle as the alpha channel  
    return vec4(rgb(col.r, col.g, col.b), 1.0 - c);  
}


void main() {

  // the width and height of our rectangle
  float width = 100.0;
  float height = 200.0;

  // the center of the screen is just the resolution divided in half
  vec2 center = resolution * 0.5;

  // lets make our rect in the center of the screen. We have to subtract half of it's width and height just like in p5
  float x = center.x ;
  float y = center.y ;

  // add an oscillation to x

  x += sin(time) * 200.0;

  // a color for the rect 
  vec3 grn = vec3(200.0, 240.0, 200.0);

  // a color for the bg
  vec3 magenta = rgb(240.0,150.0,240.0);

  // call our circle function
  vec4 circ = circle(x, y, 200.0, grn);
  // out put the final image

  // mix the circle with the background color using the circles alpha
  circ.rgb = mix(magenta, circ.rgb, circ.a);

  gl_FragColor = vec4( circ.rgb ,1.0);
}