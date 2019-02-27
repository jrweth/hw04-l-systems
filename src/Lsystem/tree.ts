import {LSystem} from './lsystem';
import {XReplace} from "./x-rule/x-replace";
import {XReplacePercent} from "./x-rule/x-replace-percent";


export class Tree extends LSystem {

  //constructor
  constructor(iterations: number, options: any) {
    super(iterations, options);
    this.turtle.length = 1;
    this.turtle.width = 1;
    this.axiom = 'A';
    this.addXRule('A', new XReplace('F!F!F~F!FFBA'));
    this.addXRule('B', new XReplacePercent([
      {output: '[^FFF]', percentage: 0.90},
      {output: '[-FFF]', percentage: 0.10}
    ], 2344));

    this.addStandardDrawRules();

  }


}