precision mediump float;

// declare a uniform vec2 variable. We use a vec2 because the mouse has both x and y
// p5 will send data to this variable
uniform vec2 mouse;

void main() {

  gl_FragColor = vec4(mouse.x, mouse.y, 0.5, 1.0 );
}