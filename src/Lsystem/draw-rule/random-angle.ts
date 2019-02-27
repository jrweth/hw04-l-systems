import {BaseDrawRule} from "./base-draw-rule";
import {DrawRule} from "./draw-rule";
import {mat4, vec3} from "gl-matrix";
import {VecMath} from "../../util/vec-math"
import {Turtle} from "./turtle";
import {RollClockwise} from "./roll-clockwise";
import {TurnLeft} from "./turn-left";
import {PitchUp} from "./pitch-up";
let Prando = require('prando').default;

export class RandomAngle extends BaseDrawRule implements DrawRule {
  prando: any;

  constructor(options: {seed: number}) {
    super(options);
    this.prando = new Prando(options.seed);
  }

  draw(turtle: Turtle, turtleStack: Turtle[], geometry: any, options: string) {
    //default to the current turtle roll angle
    let maxAngle:number = turtle.rollAngle;
    if(parseFloat(options) > 0) {
      maxAngle = parseFloat(options);
    }

    let angle: number;

    //get the roll transform
    angle= this.prando.next(0, maxAngle * 2) - maxAngle;
    let roll: RollClockwise = new RollClockwise();
    turtle = roll.draw(turtle, turtleStack, geometry, angle.toString());

    //get the yaw transfomr
    angle = this.prando.next(0, maxAngle * 2) - maxAngle;
    let yaw: TurnLeft = new TurnLeft();
    turtle = yaw.draw(turtle, turtleStack, geometry, angle.toString());

    //get the pictch transform
    angle = this.prando.next(0, maxAngle * 2) - maxAngle;
    let pitch: PitchUp = new PitchUp();
    turtle = pitch.draw(turtle, turtleStack, geometry, angle.toString());


    return turtle;
  }
}