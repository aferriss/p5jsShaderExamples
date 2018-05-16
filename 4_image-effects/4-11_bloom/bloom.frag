precision mediump float;

// texcoords from the vertex shader
varying vec2 vTexCoord;

// our textures coming from p5
uniform sampler2D tex0;
uniform sampler2D tex1;

// the mouse value between 0 and 1
uniform float mouseX;

void main() {

  vec2 uv = vTexCoord;
  // the texture is loaded upside down and backwards by default so lets flip it
  uv = 1.0 - uv;

  // get the camera and the blurred image as textures
  vec4 cam = texture2D(tex0, uv);
  vec4 blur = texture2D(tex1, uv);

  // calculate an average color for the blurred image
  // this is essentially the same as saying (blur.r + blur.g + blur.b) / 3.0;
  float avg = dot(blur.rgb, vec3(0.33333));

  // mix the blur and camera together according to how bright the blurred image is
  // use the mouse to control the bloom
  vec4 bloom = mix(cam, blur, clamp(avg*(1.0 + mouseX), 0.0, 1.0));

  gl_FragColor = bloom;
}