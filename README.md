# p5.js Shader Examples  

A collection of heavily commented 2d shaders in p5.js. I tried to write shaders that might be useful for those learning GLSL and wanting to get into the basics of 2d image manipulation. For now these are only 2d / texture shaders.

## Shader functions in p5

There are only 4 functions you need to know to work with shaders in p5.js. Everything else is just learning the shader language GLSL.

1. [loadShader('vertexShader.vert', 'fragmentShader.frag')](https://p5js.org/reference/#/p5/loadShader) loads your shaders from files and returns them as a p5 shader object in a variable. The file extensions don't really matter, you can call them .glsl or .shader or .vertex. What does matter is that the path to the files is correct. loadShader() should be called from within preload().

2. [createShader(vertString, fragString)](https://p5js.org/reference/#/p5/createShader) loads your shaders from strings. I prefer not to work this way because you won't have any syntax highlighting on your shaders. You can call this method from within setup. The easiest way to write shaders as strings is probably to use javascripts template string syntax.

3. [shader(myShader)](https://p5js.org/reference/#/p5.Shader) sets the currently active shader. You can also call this function on createGraphics() layers if you have them in your scene.

4. [setUniform('uniformName', dataGoingToShader)](https://p5js.org/reference/#/p5.Shader/setUniform) is the only method of the shader object in p5. You can use it to send data to your shaders from your p5 program. For the vec# data types, you send the data as an array. Here's how to send different types of data  

````
// sending an int
myShader.setUniform('myInt', 2);

// sending a float
myShader.setUniform('myFloat', 0.1);

// sending a vec2
myShader.setUniform('myVec2', [-1, 13]);

// sending a vec3
myShader.setUniform('myVec3', [27, 80, 230]);

// sending a vec4
myShader.setUniform('myVec4', [mouseX, mouseY, mouseX/width, mouseY/height]);
````

Additionally, some of these examples use extra graphics layers for more complex effects. You may want to look into the createGraphics() function to learn how it works.  


## Basics  

These shaders are about as stripped down as can be. They mostly just render colors to the screen. Start here if you've never seen or used a shader before.

1. [Red](https://aferriss.github.io/p5jsShaderExamples/1_basics/1-1_red)  
2. [Gray](https://aferriss.github.io/p5jsShaderExamples/1_basics/1-2_gray)  
3. [Cyan](https://aferriss.github.io/p5jsShaderExamples/1_basics/1-3_cyan)  
4. [Functions](https://aferriss.github.io/p5jsShaderExamples/1_basics/1-4_functions)  

## Texture Coordinates  

These shaders show how to manipulate texture coordinates in a variety of different way. They start out simple, and gradually become more complex.

1. [Basic](https://aferriss.github.io/p5jsShaderExamples/2_texture-coordinates/2-1_basic)
2. [Tiles](https://aferriss.github.io/p5jsShaderExamples/2_texture-coordinates/2-2_tiles)
3. [Gradient](https://aferriss.github.io/p5jsShaderExamples/2_texture-coordinates/2-3_gradient)
4. [Random](https://aferriss.github.io/p5jsShaderExamples/2_texture-coordinates/2-4_random)
5. [Noise](https://aferriss.github.io/p5jsShaderExamples/2_texture-coordinates/2-5_noise)
6. [Checker](https://aferriss.github.io/p5jsShaderExamples/2_texture-coordinates/2-6_checker)


## Uniforms  

These shaders show how to send data to the shader in uniform variables. All examples after this section will use uniforms to talk to the shader.

1. [Mouse](https://aferriss.github.io/p5jsShaderExamples/3_uniforms/3-1_mouse)
2. [texture2D](https://aferriss.github.io/p5jsShaderExamples/3_uniforms/3-2_texture2d)
3. [time](https://aferriss.github.io/p5jsShaderExamples/3_uniforms/3-3_time)

## Image Effects

This section is a collection of shaders that manipulate images or video in some way. Some of them are simple examples like inverting colors, and others are more complicated effects like bloom. Most of these examples use the webcam.

1. [Invert](https://aferriss.github.io/p5jsShaderExamples/4_image-effects/4-1_webcam-invert)
2. [RGB Split](https://aferriss.github.io/p5jsShaderExamples/4_image-effects/4-2_rgb-split)
3. [Sinewave Distortion](https://aferriss.github.io/p5jsShaderExamples/4_image-effects/4-3_sinewave-distort)
4. [Video Mirror](https://aferriss.github.io/p5jsShaderExamples/4_image-effects/4-4_mirror)
5. [Texcoord Stripes](https://aferriss.github.io/p5jsShaderExamples/4_image-effects/4-5_stripes-from-image)
6. [Pixelate / Mosaic](https://aferriss.github.io/p5jsShaderExamples/4_image-effects/4-6_pixelate)
7. [Displacement Map](https://aferriss.github.io/p5jsShaderExamples/4_image-effects/4-7_displacement-map)
8. [RGB to HSB conversion](https://aferriss.github.io/p5jsShaderExamples/4_image-effects/4-8_rgb-to-hsb)
9. [Single Pass Blur](https://aferriss.github.io/p5jsShaderExamples/4_image-effects/4-9_single-pass-blur)
10. [Multi-Pass Blur](https://aferriss.github.io/p5jsShaderExamples/4_image-effects/4-10_two-pass-blur)
11. [Bloom](https://aferriss.github.io/p5jsShaderExamples/4_image-effects/4-11_bloom)
12. [Threshold](https://aferriss.github.io/p5jsShaderExamples/4_image-effects/4-12_threshold)
13. [Frame Differencing](https://aferriss.github.io/p5jsShaderExamples/4_image-effects/4-13_frame-differencing)
14. [RGB to Grayscale conversion](https://aferriss.github.io/p5jsShaderExamples/4_image-effects/4-14_rgb-to-grayscale)
15. [Convolution Kernel Effects (Blur, Sharpen, Emboss, Edge Detect)](https://aferriss.github.io/p5jsShaderExamples/4_image-effects/4-15_convolution-kernel)
16. [Video Feedback](https://aferriss.github.io/p5jsShaderExamples/4_image-effects/4-16_video-feedback)
17. [Texture Delay](https://aferriss.github.io/p5jsShaderExamples/4_image-effects/4-17_delay)  
18. [Discard](https://aferriss.github.io/p5jsShaderExamples/4_image-effects/4-18_discard)
19. [Slitscan](https://aferriss.github.io/p5jsShaderExamples/4_image-effects/4-19_slitscan)
20. [Fly's Eye Mosaic](https://aferriss.github.io/p5jsShaderExamples/4_image-effects/4-20_mosaic)

## Shapes  

These shaders show how to create basic shapes just using math within the shader.

1. [Rectangle](https://aferriss.github.io/p5jsShaderExamples/5_shapes/5-1_rectangle)
2. [Circle](https://aferriss.github.io/p5jsShaderExamples/5_shapes/5-2_circle)
3. [Polygon](https://aferriss.github.io/p5jsShaderExamples/5_shapes/5-3_polygon)

## 3d

These examples show how to use shaders with 3d geometry
1. [Box](https://aferriss.github.io/p5jsShaderExamples/6_3d/6-1_rectangle)
2. [Vertex Displacement](https://aferriss.github.io/p5jsShaderExamples/6_3d/6-2_vertexDisplacement)
3. [Vertex Displacement With Texture](https://aferriss.github.io/p5jsShaderExamples/6_3d/6-3_vertexDisplacementFromTexture)
4. [Matcap Shader](https://aferriss.github.io/p5jsShaderExamples/6_3d/6-4_matcap)
