import {LSystem} from './lsystem';
import {XReplace} from "./x-rule/x-replace";
import {XReplacePercent} from "./x-rule/x-replace-percent";
import {XReplaceMinI} from "./x-rule/x-replace-min-i";
import {PointDown} from "./draw-rule/point-down";
import {SetWidth} from "./draw-rule/set-width";
import {SetItoFCount} from "./draw-rule/set-i-to-f-count";
import {ResetFCount} from "./draw-rule/reset-f-count";


export class Tree extends LSystem {
  branchDensity: number = 0.5;

  //constructor
  constructor(iterations: number, options: any) {
    super(iterations, options);
    this.turtle.length = 1;
    this.turtle.width = 1;
    this.axiom = '!(5)FFFFF-(5)F-(5)FFFF+(5)F+(6)FA';

    this.addXRule('A', new XReplace('![B]FITFITF[B]F!F!FFLA'));
    this.addXRule('L', new XReplaceMinI('[G(1)SW(4)YFF~(5)FF~(5)FFF~(5)FFF~(5)FFF]', 2))

    this.setBranchDensity(this.branchDensity);


    this.addStandardDrawRules();
    this.addDrawRule('Y', new PointDown());
    this.addDrawRule('W', new SetWidth());
    this.addDrawRule('S', new SetItoFCount());

  }

  setBranchDensity(percentage: number): void {
    this.branchDensity = percentage;
    this.addXRule('B', new XReplacePercent([{
      output: '[~F!F!TFAL]',
      percentage: this.branchDensity * 0.8
    }], 34394));

  }


}