import {BaseDrawRule} from "./base-draw-rule";
import {DrawRule} from "./draw-rule";
import {mat4, vec3, vec4} from "gl-matrix";
import {VecMath} from "../../util/vec-math"
import {Turtle} from "./turtle";

export class ChangeGeometry extends BaseDrawRule implements DrawRule {
  draw(turtle: Turtle, turtleStack: Turtle[], geometry: any, options: string) {
    let geometryType = turtle.geometryType;
    if(!isNaN(parseFloat(options))) {
      geometryType = parseFloat(options);
    }

    turtle.geometryType = geometryType;

    return turtle;
  }
}