import {Turtle} from "./turtle";
import {GeometryInstance} from "../lsystem";

export interface DrawRule {

  draw(turtle: Turtle, turtleStack: Turtle[], geometry: GeometryInstance[], options?: any): Turtle;

}