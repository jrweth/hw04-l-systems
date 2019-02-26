import {BaseDrawRule} from "./base-draw-rule";
import {DrawRule} from "./draw-rule";
import {mat4, vec3} from "gl-matrix";
import {VecMath} from "../../util/vec-math"
import {Turtle} from "./turtle";

export class TurnRight extends BaseDrawRule implements DrawRule {
  draw(turtle: Turtle, turtleStack: Turtle[], geometry: any) {
    let transform: mat4 = VecMath.rotationAroundVector(turtle.up, -turtle.yawAngle);
    mat4.multiply(turtle.transform, turtle.transform, transform);

    turtle.dir = VecMath.rotateAroundVector(turtle.dir, turtle.up, -turtle.yawAngle);
    return turtle;
  }
}