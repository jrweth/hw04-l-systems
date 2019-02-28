import {vec3, vec4} from 'gl-matrix';
import Drawable from '../rendering/gl/Drawable';
import {gl} from '../globals';

class Cylinder extends Drawable {

  numSegments: number;

  constructor(numSegments: number) {
    super(); // Call the constructor of the super class. This is required.
    this.numSegments = numSegments;
  }

  create() {
    let positions = [];
    let normals = [];
    let indicies = [];
    for(let i = 0; i < this.numSegments; i++) {
      let x = 0.5 * Math.cos(i * 2 * Math.PI / this.numSegments);
      let z = 0.5 * Math.sin(i * 2 * Math.PI / this.numSegments);

      positions.push(x, 1.1, z, 1);
      positions.push(x, 0, z, 1);

      normals.push(x,0,z,1);
      normals.push(x,0,z,1);

      let pt1 = i*2;
      let pt2 = i*2 + 1;
      let pt3 = (i*2 + 2) % (this.numSegments * 2);
      let pt4 = (i*2 + 3) % (this.numSegments * 2);

      indicies.push(pt1, pt2, pt3);
      indicies.push(pt2, pt3, pt4);
    }

    this.indices = new Uint32Array(indicies);
    this.positions = new Float32Array(positions);
    this.normals = new Float32Array(normals);

    this.genAndBind();


    console.log(`Created Cylindar`);
  }

};

export default Cylinder;
