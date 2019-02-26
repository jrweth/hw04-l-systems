import {DrawRule} from "./draw-rule";
import {mat4, vec3} from "gl-matrix";
import {VecMath} from "../../util/vec-math"
import {MoveForward} from "./move-forward";

export class DrawMoveForward extends MoveForward{
  draw() {
    let transform: mat4 = mat4.create();
    mat4.copy(transform, this.turtle.transform);
    this.geometry.push({
      pos: this.turtle.pos,
      scale: vec3.fromValues(this.turtle.width, this.turtle.height, this.turtle.width),
      color: this.turtle.color,
      transform: transform
    });
    super.draw();
  }
}