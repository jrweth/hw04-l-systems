import {LSystem} from './lsystem';
import {XReplace} from "./x-rule/x-replace";
import {XReplacePercent} from "./x-rule/x-replace-percent";


export class Tree extends LSystem {

  //constructor
  constructor(iterations: number, options: any) {
    super(iterations, options);
    this.turtle.length = 1;
    this.turtle.width = 1;
    //axiom is the trunk
    this.axiom = 'FF+(15)FFF-(20)!FFA';

    this.addXRule('A', new XReplace('!FF!F~;[B]FFF[B]TA'));
    this.addXRule('B', new XReplacePercent([
      {output: '[~~!!!FFFA]', percentage: 0.90},
    ], 2344));

    this.addStandardDrawRules();

  }


}