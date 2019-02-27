import {LSystem} from './lsystem';
import {XReplace} from "./x-rule/x-replace";
import {XReplacePercent} from "./x-rule/x-replace-percent";


export class Tree extends LSystem {

  //constructor
  constructor(iterations: number, options: any) {
    super(iterations, options);
    this.turtle.length = 1.0;
    this.turtle.width = 5;
    //axiom is the trunk
    this.axiom = 'FFFFF~(10)FFF~(20)FFFA';

    this.addXRule('A', new XReplace('!F!F[~FTFTFTA]F!FF[~FTFTFTA]'));
    this.addXRule('B', new XReplacePercent([
      {output: '[~~!!!FFFA]', percentage: 0.90},
    ], 2344));

    this.addStandardDrawRules();

  }


}