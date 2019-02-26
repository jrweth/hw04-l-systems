import {BaseDrawRule} from "./base-draw-rule";
import {DrawRule} from "./draw-rule";
import {mat4, vec3} from "gl-matrix";
import {VecMath} from "../../util/vec-math"
import {cloneTurtle, Turtle} from "./turtle";

export class EndBranch extends BaseDrawRule implements DrawRule {
  draw(turtle: Turtle, turtleStack: Turtle[], geometry: any[]) {
    turtle = turtleStack.pop();
    return turtle;
  }
}