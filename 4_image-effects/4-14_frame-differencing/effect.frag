precision mediump float;

// grab texcoords from the vertex shader
varying vec2 vTexCoord;

// our textures coming from p5
uniform sampler2D tex0;
uniform sampler2D tex1;

void main() {

  vec2 uv = vTexCoord;
  // the texture is loaded upside down and backwards by default so lets flip it
  uv = 1.0 - uv;

  // get the webcam as a vec4 using texture2D
  vec4 tex = texture2D(tex0, uv);

  // get the past webcam frame as a texture
  vec4 past = texture2D(tex1, uv);

  // subtract past from tex
  tex.rgb -= past.rgb;

  // lets multiply it by 2 to boost the signal a little bit
  tex.rgb *= 2.0;

  gl_FragColor = tex;
}