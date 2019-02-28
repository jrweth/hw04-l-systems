import {BaseDrawRule} from "./base-draw-rule";
import {DrawRule} from "./draw-rule";
import {mat4, vec3, vec4} from "gl-matrix";
import {VecMath} from "../../util/vec-math"
import {Turtle} from "./turtle";

export class ResetFCount extends BaseDrawRule implements DrawRule {
  draw(turtle: Turtle, turtleStack: Turtle[], geometry: any, options: string) {
    let count: number = 0;
    if(!isNaN(parseFloat(options))) {
      count = parseFloat(options);
    }
    turtle.fCount = count;
    return turtle;
  }
}