import {gl} from '../../globals';

abstract class Drawable {
  count: number = 0;

  bufIdx: WebGLBuffer;
  bufPos: WebGLBuffer;
  bufNor: WebGLBuffer;
  bufTranslate: WebGLBuffer;
  bufTransform1: WebGLBuffer;
  bufTransform2: WebGLBuffer;
  bufTransform3: WebGLBuffer;
  bufTransform4: WebGLBuffer;
  bufRotTransform1: WebGLBuffer;
  bufRotTransform2: WebGLBuffer;
  bufRotTransform3: WebGLBuffer;
  bufRotTransform4: WebGLBuffer;
  bufScale: WebGLBuffer;
  bufCol: WebGLBuffer;
  bufUV: WebGLBuffer;

  idxGenerated: boolean = false;
  posGenerated: boolean = false;
  norGenerated: boolean = false;
  colGenerated: boolean = false;
  translateGenerated: boolean = false;
  transform1Generated: boolean = false;
  transform2Generated: boolean = false;
  transform3Generated: boolean = false;
  transform4Generated: boolean = false;
  rotTransform1Generated: boolean = false;
  rotTransform2Generated: boolean = false;
  rotTransform3Generated: boolean = false;
  rotTransform4Generated: boolean = false;
  scaleGenerated: boolean = false;
  uvGenerated: boolean = false;

  numInstances: number = 0; // How many instances of this Drawable the shader program should draw


  indices: Uint32Array;
  positions: Float32Array;
  colors: Float32Array;
  normals: Float32Array;
  offsets: Float32Array; // Data for bufTranslate
  transforms1: Float32Array;
  transforms2: Float32Array;
  transforms3: Float32Array;
  transforms4: Float32Array;
  rotTransforms1: Float32Array;
  rotTransforms2: Float32Array;
  rotTransforms3: Float32Array;
  rotTransforms4: Float32Array;
  scales: Float32Array;

  abstract create() : void;

  destory() {
    gl.deleteBuffer(this.bufIdx);
    gl.deleteBuffer(this.bufPos);
    gl.deleteBuffer(this.bufNor);
    gl.deleteBuffer(this.bufCol);
    gl.deleteBuffer(this.bufTranslate);
    gl.deleteBuffer(this.bufTransform1);
    gl.deleteBuffer(this.bufTransform2);
    gl.deleteBuffer(this.bufTransform3);
    gl.deleteBuffer(this.bufTransform4);
    gl.deleteBuffer(this.bufRotTransform1);
    gl.deleteBuffer(this.bufRotTransform2);
    gl.deleteBuffer(this.bufRotTransform3);
    gl.deleteBuffer(this.bufRotTransform4);
    gl.deleteBuffer(this.bufUV);
  }

  genAndBind() {

    this.generateIdx();
    this.generatePos();
    this.generateCol();
    this.generateNor();
    this.generateTranslate();
    this.generateTransform1();
    this.generateTransform2();
    this.generateTransform3();
    this.generateTransform4();
    this.generateRotTransform1();
    this.generateRotTransform2();
    this.generateRotTransform3();
    this.generateRotTransform4();
    this.generateScale();


    this.count = this.indices.length;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufIdx);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.bufPos);
    gl.bufferData(gl.ARRAY_BUFFER, this.positions, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.bufNor);
    gl.bufferData(gl.ARRAY_BUFFER, this.normals, gl.STATIC_DRAW);

  }

  generateIdx() {
    this.idxGenerated = true;
    this.bufIdx = gl.createBuffer();
  }

  generatePos() {
    this.posGenerated = true;
    this.bufPos = gl.createBuffer();
  }

  generateNor() {
    this.norGenerated = true;
    this.bufNor = gl.createBuffer();
  }

  generateCol() {
    this.colGenerated = true;
    this.bufCol = gl.createBuffer();
  }

  generateTranslate() {
    this.translateGenerated = true;
    this.bufTranslate = gl.createBuffer();
  }

  generateTransform1() { this.transform1Generated = true; this.bufTransform1 = gl.createBuffer(); }
  generateTransform2() { this.transform2Generated = true; this.bufTransform2 = gl.createBuffer(); }
  generateTransform3() { this.transform3Generated = true; this.bufTransform3 = gl.createBuffer(); }
  generateTransform4() { this.transform4Generated = true; this.bufTransform4 = gl.createBuffer(); }

  generateRotTransform1() { this.rotTransform1Generated = true; this.bufRotTransform1 = gl.createBuffer(); }
  generateRotTransform2() { this.rotTransform2Generated = true; this.bufRotTransform2 = gl.createBuffer(); }
  generateRotTransform3() { this.rotTransform3Generated = true; this.bufRotTransform3 = gl.createBuffer(); }
  generateRotTransform4() { this.rotTransform4Generated = true; this.bufRotTransform4 = gl.createBuffer(); }

  generateScale() {
    this.scaleGenerated = true;
    this.bufScale = gl.createBuffer();
  }


  generateUV() {
    this.uvGenerated = true;
    this.bufUV = gl.createBuffer();
  }

  bindIdx(): boolean {
    if (this.idxGenerated) {
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufIdx);
    }
    return this.idxGenerated;
  }

  bindPos(): boolean {
    if (this.posGenerated) {
      gl.bindBuffer(gl.ARRAY_BUFFER, this.bufPos);
    }
    return this.posGenerated;
  }

  bindNor(): boolean {
    if (this.norGenerated) {
      gl.bindBuffer(gl.ARRAY_BUFFER, this.bufNor);
    }
    return this.norGenerated;
  }

  bindCol(): boolean {
    if (this.colGenerated) {
      gl.bindBuffer(gl.ARRAY_BUFFER, this.bufCol);
    }
    return this.colGenerated;
  }

  bindTranslate(): boolean {
    if (this.translateGenerated) {
      gl.bindBuffer(gl.ARRAY_BUFFER, this.bufTranslate);
    }
    return this.translateGenerated;
  }

  bindTransform1(): boolean {
    if (this.transform1Generated) {
      gl.bindBuffer(gl.ARRAY_BUFFER, this.bufTransform1);
    }
    return this.transform1Generated;
  }

  bindTransform2(): boolean {
    if (this.transform2Generated) {
      gl.bindBuffer(gl.ARRAY_BUFFER, this.bufTransform2);
    }
    return this.transform2Generated;
  }

  bindTransform3(): boolean {
    if (this.transform3Generated) {
      gl.bindBuffer(gl.ARRAY_BUFFER, this.bufTransform3);
    }
    return this.transform3Generated;
  }

  bindTransform4(): boolean {
    if (this.transform4Generated) {
      gl.bindBuffer(gl.ARRAY_BUFFER, this.bufTransform4);
    }
    return this.transform4Generated;
  }

  bindRotTransform1(): boolean {
    if (this.rotTransform1Generated) {
      gl.bindBuffer(gl.ARRAY_BUFFER, this.bufRotTransform1);
    }
    return this.rotTransform1Generated;
  }

  bindRotTransform2(): boolean {
    if (this.rotTransform2Generated) {
      gl.bindBuffer(gl.ARRAY_BUFFER, this.bufRotTransform2);
    }
    return this.rotTransform2Generated;
  }

  bindRotTransform3(): boolean {
    if (this.rotTransform3Generated) {
      gl.bindBuffer(gl.ARRAY_BUFFER, this.bufRotTransform3);
    }
    return this.rotTransform3Generated;
  }

  bindRotTransform4(): boolean {
    if (this.rotTransform4Generated) {
      gl.bindBuffer(gl.ARRAY_BUFFER, this.bufRotTransform4);
    }
    return this.rotTransform4Generated;
  }


  bindScale(): boolean {
    if (this.scaleGenerated) {
      gl.bindBuffer(gl.ARRAY_BUFFER, this.bufScale);
    }
    return this.scaleGenerated;
  }


  bindUV(): boolean {
    if (this.uvGenerated) {
      gl.bindBuffer(gl.ARRAY_BUFFER, this.bufUV);
    }
    return this.uvGenerated;
  }

  elemCount(): number {
    return this.count;
  }

  drawMode(): GLenum {
    return gl.TRIANGLES;
  }

  setNumInstances(num: number) {
    this.numInstances = num;
  }


  setInstanceVBOs(offsets: number[], scales: number[], colors: number[], transforms: number[][], rotTransforms: number[][]) {
    this.offsets = new Float32Array(offsets);
    this.colors = new Float32Array(colors);
    this.scales = new Float32Array(scales);
    this.transforms1 = new Float32Array(transforms[0]);
    this.transforms2 = new Float32Array(transforms[1]);
    this.transforms3 = new Float32Array(transforms[2]);
    this.transforms4 = new Float32Array(transforms[3]);
    this.rotTransforms1 = new Float32Array(rotTransforms[0]);
    this.rotTransforms2 = new Float32Array(rotTransforms[1]);
    this.rotTransforms3 = new Float32Array(rotTransforms[2]);
    this.rotTransforms4 = new Float32Array(rotTransforms[3]);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.bufTranslate);
    gl.bufferData(gl.ARRAY_BUFFER, this.offsets, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.bufScale);
    gl.bufferData(gl.ARRAY_BUFFER, this.scales, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.bufCol);
    gl.bufferData(gl.ARRAY_BUFFER, this.colors, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.bufTransform1);
    gl.bufferData(gl.ARRAY_BUFFER, this.transforms1, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.bufTransform2);
    gl.bufferData(gl.ARRAY_BUFFER, this.transforms2, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.bufTransform3);
    gl.bufferData(gl.ARRAY_BUFFER, this.transforms3, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.bufTransform4);
    gl.bufferData(gl.ARRAY_BUFFER, this.transforms4, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.bufRotTransform1);
    gl.bufferData(gl.ARRAY_BUFFER, this.rotTransforms1, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.bufRotTransform2);
    gl.bufferData(gl.ARRAY_BUFFER, this.rotTransforms2, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.bufRotTransform3);
    gl.bufferData(gl.ARRAY_BUFFER, this.rotTransforms3, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.bufRotTransform4);
    gl.bufferData(gl.ARRAY_BUFFER, this.rotTransforms4, gl.STATIC_DRAW);

  }
};

export default Drawable;
