import {DrawRule} from "./draw-rule";
import {mat4, vec3, vec4} from "gl-matrix";
import {VecMath} from "../../util/vec-math"
import {MoveForward} from "./move-forward";
import {Turtle} from "./turtle";
import {GeometryInstance} from "../lsystem";

export class DrawMoveForward extends MoveForward{
  draw(turtle: Turtle, turtleStack: Turtle[], geometry: GeometryInstance[]) {
    let transform: mat4 = mat4.create();
    mat4.copy(transform, turtle.transform);

    let scale: mat4 = mat4.create();
    mat4.scale(scale, scale, vec3.fromValues(turtle.width, turtle.length, turtle.width));
    mat4.multiply(transform, transform, scale);

    let rotTransform: mat4 = mat4.create();
    mat4.copy(rotTransform, turtle.rotationTransform);


    geometry.push({
      type: turtle.geometryType,
      color: vec4.fromValues(turtle.geometryType, turtle.fCount, 0, 0 ),
      transform: transform,
      offset: turtle.pos,
      rotTransform: rotTransform
    });
    return super.draw(turtle, turtleStack, geometry);
  }
}