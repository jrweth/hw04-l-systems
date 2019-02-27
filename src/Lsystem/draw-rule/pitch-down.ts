import {BaseDrawRule} from "./base-draw-rule";
import {DrawRule} from "./draw-rule";
import {mat4, vec3} from "gl-matrix";
import {VecMath} from "../../util/vec-math"
import {Turtle} from "./turtle";

export class PitchDown extends BaseDrawRule implements DrawRule {
  draw(turtle: Turtle, turtleStack: Turtle[], geometry: any, options: string) {
    let angle: number = turtle.pitchAngle;
    if(!isNaN(parseFloat(options))) {
      angle = parseFloat(options);
    }

    let axis: vec3 = vec3.create();
    vec3.cross(axis, turtle.up, turtle.dir);

    let transform: mat4 = VecMath.rotationAroundVector(axis, -angle);
    mat4.multiply(turtle.transform, turtle.transform, transform);

    turtle.dir = VecMath.rotateAroundVector(turtle.dir, axis, -angle);
    return turtle;
  }
}