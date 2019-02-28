import {LSystem} from './lsystem';
import {XReplace} from "./x-rule/x-replace";
import {XReplacePercent} from "./x-rule/x-replace-percent";


export class Tree extends LSystem {
  branchDensity: number = 0.5;

  //constructor
  constructor(iterations: number, options: any) {
    super(iterations, options);
    this.turtle.length = 1;
    this.turtle.width = 1;
    this.axiom = '!(5)FFFFF+(10)FFF-(20)FFF[L]A';

    this.addXRule('A', new XReplace('![B]FTFTF[B]F!F!FFA'));
    this.addXRule('L', new XReplace('-(90)G(1)FFFFFFFFFFFFFFF'))
    this.setBranchDensity(this.branchDensity);


    this.addStandardDrawRules();

  }

  setBranchDensity(percentage: number): void {
    this.branchDensity = percentage;
    this.addXRule('B', new XReplacePercent([{
      output: '[~F!F!TFA]',
      percentage: this.branchDensity * 0.8
    }], 123));

  }


}