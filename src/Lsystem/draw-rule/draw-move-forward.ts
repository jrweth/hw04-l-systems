import {DrawRule} from "./draw-rule";
import {vec3} from "gl-matrix";
import {VecMath} from "../../util/vec-math"
import {MoveForward} from "./move-forward";

export class DrawMoveForward extends MoveForward{
  draw() {
    console.log(this);
    this.geometry.push({
      pos: this.turtle.pos,
      scale: vec3.fromValues(this.turtle.width, this.turtle.height, this.turtle.width)
    });
    super.draw();
  }
}