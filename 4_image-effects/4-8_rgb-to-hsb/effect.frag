precision mediump float;

// lets grab texcoords just for fun
varying vec2 vTexCoord;

// our texture coming from p5
uniform sampler2D tex0;

// out time variable coming from p5
uniform float time;

// color conversion functions from Sam Hocevar
// http://lolengine.net/blog/2013/07/27/rgb-to-hsv-in-glsl
// sad to admit that I have no clue how the math inside here works, but they show up all over the web when you search for glsl rgb to hsb
// we will just use them as functions, feel free to copy and use as you like
// don't worry about what's going on in here, just copy paste into your own shaders if you need
vec3 rgb2hsb(vec3 c){
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = c.g < c.b ? vec4(c.bg, K.wz) : vec4(c.gb, K.xy);
    vec4 q = c.r < p.x ? vec4(p.xyw, c.r) : vec4(c.r, p.yzx);

    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 hsb2rgb(vec3 c){
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {

  vec2 uv = vTexCoord;
  // the texture is loaded upside down and backwards by default so lets flip it
  uv = 1.0 - uv;

  // get the webcam as a vec4 using texture2D
  vec4 tex = texture2D(tex0, uv);

  // convert the texture to hsb using our function from up top
  vec3 hsb = rgb2hsb(tex.rgb);

  // lets make the hue spin in circles
  // first add the time to our hue value
  hsb.r += time;

  // then fract it to make sure we always get numbers that go from 0 - 1
  hsb.r = fract(hsb.r);

  // finally convert back to rgb
  vec3 rgb = hsb2rgb(hsb);

  // output to screen
  gl_FragColor = vec4(rgb, 1.0);

  // try altering the saturation or brightness values!
}