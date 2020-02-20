precision mediump float;

varying vec2 vTexCoord;

// Get the normal from the vertex shader
varying vec3 vNormal;

void main() {
  
  // Normalize the normal
  vec3 color = vNormal * 0.5 + 0.5;
  
  // Lets just draw the texcoords to the screen
  gl_FragColor = vec4(color ,1.0);
}