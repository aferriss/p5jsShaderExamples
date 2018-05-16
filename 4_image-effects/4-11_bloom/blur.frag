precision mediump float;

// texcoords from the vertex shader
varying vec2 vTexCoord;

// our texture coming from p5
uniform sampler2D tex0;

// the size of a texel or 1.0 / width , 1.0 / height
uniform vec2 texelSize;

// which way to blur, vec2(1.0, 0.0) is horizontal, vec2(0.0, 1.0) is vertical
uniform vec2 direction;

// gaussian blur filter modified from Filip S. at intel 
// https://software.intel.com/en-us/blogs/2014/07/15/an-investigation-of-fast-real-time-gpu-based-image-blur-algorithms
// this function takes three parameters, the texture we want to blur, the uvs, and the texelSize
vec3 gaussianBlur( sampler2D t, vec2 texUV, vec2 stepSize ){   
	// a variable for our output                                                                                                                                                                 
	vec3 colOut = vec3( 0.0 );                                                                                                                                   

	// stepCount is 9 because we have 9 items in our array , const means that 9 will never change and is required loops in glsl                                                                                                                                     
	const int stepCount = 9;

	// these weights were pulled from the link above
	float gWeights[stepCount];
	    gWeights[0] = 0.10855;
	    gWeights[1] = 0.13135;
	    gWeights[2] = 0.10406;
	    gWeights[3] = 0.07216;
	    gWeights[4] = 0.04380;
	    gWeights[5] = 0.02328;
	    gWeights[6] = 0.01083;
	    gWeights[7] = 0.00441;
	    gWeights[8] = 0.00157;

	// these offsets were also pulled from the link above
	float gOffsets[stepCount];
	    gOffsets[0] = 0.66293;
	    gOffsets[1] = 2.47904;
	    gOffsets[2] = 4.46232;
	    gOffsets[3] = 6.44568;
	    gOffsets[4] = 8.42917;
	    gOffsets[5] = 10.41281;
	    gOffsets[6] = 12.39664;
	    gOffsets[7] = 14.38070;
	    gOffsets[8] = 16.36501;
	
	// lets loop nine times
	for( int i = 0; i < stepCount; i++ ){  

		// multiply the texel size by the by the offset value                                                                                                                                                               
	    vec2 texCoordOffset = gOffsets[i] * stepSize;

		// sample to the left and to the right of the texture and add them together                                                                                                           
	    vec3 col = texture2D( t, texUV + texCoordOffset ).xyz + texture2D( t, texUV - texCoordOffset ).xyz; 

		// multiply col by the gaussian weight value from the array
		col *= gWeights[i];

		// add it all up
	    colOut +=  col;                                                                                                                               
	}

	// our final value is returned as col out
	return colOut;                                                                                                                                                   
} 


void main() {

  vec2 uv = vTexCoord;
  // the texture is loaded upside down and backwards by default so lets flip it
  uv = 1.0 - uv;

  // use our blur function
  vec3 blur = gaussianBlur(tex0, uv, texelSize * direction);

  gl_FragColor = vec4(blur, 1.0);
}