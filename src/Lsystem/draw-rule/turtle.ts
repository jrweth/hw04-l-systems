import {vec3, vec4} from 'gl-matrix';

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
  pitchScale: number  = 1.0;

  //the standard angle at which the turtle yaws side to side
  yawAngle: number = 30;
  yawScale: number = 1.0;

  //the standard angle at which the turtle rolls along the direction axis
  rotateAngle: number = 30;
  rotateScale: number = 1.0;

  width: number = 1.0;
  widthScale: number = 1.0;

  height: number = 1.0;
  heightScale: number = 1.0;

  color: vec4 = vec4.fromValues(0.5,0.5,0.9, 1.0);
}