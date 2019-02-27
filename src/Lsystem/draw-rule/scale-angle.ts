import {BaseDrawRule} from "./base-draw-rule";
import {DrawRule} from "./draw-rule";
import {mat4, vec3, vec4} from "gl-matrix";
import {VecMath} from "../../util/vec-math"
import {Turtle} from "./turtle";

export class ScaleAngle extends BaseDrawRule implements DrawRule {
  draw(turtle: Turtle, turtleStack: Turtle[], geometry: any, options: string) {
    let scale: number = (turtle.pitchScale + turtle.rollScale + turtle.yawScale) / 3.0;
    if(!isNaN(parseFloat(options))) {
      scale = parseFloat(options);
    }

    turtle.yawAngle *= scale;
    turtle.rollAngle *= scale;
    turtle.pitchAngle *= scale;

    return turtle;
  }
}