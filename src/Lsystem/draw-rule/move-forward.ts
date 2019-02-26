import {BaseDrawRule} from "./base-draw-rule";
import {DrawRule} from "./draw-rule";
import {mat4, vec3} from "gl-matrix";
import {VecMath} from "../../util/vec-math"

export class MoveForward extends BaseDrawRule implements DrawRule {
  draw() {
    let translation:vec3 = vec3.fromValues(0, 1, 0);
    this.turtle.pos =  VecMath.add(this.turtle.pos, translation);

    //add to the transformation
    let transform: mat4 = mat4.create();
    mat4.translate(transform, transform, translation);
    mat4.multiply(this.turtle.transform, this.turtle.transform, transform);

  }
}