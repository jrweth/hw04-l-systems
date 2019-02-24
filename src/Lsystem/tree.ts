import {LSystem} from './lsystem';
import {XReplace} from "./x-rule/x-replace";


export class Tree extends LSystem {

  //constructor
  constructor(iterations: number, options: any) {
    super(iterations, options);
    this.axiom = 'F';
    this.addXRule('F', new XReplace('FA'));
    this.addXRule('A', new XReplace('F'));

  }

}