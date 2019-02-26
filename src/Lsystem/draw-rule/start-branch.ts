import {BaseDrawRule} from "./base-draw-rule";
import {DrawRule} from "./draw-rule";
import {mat4, vec3} from "gl-matrix";
import {VecMath} from "../../util/vec-math"
import {cloneTurtle, Turtle} from "./turtle";

export class StartBranch extends BaseDrawRule implements DrawRule {
  draw(turtle: Turtle, turtleStack: Turtle[], geometry: any) {
    console.log('start');
    let l: number = turtleStack.length;
    turtleStack.push(cloneTurtle(turtle));
    return turtle;
  }
}