import {BaseDrawRule} from "./base-draw-rule";
import {DrawRule} from "./draw-rule";
import {mat4, vec3} from "gl-matrix";
import {VecMath} from "../../util/vec-math"
import {Turtle} from "./turtle";

export class Gravity extends BaseDrawRule implements DrawRule {
  draw(turtle: Turtle, turtleStack: Turtle[], geometry: any, options: string) {
    let gravity: number = turtle.gravity;
    if(!isNaN(parseFloat(options))) {
      gravity = parseFloat(options);
    }

    //increase gravity with the smaller branches
    gravity = gravity / turtle.width;

    let axis: vec3 = vec3.create();
    vec3.cross(axis, turtle.dir, vec3.fromValues(0, -1, 0));

    //if we are already po
    let angle = gravity * 5;

    let transform: mat4 = VecMath.rotationAroundVector(axis, angle);
    mat4.multiply(turtle.transform, turtle.transform, transform);

    turtle.dir = VecMath.rotateAroundVector(turtle.dir, axis, angle);
    return turtle;
  }
}