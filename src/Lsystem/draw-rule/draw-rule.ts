import {Turtle} from "./turtle";

export interface DrawRule {
  turtle: Turtle;
  turtleStack: Turtle[];
  geometry: any[];

  draw(): void;

}