// webgl requires that the first line of the fragment shader specify the precision
// precision is dependent on device, but higher precision variables have more zeros
// sometimes you'll see bugs if you use lowp so stick to mediump or highp
precision mediump float;


// unlike javascript, functions in glsl must have a return type specified as the first word of the function
// common return types are float, int, vec2, vec3, and vec4

vec4 addVec4(vec4 a, vec4 b){
  vec4 sum;
  sum = a + b;
  return sum;
}


// the fragment shader has one main function too
// this is kinda of like the draw() function in p5
// main outputs a variable called gl_FragColor which will contain all the colors of our shader
// the word void means that the function doesn't return a value
// this function is always called main()
void main() {

  // lets just send the color red out
  // colors in shaders go from 0.0 to 1.0
  // glsl is very finicky about the decimal points 
  // gl_FragColor is a vec4 and is expecting red, green, blue, alpha
 
  // define two vec4's 
  // add them together using our function!
  // this is a silly function because we can easily add vec4s in glsl just using the + operator
  vec4 c1 = vec4(1.0, 0.2, 0.44, 0.5);
  vec4 c2 = vec4(-0.2, 0.4, 0.41, 0.5);
  vec4 color = addVec4(c1, c2); // same as c1 + c2

  // assign redColor to be output to the screen
  gl_FragColor = color;
}