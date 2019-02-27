import {BaseDrawRule} from "./base-draw-rule";
import {DrawRule} from "./draw-rule";
import {mat4, vec3} from "gl-matrix";
import {VecMath} from "../../util/vec-math"
import {Turtle} from "./turtle";

export class MoveForward extends BaseDrawRule implements DrawRule {
  draw(turtle: Turtle, turtleStack: Turtle[], geometry: any[]) {
    let translation:vec3 = vec3.fromValues(0, 1, 0);
    translation = VecMath.multiply(translation, turtle.length);
    turtle.pos =  VecMath.add(turtle.pos, translation);

    //add to the transformation
    let transform: mat4 = mat4.create();
    mat4.translate(transform, transform, translation);
    mat4.multiply(turtle.transform, turtle.transform, transform);
    return turtle;

  }
}