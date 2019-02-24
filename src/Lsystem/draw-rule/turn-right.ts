import {BaseDrawRule} from "./base-draw-rule";
import {DrawRule} from "./draw-rule";
import {vec3} from "gl-matrix";
import {VecMath} from "../../util/vec-math"

export class TurnRight extends BaseDrawRule implements DrawRule {
  draw() {
    let out: vec3;
    this.turtle.dir = VecMath.rotateAroundVector(this.turtle.dir, this.turtle.up, -this.turtle.yawAngle);
  }
}