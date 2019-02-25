import {DrawRule} from "./draw-rule";
import {vec3} from "gl-matrix";
import {VecMath} from "../../util/vec-math"
import {MoveForward} from "./move-forward";

export class DrawMoveForward extends MoveForward{
  draw() {
    this.geometry.push({
      pos: this.turtle.pos,
      scale: vec3.fromValues(this.turtle.width, this.turtle.height, this.turtle.width),
      color: this.turtle.color
    });
    super.draw();
  }
}