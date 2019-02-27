import {vec3, vec4} from 'gl-matrix';
import Drawable from '../rendering/gl/Drawable';
import {gl} from '../globals';

class Leaf extends Drawable {
  indices: Uint32Array;
  positions: Float32Array;
  colors: Float32Array;
  normals: Float32Array;
  transforms1: Float32Array;
  transforms2: Float32Array;
  transforms3: Float32Array;
  transforms4: Float32Array;
  numSegments: number;


  constructor(numSegments: number) {
    super(); // Call the constructor of the super class. This is required.
    this.numSegments = numSegments;
  }

  create() {
    let positions = [];
    let normals = [];
    let indicies = [];
    positions.push(0, 0, 0);
    normals.push(0,-1,0, 1);

    positions.push(0, 1, 0);
    normals.push(0, 1, 0, 1);

    for(let i = 0; i < this.numSegments; i++) {
      let x = 0.5 * Math.cos(i * 2 * Math.PI / this.numSegments);
      let z = 0.5 * Math.sin(i * 2 * Math.PI / this.numSegments);

      positions.push(x, 0.5, z);
      normals.push(x,0,z,1);

      let pt1 = i + 2;
      let pt2 = i + 3;
      if(i == this.numSegments -1) {
        pt2 = 2;
      }

      indicies.push(0, pt1, pt2);
      indicies.push(1, pt1, pt2);
    }

    this.indices = new Uint32Array(indicies);
    this.positions = new Float32Array(positions);
    this.normals = new Float32Array(normals);

    this.generateIdx();
    this.generatePos();
    this.generateCol();
    this.generateNor();
    this.generateTranslate();
    this.generateTransform1();
    this.generateTransform2();
    this.generateTransform3();
    this.generateTransform4();

    this.count = this.indices.length;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufIdx);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.bufPos);
    gl.bufferData(gl.ARRAY_BUFFER, this.positions, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.bufNor);
    gl.bufferData(gl.ARRAY_BUFFER, this.normals, gl.STATIC_DRAW);


    console.log(`Created Cylindar`);
  }

  setInstanceVBOs(colors: number[], transforms: number[][]) {
    this.colors = new Float32Array(colors);
    this.transforms1 = new Float32Array(transforms[0]);
    this.transforms2 = new Float32Array(transforms[1]);
    this.transforms3 = new Float32Array(transforms[2]);
    this.transforms4 = new Float32Array(transforms[3]);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.bufCol);
    gl.bufferData(gl.ARRAY_BUFFER, this.colors, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.bufTransform1);
    gl.bufferData(gl.ARRAY_BUFFER, this.transforms1, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.bufTransform2);
    gl.bufferData(gl.ARRAY_BUFFER, this.transforms2, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.bufTransform3);
    gl.bufferData(gl.ARRAY_BUFFER, this.transforms3, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.bufTransform4);
    gl.bufferData(gl.ARRAY_BUFFER, this.transforms4, gl.STATIC_DRAW);

  }
};

export default Leaf;
