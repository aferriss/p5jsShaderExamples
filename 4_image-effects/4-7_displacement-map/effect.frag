precision mediump float;

// lets grab texcoords just for fun
varying vec2 vTexCoord;

// our texture and image coming from p5
uniform sampler2D tex0;
uniform sampler2D tex1;

// how much to displace by (controlled by mouse)
uniform float amt;

void main() {

  vec2 uv = vTexCoord;
  // the texture is loaded upside down and backwards by default so lets flip it
  uv = 1.0 - uv;

  // get the webcam as a vec4 using texture2D
  vec4 cam = texture2D(tex0, uv);

  // lets get the average color of the rgb values
  float avg = dot(cam.rgb, vec3(0.33333));

  // then spread it between -1 and 1
  avg = avg * 2.0 - 1.0;

  // we will displace the image by the average color times the amt of displacement 
  float disp = avg * amt;

  // displacement works by moving the texture coordinates of one image with the colors of another image
  // add the displacement to the texture coordinages
  vec4 pup = texture2D(tex1, uv + disp);

  // output the image
  gl_FragColor = pup;
}