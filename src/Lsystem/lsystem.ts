import {XRule} from 'x-rule/x-rule';
import {XReplace} from "./x-rule/x-replace";
import {DrawRule} from "./draw-rule/draw-rule";
import {MoveForward} from "./draw-rule/move-forward";
import {Turtle} from "./draw-rule/turtle";
import {DrawMoveForward} from "./draw-rule/draw-move-forward";
import {TurnRight} from "./draw-rule/turn-right";
import {TurnLeft} from "./draw-rule/turn-left";
import {StartBranch} from "./draw-rule/start-branch";
import {EndBranch} from "./draw-rule/end-branch";
import {RollClockwise} from "./draw-rule/roll-clockwise";
import {RandomAngle} from "./draw-rule/random-angle";
import {PitchUp} from "./draw-rule/pitch-up";
import {ScaleLength} from "./draw-rule/scale-length";
import {ScaleWidth} from "./draw-rule/scale-width";
import {Gravity} from "./draw-rule/gravity";
import {ScaleAngle} from "./draw-rule/scale-angle";
import {mat4, vec3, vec4} from "gl-matrix";
import {ChangeGeometry} from "./draw-rule/change-geometry";


export class GeometryInstance {
  type: number;
  color: vec4;
  transform: mat4;
  offset: vec3;
  rotTransform: mat4;
}

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
  geometries: GeometryInstance[] = [];


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
    //do the initial scaling
    for(let charIndex:number = 0; charIndex < this.curString.length; charIndex++) {
      let char = this.curString.charAt(charIndex);
      let func = this.drawRules.get(char);
      //if rule is found then use
      if(func) {
        //check to see if we have an option string for our draw rule
        let option = '';

        //options for the symbol are encloesed in () -- if they exist get the option
        if(this.curString.charAt(charIndex + 1) == '(') {
          charIndex += 2;
          while(this.curString.charAt(charIndex) !== ')') {
            option += this.curString.charAt(charIndex);
            charIndex++
          }
        }

        this.turtle = func.draw(this.turtle, this.turtleStack, this.geometries, option);
      }
    }
    return this.geometries;
  }



  /**
   * Add the standard rules based off Houdini codes
   */
  addStandardDrawRules(): void {
    this.addDrawRule('f', new MoveForward());
    this.addDrawRule('F', new DrawMoveForward());
    this.addDrawRule('+', new TurnRight());
    this.addDrawRule('-', new TurnLeft());
    this.addDrawRule('[', new StartBranch());
    this.addDrawRule(']', new EndBranch());
    this.addDrawRule('/', new RollClockwise());
    this.addDrawRule('~', new RandomAngle({seed: 1}));
    this.addDrawRule('^', new PitchUp());
    this.addDrawRule('"', new ScaleLength());
    this.addDrawRule("!", new ScaleWidth());
    this.addDrawRule(";", new ScaleAngle());
    this.addDrawRule("T", new Gravity());
    this.addDrawRule("G", new ChangeGeometry());
  }


}