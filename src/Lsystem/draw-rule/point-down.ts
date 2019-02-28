import {BaseDrawRule} from "./base-draw-rule";
import {DrawRule} from "./draw-rule";
import {mat4, vec3, vec4} from "gl-matrix";
import {VecMath} from "../../util/vec-math"
import {Turtle} from "./turtle";

export class PointDown extends BaseDrawRule implements DrawRule {
  draw(turtle: Turtle, turtleStack: Turtle[], geometry: any, options: string) {
    // let gravity: number = turtle.gravity;
    // if(!isNaN(parseFloat(options))) {
    //   gravity = parseFloat(options);
    // }
    let rotation: mat4 = mat4.create();
    mat4.fromRotation(rotation, Math.PI, vec3.fromValues(1, 0, 0));
    turtle.rotationTransform = rotation;

    let pos: vec4 = vec4.fromValues(0,0,0,1);
    vec4.transformMat4(pos, pos, turtle.transform);

    let transform: mat4 = mat4.create();
    mat4.fromTranslation(transform, vec3.fromValues(pos[0], pos[1], pos[2]));
    mat4.multiply(transform, transform, rotation);
    turtle.transform = transform;

    turtle.dir = vec3.fromValues(0, -1, 0);


    return turtle;
  }
}