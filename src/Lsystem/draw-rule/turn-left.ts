import {BaseDrawRule} from "./base-draw-rule";
import {DrawRule} from "./draw-rule";
import {mat4, vec3} from "gl-matrix";
import {VecMath} from "../../util/vec-math"
import {Turtle} from "./turtle";

export class TurnLeft extends BaseDrawRule implements DrawRule {
  draw(turtle: Turtle, turtleStack: Turtle[], geometry: any, options: string) {

    let angle: number = turtle.yawAngle;
    if(!isNaN(parseFloat(options))) {
      angle = parseFloat(options);
    }
    let transform: mat4 = VecMath.rotationAroundVector(turtle.up, angle);
    mat4.multiply(turtle.transform, turtle.transform, transform);
    mat4.multiply(turtle.rotationTransform, turtle.rotationTransform, transform);

    turtle.dir = VecMath.rotateAroundVector(turtle.dir, turtle.up, angle);
    return turtle;
  }
}