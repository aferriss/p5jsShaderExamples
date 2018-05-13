precision mediump float;

varying vec2 vTexCoord;

// we need the sketch resolution to perform some calculations
uniform vec2 resolution;
uniform float time;
// this is a function that turns an rgb value that goes from 0 - 255 into 0.0 - 1.0
vec3 rgb(float r, float g, float b){
  return vec3(r / 255.0, g / 255.0, b / 255.0);
}

// this is the function that draws our rect
// it works just like rect in p5 except that it takes an additional color parameter at the end
vec3 rect (float x, float y, float w, float h, vec3 color){

  // in this example we will use gl_FragCoord which is a variable that just gives us pixel position as whole numbers, just like in p5
  vec2 coord = gl_FragCoord.xy;

  // we reverse the coords because in webGL 0,0 is at the bottom left
  coord.y = resolution.y - coord.y;

  // one way we could make a rect is by using an if statement, however if statements are considered to be slow inside of shaders
  // instead we will use some math functions to calculate a rectangle
  // mix takes three values i.e. mix(option1, option2, edge)
  // option one will be chosen if edge equals zero
  // option two will be chose if edge equals one
  
  // the step function takes two arguments i.e. step(edge, val)
  // step returns 0.0 if val is less than edge
  // step returns 1.0 if val is greater than edge

  // using these two functions combined we can section off parts of the screen into black and white
  float width = 1.0 -mix(0.0, 1.0, step(x + w, coord.x));
  float xPos =  1.0 -mix(0.0, 1.0, step(x, coord.x));

  float height = 1.0 - mix(0.0, 1.0, step(y + h, coord.y));
  float yPos = 1.0 - mix(0.0, 1.0, step(y, coord.y));

  // create a color to use
  vec3 col = rgb(color.r, color.g, color.b);

  // calculate the final rectangle
  // we will multiply the x values against the y values to produce our final rect as black and white
  // the black and white mask is multiplied against our color and returned.
  return  col * ((height - yPos) * (width - xPos));
}

void main() {

  // the width and height of our rectangle
  float width = 100.0;
  float height = 200.0;

  // the center of the screen is just the resolution divided in half
  vec2 center = resolution * 0.5;

  // lets make our rect in the center of the screen. We have to subtract half of it's width and height just like in p5
  float x = center.x - width*0.5;
  float y = center.y - height*0.5;

  // a color for the rect 
  vec3 pink = vec3(240.0, 200.0, 200.0);

  // a color for the bg
  vec3 babyBlue = rgb(200.0,200.0,240.0);

  // lets add a sine wave to the x position so that it moves back and forth
  x += sin(time) *100.0;

  // call our rect function with the values we defined
  vec3 r = rect(x, y, width, height, pink);

  // now mix the rect with the background color
  // anything that is black in r will become the bg
  vec3 scene = mix(babyBlue, r, r);

  // out put the final image
  gl_FragColor = vec4( scene ,1.0);
}