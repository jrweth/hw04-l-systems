import {BaseDrawRule} from "./base-draw-rule";
import {DrawRule} from "./draw-rule";
import {mat4, vec3} from "gl-matrix";
import {VecMath} from "../../util/vec-math"
import {Turtle} from "./turtle";

export class AdvanceI extends BaseDrawRule implements DrawRule {
    draw(turtle: Turtle, turtleStack: Turtle[], geometry: any, options: string) {
      let advance: number = 1;
      if(!isNaN(parseFloat(options))) {
        advance = parseFloat(options);
      }

      turtle.i += advance;
      return turtle;
    }

}