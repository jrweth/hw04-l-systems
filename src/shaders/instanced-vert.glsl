#version 300 es

uniform mat4 u_ViewProj;
uniform float u_Time;

uniform mat3 u_CameraAxes; // Used for rendering particles as billboards (quads that are always looking at the camera)
// gl_Position = center + vs_Pos.x * camRight + vs_Pos.y * camUp;

in vec4 vs_Pos; // Non-instanced; each particle is the same quad drawn in a different place
in vec4 vs_Nor; // Non-instanced, and presently unused
in vec4 vs_Col; // An instanced rendering attribute; each particle instance has a different color
in vec3 vs_Translate; // Another instance rendering attribute used to position each quad instance in the scene
in vec4 vs_Transform1; //Instance rendering attribute for transforming the object
in vec4 vs_Transform2; //Instance rendering attribute for transforming the object
in vec4 vs_Transform3; //Instance rendering attribute for transforming the object
in vec4 vs_Transform4; //Instance rendering attribute for transforming the object
in vec4 vs_RotTransform1; //Instance rendering attribute for transforming the object
in vec4 vs_RotTransform2; //Instance rendering attribute for transforming the object
in vec4 vs_RotTransform3; //Instance rendering attribute for transforming the object
in vec4 vs_RotTransform4; //Instance rendering attribute for transforming the object
in vec2 vs_UV; // Non-instanced, and presently unused in main(). Feel free to use it for your meshes.

out vec4 fs_Col;
out vec4 fs_Pos;
out vec4 fs_Nor;

void main()
{
    fs_Pos = vs_Pos;
    fs_Nor = vs_Nor;

    mat4 transform;
    transform[0] = vs_Transform1;
    transform[1] = vs_Transform2;
    transform[2] = vs_Transform3;
    transform[3] = vs_Transform4;

    mat4 rotTransform;
    rotTransform[0] = vs_RotTransform1;
    rotTransform[1] = vs_RotTransform2;
    rotTransform[2] = vs_RotTransform3;
    rotTransform[3] = vs_RotTransform4;


    gl_Position = u_ViewProj * transform * vec4(vs_Pos.xyz, 1.0);
    fs_Nor = rotTransform * vs_Nor;

    //get the color
    //for branches
    if(vs_Col.r == 0.0) {
        fs_Col = vec4(0.768, 0.584, 0.211, 1.0);
    }
    else if (vs_Col.r == 1.0) {
        fs_Col = vec4(0.611, 0.768, 0.211, 1.0);
    }

}