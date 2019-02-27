import {vec3} from 'gl-matrix';
import * as Stats from 'stats-js';
import * as DAT from 'dat-gui';
import Square from './geometry/Square';
import ScreenQuad from './geometry/ScreenQuad';
import OpenGLRenderer from './rendering/gl/OpenGLRenderer';
import Camera from './Camera';
import {setGL} from './globals';
import ShaderProgram, {Shader} from './rendering/gl/ShaderProgram';
import {Tree} from "./Lsystem/tree";
import Cylinder from "./geometry/Cylinder";
import Leaf from "./geometry/Leaf";

// Define an object with application parameters and button callbacks
// This will be referred to by dat.GUI's functions that add GUI elements.
const controls = {
  Iterations: 15,
  Gravity: 0.2,
  "Branch Angle": 30,
  "Branch Density": 0.6
};

let cylinder: Cylinder;
let leaf: Leaf;
let screenQuad: ScreenQuad;
let time: number = 0.0;

function loadScene() {
  let tree = new Tree(controls.Iterations, {});
  tree.turtle.gravity = controls.Gravity;
  tree.turtle.pitchAngle = controls["Branch Angle"];
  tree.turtle.yawAngle = controls["Branch Angle"];
  tree.turtle.rollAngle = controls["Branch Angle"];
  tree.setBranchDensity(controls["Branch Density"]);
  tree.runExpansionIterations();
  let geometries = tree.runDrawRules();
  cylinder = new Cylinder(6);
  cylinder.create();
  screenQuad = new ScreenQuad();
  screenQuad.create();

  // Set up instanced rendering data arrays here.
  // This example creates a set of positional
  // offsets and gradiated colors for a 100x100 grid
  // of squares, even though the VBO data for just
  // one square is actually passed to the GPU
  let colors: number[][] = [[],[]];
  let transforms: number[][][] = [[[],[],[],[]],[[],[],[],[]]];
  let length: number[] = [0,0];
  for(let i = 0; i < geometries.length; i++) {
    let type: number = geometries[i].type;
    length[type]++;

    colors[type].push(geometries[i].color[0]);
    colors[type].push(geometries[i].color[1]);
    colors[type].push(geometries[i].color[2]);
    colors[type].push(geometries[i].color[3]);

    //split the transform up into
    for(let j = 0; j < 16; j++) {
      if(j >= 0 && j < 4)   transforms[type][0].push(geometries[i].transform[j]);
      if(j >= 4 && j < 8)   transforms[type][1].push(geometries[i].transform[j]);
      if(j >= 8 && j < 12)  transforms[type][2].push(geometries[i].transform[j]);
      if(j >= 12 && j < 16) transforms[type][3].push(geometries[i].transform[j]);
    }

  }
  cylinder.setInstanceVBOs(colors[0], transforms[0]);
  cylinder.setNumInstances(length[0]); // grid of "particles"
}

function main() {
  // Initial display for framerate
  const stats = Stats();
  stats.setMode(0);
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';
  document.body.appendChild(stats.domElement);



  ///////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////// CONTROLS /////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////
  const gui = new DAT.GUI();
  let iterations = gui.add(controls, 'Iterations', 2, 20).step(1);
  iterations.onChange(loadScene);
  let gravity = gui.add(controls, 'Gravity', 0.0, 1).step(0.1);
  gravity.onChange(loadScene);
  let angle = gui.add(controls, 'Branch Angle', 5, 90).step(5);
  angle.onChange(loadScene);
  let bDensity = gui.add(controls, 'Branch Density', 0.1, 1).step(0.1);
  bDensity.onChange(loadScene);



  // get canvas and webgl context
  const canvas = <HTMLCanvasElement> document.getElementById('canvas');
  const gl = <WebGL2RenderingContext> canvas.getContext('webgl2');
  if (!gl) {
    alert('WebGL 2 not supported!');
  }
  // `setGL` is a function imported above which sets the value of `gl` in the `globals.ts` module.
  // Later, we can import `gl` from `globals.ts` to access it
  setGL(gl);

  // Initial call to load scene
  loadScene();

  const camera = new Camera(vec3.fromValues(0, 10, 90), vec3.fromValues(0, 30, 0));

  const renderer = new OpenGLRenderer(canvas);
  renderer.setClearColor(0.2, 0.2, 0.2, 1);
  // gl.enable(gl.BLEND);
  // gl.blendFunc(gl.ONE, gl.ONE); // Additive blending
  gl.enable(gl.DEPTH_TEST);

  const instancedShader = new ShaderProgram([
    new Shader(gl.VERTEX_SHADER, require('./shaders/instanced-vert.glsl')),
    new Shader(gl.FRAGMENT_SHADER, require('./shaders/instanced-frag.glsl')),
  ]);

  const flat = new ShaderProgram([
    new Shader(gl.VERTEX_SHADER, require('./shaders/flat-vert.glsl')),
    new Shader(gl.FRAGMENT_SHADER, require('./shaders/flat-frag.glsl')),
  ]);

  // This function will be called every frame
  function tick() {
    camera.update();
    stats.begin();
    instancedShader.setTime(time);
    flat.setTime(time++);
    gl.viewport(0, 0, window.innerWidth, window.innerHeight);
    renderer.clear();
    renderer.render(camera, flat, [screenQuad]);
    renderer.render(camera, instancedShader, [
      cylinder
    ]);
    stats.end();

    // Tell the browser to call `tick` again whenever it renders a new frame
    requestAnimationFrame(tick);
  }

  window.addEventListener('resize', function() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.setAspectRatio(window.innerWidth / window.innerHeight);
    camera.updateProjectionMatrix();
    flat.setDimensions(window.innerWidth, window.innerHeight);
  }, false);

  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.setAspectRatio(window.innerWidth / window.innerHeight);
  camera.updateProjectionMatrix();
  flat.setDimensions(window.innerWidth, window.innerHeight);

  // Start the render loop
  tick();
}

main();
