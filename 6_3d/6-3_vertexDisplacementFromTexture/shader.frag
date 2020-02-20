precision mediump float;

varying vec2 vTexCoord;

// Get the normal from the vertex shader
varying vec3 vNoise;

void main() {
  
  vec3 color = vNoise;
  
  // Lets just draw the texcoords to the screen
  gl_FragColor = vec4(color ,1.0);
}