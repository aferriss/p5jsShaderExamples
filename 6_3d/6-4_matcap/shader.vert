
// Get the position attribute of the geometry
attribute vec3 aPosition;

// Get the texture coordinate attribute from the geometry
attribute vec2 aTexCoord;

// Get the vertex normal attribute from the geometry
attribute vec3 aNormal;

// When we use 3d geometry, we need to also use some builtin variables that p5 provides
// Most 3d engines will provide these variables for you. They are 4x4 matrices that define
// the camera position / rotation, and the geometry position / rotation / scale
// There are actually 3 matrices, but two of them have already been combined into a single one
// This pre combination is an optimization trick so that the vertex shader doesn't have to do as much work

// uProjectionMatrix is used to convert the 3d world coordinates into screen coordinates 
uniform mat4 uProjectionMatrix;

// uModelViewMatrix is a combination of the model matrix and the view matrix
// The model matrix defines the object position / rotation / scale
// Multiplying uModelMatrix * vec4(aPosition, 1.0) would move the object into it's world position

// The view matrix defines attributes about the camera, such as focal length and camera position
// Multiplying uModelViewMatrix * vec4(aPosition, 1.0) would move the object into its world position in front of the camera
uniform mat4 uModelViewMatrix;


// The normalmatrix is the transpose-inverse of the modelview matrix. 
// It's currently broken in p5, but this is what you should normally use in these calculations
uniform mat4 uNormalMatrix;

// We will pass the normal and the eye to the fragment shader
varying vec3 vNormal;
varying vec3 vEye;

void main() {

  // We need to calculate the world space eye position, and the world space normal
  vEye = normalize( vec3(uModelViewMatrix * vec4(aPosition, 1.0)));

  // Typically you would use uNormalMatrix instead of uModelViewMatrix but currently there is a bug in uNormalMatrix
  // uModelViewMatrix will work fine here unless you are doing some non-uniform scaling
  vNormal = normalize((uModelViewMatrix * vec4(aNormal, 0.0)).xyz);

  // copy the position data into a vec4, using 1.0 as the w component
  vec4 positionVec4 = vec4(aPosition, 1.0);

  // Move our vertex positions into screen space
  // The order of multiplication is always projection * view * model * position
  // In this case model and view have been combined so we just do projection * modelView * position
  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;
}