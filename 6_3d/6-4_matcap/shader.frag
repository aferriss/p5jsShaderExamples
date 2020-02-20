precision mediump float;


// Get the normal from the vertex shader
varying vec3 vNormal;
varying vec3 vEye;

uniform sampler2D uMatcapTexture;


// This function returns texture coordinates. We give it an eye position and the normal and it 
// shows us how a sphere would reflect the texture. 
// This particular implementation was borrowed from https://www.clicktorelease.com/blog/creating-spherical-environment-mapping-shader/
vec2 matcap(vec3 eye, vec3 normal) {
  vec3 reflected = reflect(eye, normal);
  float m = 2.8284271247461903 * sqrt( reflected.z+1.0 );
  return reflected.xy / m + 0.5;
}

void main() {

  // Calculate our uv
  vec2 uv = matcap(vEye, vNormal) ;

  // Sample the texture
  vec4 color = texture2D(uMatcapTexture, uv);
  
  // Lets just draw the texcoords to the screen
  gl_FragColor = color;
}