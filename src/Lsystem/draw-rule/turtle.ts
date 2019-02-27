import {mat4, vec3, vec4} from 'gl-matrix';

/**
 * Struct to hold the parameters for the turtle
 */
export class Turtle {
  //the up vector representing the orientation of the turtle
  up: vec3 = vec3.fromValues(0.0, 0.0, 1.0);

  //the direction the turtle is facing
  dir: vec3 = vec3.fromValues(0.0, 1.0, 0.0);

  //the position where the turtle exists
  pos: vec3 = vec3.fromValues(0.0, 0.0, 0.0);

  //the standard angle at which the turtle pitches up and down
  pitchAngle: number = 30;
  pitchScale: number  = 1.1;

  //the standard angle at which the turtle yaws side to side
  yawAngle: number = 30;
  yawScale: number = 1.1;

  //the standard angle at which the turtle rolls along the direction axis
  rollAngle: number = 30;
  rollScale: number = 1.1;

  width: number = 1.0;
  widthScale: number = 0.9;

  length: number = 1.0;
  lengthScale: number = 0.9;

  gravity: number =  0.1;

  color: vec4 = vec4.fromValues(0.5,0.5,0.9, 1.0);

  rotationTransform: mat4 = mat4.fromValues(1,0,0,0,
    0,1,0,0,
    0,0,1,0,
    0,0,0,1);

  transform: mat4 = mat4.fromValues(1,0,0,0,
                                       0,1,0,0,
                                       0,0,1,0,
                                       0,0,0,1);

  geometryType: number = 0;

}

export function cloneTurtle(turtle: Turtle): Turtle {
    let newTurtle: Turtle = new Turtle();
    let up: vec3 = vec3.create();
    vec3.copy(up, turtle.up);

    let dir:vec3 = vec3.create();
    vec3.copy(dir, turtle.dir);

    let pos:vec3 = vec3.create();
    vec3.copy(pos, turtle.pos);

    let color:vec4 = vec4.create();
    vec4.copy(color, turtle.color);

    let transform:mat4 = mat4.create();
    mat4.copy(transform, turtle.transform);

    let rotationTransform:mat4 = mat4.create();
    mat4.copy(rotationTransform, turtle.rotationTransform);

    newTurtle.pitchAngle  = turtle.pitchAngle,
    newTurtle.pitchScale  = turtle.pitchScale,
    newTurtle.yawAngle    = turtle.yawAngle,
    newTurtle.yawScale    = turtle.yawScale,
    newTurtle.rollAngle   = turtle.rollAngle,
    newTurtle.rollScale   = turtle.rollScale,
    newTurtle.width       = turtle.width,
    newTurtle.widthScale  = turtle.widthScale;
    newTurtle.length      = turtle.length;
    newTurtle.lengthScale = turtle.lengthScale;
    newTurtle.gravity     = turtle.gravity;
    newTurtle.geometryType= turtle.geometryType;
    newTurtle.up          = up;
    newTurtle.dir         = dir;
    newTurtle.pos         = pos;
    newTurtle.color       = color;
    newTurtle.transform   = transform;
    newTurtle.rotationTransform   = rotationTransform;

    return newTurtle;
}