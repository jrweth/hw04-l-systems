import {Turtle} from "./turtle";

export interface DrawRule {

  draw(turtle: Turtle, turtleStack: Turtle[], geometry: any[], options?: any): Turtle;

}