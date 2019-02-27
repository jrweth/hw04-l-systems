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
    this.axiom = 'FFFFF+(10)FFF-(20)FFFA';

    this.addXRule('A', new XReplace('![~F!F!TFA]FTFTF[~F!FT!FT!FA]F!F!FFA'));

    this.addStandardDrawRules();

  }


}