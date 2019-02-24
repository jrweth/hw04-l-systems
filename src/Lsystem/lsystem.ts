import {XRule} from 'x-rule/x-rule';
import {XReplace} from "./x-rule/x-replace";
import {DrawRule} from "./draw-rule/draw-rule";
import {MoveForward} from "./draw-rule/move-forward";
import {Turtle} from "./draw-rule/turtle";
import {DrawMoveForward} from "./draw-rule/draw-move-forward";
import {TurnRight} from "./draw-rule/turn-right";
import {TurnLeft} from "./draw-rule/turn-left";

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

  //the set of drawing rules
  drawRules : Map<string, DrawRule> = new Map();

  //any options that can be sent into the lsystem
  options: any;

  //the current state of the turtle
  turtle: Turtle = new Turtle;

  //the turtle stack
  turtleStack: Turtle[] = [];


  //geometries
  geometries: any[] = [];


  //initialize with the options
  constructor(iterations: number, options: any) {
    this.iterations = iterations;
    this.options = options;
    this.curIteration = 0;

  }

  //add an expansion rule
  addXRule(char: string, rule: XRule) {
    this.xRules.set(char, rule);
  }

  //add
  addDrawRule(char: string, rule: DrawRule) {
    this.drawRules.set(char, rule)
  }


  //do one iteration over the string
  iterate(): void {
    let nextString:string = '';
    for(let charIndex:number = 0; charIndex < this.curString.length; charIndex++) {
      let char = this.curString.charAt(charIndex);
      let func = this.xRules.get(char);
      //if rule is found then use
      if(func) {
        nextString += func.apply(char);
      }
      //if no rule found then just retain the same character
      else {
        nextString += char;
      }
    }

    this.curString = nextString;
    this.curIteration++;
  }

  runExpansionIterations(): string {
    this.curString = this.axiom;
    for(let i:number = 0; i < this.iterations; i++) {
      this.iterate();
    }

    return this.curString;
  }


  runDrawRules(): any[] {
    for(let charIndex:number = 0; charIndex < this.curString.length; charIndex++) {
      let char = this.curString.charAt(charIndex);
      let func = this.drawRules.get(char);
      //if rule is found then use
      if(func) {
        func.draw();
      }
    }
    return this.geometries;
  }



  /**
   * Add the standard rules based of Houdini codes
   */
  addStandardDrawRules(): void {
    this.addDrawRule('f', new MoveForward(this.turtle, this.turtleStack, this.geometries));
    this.addDrawRule('F', new DrawMoveForward(this.turtle, this.turtleStack, this.geometries));
    this.addDrawRule('+', new TurnRight(this.turtle, this.turtleStack, this.geometries));
    this.addDrawRule('-', new TurnLeft(this.turtle, this.turtleStack, this.geometries));
  }


}