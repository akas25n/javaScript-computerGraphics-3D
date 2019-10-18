// Basic example drawing a square, taken from WebGL Up and Running (Parisi)

const canvas = document.getElementById("mycanvas");
const ctx = canvas.getContext("webgl");
ctx.viewport(0, 0, canvas.width, canvas.height);

// The transform matrix for the square - translate back in Z for the camera
const modelViewMatrix = new Float32Array(
   [1, 0, 0, 0,
   0, 1, 0, 0,
   0, 0, 1, 0,
   0, 0, -3.333, 1]);

   // The projection matrix (for a 45 degree field of view)
const projectionMatrix = new Float32Array(
   [2.41421, 0, 0, 0,
   0, 2.41421, 0, 0,
   0, 0, -1.002002, -1,
   0, 0, -0.2002002, 0]);


// Create the vertex data for a square to be drawn
function createSquare() {
  const vertexBuffer =  ctx.createBuffer();
  ctx.bindBuffer(ctx.ARRAY_BUFFER, vertexBuffer);
  const verts = [
      .5,  .5,  0.0,
    -.5,  .5,  0.0,
      .5, -.5,  0.0,
    -.5, -.5,  0.0
  ];
  ctx.bufferData(ctx.ARRAY_BUFFER, new Float32Array(verts), ctx.STATIC_DRAW);
  const square = {buffer:vertexBuffer, vertSize:3, nVerts:4, primtype:ctx.TRIANGLE_STRIP};
  return square;
}

function createShader(str, type) {
  let shader;
  if (type == "fragment") {
    shader = ctx.createShader(ctx.FRAGMENT_SHADER);
  } else if (type == "vertex") {
    shader = ctx.createShader(ctx.VERTEX_SHADER);
  } else {
    return null;
  }

  ctx.shaderSource(shader, str);
  ctx.compileShader(shader);

  if (!ctx.getShaderParameter(shader, ctx.COMPILE_STATUS)) {
    alert(ctx.getShaderInfoLog(shader));
    return null;
  }

  return shader;
}

const vertexShaderSource =

      "    attribute vec3 vertexPos;\n" +
      "    uniform mat4 modelViewMatrix;\n" +
      "    uniform mat4 projectionMatrix;\n" +
      "    void main(void) {\n" +
      "		// Return the transformed and projected vertex value\n" +
      "        gl_Position = projectionMatrix * modelViewMatrix * \n" +
      "            vec4(vertexPos, 1.0);\n" +
      "    }\n";

const fragmentShaderSource =
      "    void main(void) {\n" +
      "    // Return the pixel color: always output white\n" +
      "    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n" +
      "}\n";


let shaderProgram;
let shaderVertexPositionAttribute;
let shaderProjectionMatrixUniform;
let shaderModelViewMatrixUniform;

function initShader() {

  // load and compile the fragment and vertex shader
  const fragmentShader = createShader(fragmentShaderSource, "fragment");
  const vertexShader = createShader(vertexShaderSource, "vertex");

  // link them together into a new program
  shaderProgram = ctx.createProgram();
  ctx.attachShader(shaderProgram, vertexShader);
  ctx.attachShader(shaderProgram, fragmentShader);
  ctx.linkProgram(shaderProgram);

  // get pointers to the shader params
  shaderVertexPositionAttribute = ctx.getAttribLocation(shaderProgram, "vertexPos");
  ctx.enableVertexAttribArray(shaderVertexPositionAttribute);

  shaderProjectionMatrixUniform = ctx.getUniformLocation(shaderProgram, "projectionMatrix");
  shaderModelViewMatrixUniform = ctx.getUniformLocation(shaderProgram, "modelViewMatrix");


  if (!ctx.getProgramParameter(shaderProgram, ctx.LINK_STATUS)) {
    alert("Could not initialise shaders");
  }
}

function draw(obj) {

  // clear the background (with black)
  ctx.clearColor(0.0, 0.0, 0.0, 1.0);
  ctx.clear(ctx.COLOR_BUFFER_BIT);

  // set the vertex buffer to be drawn
  ctx.bindBuffer(ctx.ARRAY_BUFFER, obj.buffer);

  // set the shader to use
  ctx.useProgram(shaderProgram);

  // connect up the shader parameters: vertex position and projection/model matrices
  ctx.vertexAttribPointer(shaderVertexPositionAttribute, obj.vertSize, ctx.FLOAT, false, 0, 0);
  ctx.uniformMatrix4fv(shaderProjectionMatrixUniform, false, projectionMatrix);
  ctx.uniformMatrix4fv(shaderModelViewMatrixUniform, false, modelViewMatrix);

  // draw the object
  ctx.drawArrays(obj.primtype, 0, obj.nVerts);
}

// Do the drawing
const square = createSquare();
initShader();
draw(square);
