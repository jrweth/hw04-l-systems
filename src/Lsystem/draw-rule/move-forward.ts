import {BaseDrawRule} from "./base-draw-rule";
import {DrawRule} from "./draw-rule";
import {vec3} from "gl-matrix";
import {VecMath} from "../../util/vec-math"

export class MoveForward extends BaseDrawRule implements DrawRule {
  draw() {
    this.turtle.pos =  VecMath.add(this.turtle.pos, VecMath.multiply(this.turtle.dir, this.turtle.height));
  }
}