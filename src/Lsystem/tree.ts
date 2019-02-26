import {LSystem} from './lsystem';
import {XReplace} from "./x-rule/x-replace";


export class Tree extends LSystem {

  //constructor
  constructor(iterations: number, options: any) {
    super(iterations, options);
    this.turtle.height = 1;
    this.turtle.width = 1;
    this.axiom = 'A';
    this.addXRule('A', new XReplace('FFF-A'));

    this.addStandardDrawRules();

  }


}