import {BaseDrawRule} from "./base-draw-rule";
import {DrawRule} from "./draw-rule";
import {mat4, vec3} from "gl-matrix";
import {VecMath} from "../../util/vec-math"

export class TurnLeft extends BaseDrawRule implements DrawRule {
  draw() {
    let transform: mat4 = VecMath.rotationAroundVector(this.turtle.up, this.turtle.yawAngle);
    mat4.multiply(this.turtle.transform, this.turtle.transform, transform);

    this.turtle.dir = VecMath.rotateAroundVector(this.turtle.dir, this.turtle.up, this.turtle.yawAngle);
  }
}