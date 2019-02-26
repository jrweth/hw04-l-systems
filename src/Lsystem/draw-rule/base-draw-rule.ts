import {Turtle} from "./turtle";

export class BaseDrawRule {
  options: any;

  constructor(options?: any) {
    this.options = options ? options : {};
  }

}