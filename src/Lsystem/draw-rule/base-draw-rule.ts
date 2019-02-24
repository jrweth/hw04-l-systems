import {Turtle} from "./turtle";

export class BaseDrawRule {
  turtle: Turtle;
  turtleStack: Turtle[];
  geometry: any[];
  options: any;

  constructor(turtle: Turtle, turtleStack: Turtle[], geometry: any[], options?: any) {
    this.turtle = turtle;
    this.turtleStack = turtleStack;
    this.geometry = geometry;
    this.options = options ? options : {};
  }

}