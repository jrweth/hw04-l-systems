import {DrawRule} from "./draw-rule";
import {mat4, vec3} from "gl-matrix";
import {VecMath} from "../../util/vec-math"
import {MoveForward} from "./move-forward";
import {Turtle} from "./turtle";

export class DrawMoveForward extends MoveForward{
  draw(turtle: Turtle, turtleStack: Turtle[], geometry: any[]) {
    let transform: mat4 = mat4.create();
    mat4.copy(transform, turtle.transform);
    geometry.push({
      pos: turtle.pos,
      scale: vec3.fromValues(turtle.width, turtle.height, turtle.width),
      color: turtle.color,
      transform: transform
    });
    return super.draw(turtle, turtleStack, geometry);
  }
}