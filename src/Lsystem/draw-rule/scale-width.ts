import {BaseDrawRule} from "./base-draw-rule";
import {DrawRule} from "./draw-rule";
import {mat4, vec3, vec4} from "gl-matrix";
import {VecMath} from "../../util/vec-math"
import {Turtle} from "./turtle";

export class ScaleWidth extends BaseDrawRule implements DrawRule {
  draw(turtle: Turtle, turtleStack: Turtle[], geometry: any, options: string) {
    let scale: number = turtle.widthScale;
    if(!isNaN(parseFloat(options))) {
      scale = parseFloat(options);
    }

    turtle.width = turtle.width * scale;

    //scale along the x and z axis
    let transform: mat4 = mat4.create();
    mat4.scale(transform, transform, vec3.fromValues(scale, 1, scale));


    mat4.multiply(turtle.transform, turtle.transform, transform);
    return turtle;
  }
}