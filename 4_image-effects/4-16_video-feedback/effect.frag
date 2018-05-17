precision mediump float;

// lets grab texcoords just for fun
varying vec2 vTexCoord;

// our texture coming from p5
uniform sampler2D tex0;
uniform sampler2D tex1;

uniform float mouseDown;

#define PI 3.14159265359
#define TWO_PI 6.28318530718

vec3 rgb2hsb(vec3 c){
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = c.g < c.b ? vec4(c.bg, K.wz) : vec4(c.gb, K.xy);
    vec4 q = c.r < p.x ? vec4(p.xyw, c.r) : vec4(c.r, p.yzx);

    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

void main() {

  vec2 uv = vTexCoord;
  // the texture is loaded upside down and backwards by default so lets flip it
  uv.y = 1.0 - uv.y;

  // make a copy of the uvs
  vec2 feedbackUv = uv;

  // move the y uv's move down just slightly
  // this will have a compounding effect in the feedback loop and make the screen appear to flow downward
  feedbackUv.y *= 0.995;
  
  // get the webcam
  vec4 cam = texture2D(tex0, uv);

  // make a copy of the camera
  vec4 tex = cam;
  
  // if the mouse isn't clicked we'll run the feedback loop
  if(mouseDown == 0.0){

    // calculate an angle from the hue and brightness
    // we will use these to offset the texture coordinates just a little bit
    vec3 hsb = rgb2hsb(cam.rgb);
    float angleX =  cos(hsb.r*TWO_PI);
    float angleY = cos(1.0 -hsb.b*TWO_PI);

    // add those angles to the tex coords and sample the feed back texture
    tex = texture2D(tex1, feedbackUv + vec2(angleX, angleY)*0.001);

    // subtract some camera from the screen
    tex -= cam*0.002;

    // also just arbitrarily add some color to the screen
    // not sure why this sends the shader into madness but it does :D
    tex.rgb += 0.003;
  } 
  
  // render the output
  gl_FragColor = tex;
}