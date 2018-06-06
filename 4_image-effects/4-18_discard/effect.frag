precision mediump float;

// grab texcoords from vert shader
varying vec2 vTexCoord;

// our textures coming from p5
uniform sampler2D tex0;
uniform sampler2D tex1;
uniform sampler2D tex2;


void main() {

  vec2 uv = vTexCoord;
  // the texture is loaded upside down and backwards by default so lets flip it
  uv.y = 1.0 - uv.y;
  
  // get the three webcam feeds
  vec4 cam = texture2D(tex0, uv);
  
  // calculate the rgb average, this is essentially the same as (cam.r + cam.g + cam.b) / 3.0
  float avg = dot(cam.rgb, vec3(0.33333));

  // branching is bad in shaders but there's not really another way to do this afaik
  // if avg is less than 0.5 throw away the pixels
  // discard tells the shader not to render those pixels so they will be completely transparent
  if(avg > 0.5){
    discard;
  }
  
  // render the output
  gl_FragColor = cam;
}