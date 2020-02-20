precision mediump float;

varying vec2 vTexCoord;

void main() {

  // Lets just draw the texcoords to the screen
  gl_FragColor = vec4(vTexCoord.x, vTexCoord.y, 0.0 ,1.0);
}