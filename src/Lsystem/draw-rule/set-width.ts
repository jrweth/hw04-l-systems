import {BaseDrawRule} from "./base-draw-rule";
import {DrawRule} from "./draw-rule";
import {mat4, vec3, vec4} from "gl-matrix";
import {VecMath} from "../../util/vec-math"
import {Turtle} from "./turtle";

export class SetWidth extends BaseDrawRule implements DrawRule {
  draw(turtle: Turtle, turtleStack: Turtle[], geometry: any, options: string) {
    let width: number = turtle.width;
    if(!isNaN(parseFloat(options))) {
      width = parseFloat(options);
    }

    turtle.width = width;
    return turtle;
  }
}