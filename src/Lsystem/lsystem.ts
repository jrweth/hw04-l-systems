import {XRule} from 'x-rule/x-rule';
import {XReplace} from "./x-rule/x-replace";

export class LSystem {
  //the axiom to start with
  axiom: string;

  //the current string
  curString: string;

  //the current number of interations
  curIteration: number;

  //the total number of iterations desired
  iterations: number;

  //the set of expansion rules
  xRules : Map<string, XRule> = new Map();

  //any options that can be sent into the lsystem
  options: any;

  //initialize with the options
  constructor(iterations: number, options: any) {
    this.iterations = iterations;
    this.options = options;
    this.curIteration = 0;
  }

  //add an expansion rule
  addXRule(char: string, func: XRule) {
    this.xRules.set(char, func);
  }


  //do one iteration over the string
  iterate(): void {
    let nextString:string = '';
    for(let charIndex:number = 0; charIndex < this.curString.length; charIndex++) {
      let char = this.curString.charAt(charIndex);
      let func = this.xRules.get(char);
      if(func) {
        nextString += func.apply(char);
      }
    }

    this.curString = nextString;
    this.curIteration++;
  }

  run(): string {
    this.curString = this.axiom;
    for(let i:number = 0; i < this.iterations; i++) {
      this.iterate();
    }

    return this.curString;
  }


}