import {vec3, vec4} from 'gl-matrix';
import Drawable from '../rendering/gl/Drawable';
import {gl} from '../globals';

class Leaf extends Drawable {
  numSegments: number;


  constructor(numSegments: number) {
    super(); // Call the constructor of the super class. This is required.
    this.numSegments = numSegments;
  }

  create() {
    let positions = [];
    let normals = [];
    let indicies = [];

    //triangle for testing
    // positions.push(0, 0, 0, 1);
    // normals.push(0,-1,0, 1);
    //
    // positions.push(-0.5, 1, 0, 1);
    // normals.push(0, 1, 0, 1);
    //
    // positions.push(0.5, 1, 0, 1);
    // normals.push(0, 1, 0, 1);
    //
    // indicies.push(0,1,2);

    positions.push(0, 0, 0, 1);
    normals.push(0,-1,0, 1);

    positions.push(0, 1, 0, 1);
    normals.push(0, 1, 0, 1);

    for(let i = 0; i < this.numSegments; i++) {
      let x = 0.1 * Math.cos(i * 2 * Math.PI / this.numSegments);
      let z = 0.1 * Math.sin(i * 2 * Math.PI / this.numSegments);

      positions.push(x, 0.5, z, 1);
      normals.push(x, 0, z, 1);

      let pt1 = i + 2;
      let pt2 = i + 3;
      if (i == this.numSegments - 1) {
        pt2 = 2;
      }

      indicies.push(0, pt1, pt2);
      indicies.push(1, pt1, pt2);
    }


    this.indices = new Uint32Array(indicies);
    this.positions = new Float32Array(positions);
    this.normals = new Float32Array(normals);


    this.genAndBind();


    console.log(`Created Leaf`);
  }

};

export default Leaf;
