import {LSystem} from './lsystem';
import {XReplace} from "./x-rule/x-replace";
import {XReplacePercent} from "./x-rule/x-replace-percent";
import {XReplaceMinI} from "./x-rule/x-replace-min-i";
import {PointDown} from "./draw-rule/point-down";


export class Tree extends LSystem {
  branchDensity: number = 0.5;

  //constructor
  constructor(iterations: number, options: any) {
    super(iterations, options);
    this.turtle.length = 1;
    this.turtle.width = 1;
    this.axiom = '!(5)FFFFF-(5)F-(5)FFFF+(5)F+(5)FA';

    this.addXRule('A', new XReplace('![B]FTFTF[B]F!F!FFLA'));
    this.addXRule('L', new XReplaceMinI('[G(1)YFFFFFFFFFFFFF]', 3))

    this.setBranchDensity(this.branchDensity);


    this.addStandardDrawRules();
    this.addDrawRule('Y', new PointDown());

  }

  setBranchDensity(percentage: number): void {
    this.branchDensity = percentage;
    this.addXRule('B', new XReplacePercent([{
      output: '[L~F!F!TFA]',
      percentage: this.branchDensity * 0.8
    }], 123));

  }


}