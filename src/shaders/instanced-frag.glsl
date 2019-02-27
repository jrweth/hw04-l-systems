#version 300 es
precision highp float;

in vec4 fs_Col;
in vec4 fs_Pos;
in vec4 fs_Nor;

out vec4 out_Col;

vec3 lightVector = normalize(vec3(1.0, 1.0, 1.0));

void main()
{
     vec4 normal = normalize(fs_Nor);

     vec4 col = fs_Col;
     vec4 diffuseColor;

     //sunlight
     // Calculate the diffuse term for Lambert shading
     float sunDiffuseTerm = dot(normalize(normal.xyz), lightVector.xyz);
     float ambientTerm = 0.3;
     float sunIntensity = clamp(0.1, 1.0, sunDiffuseTerm + ambientTerm);   //Add a small float value to the color multiplier

     out_Col = vec4(sunIntensity * vec3(1.0, 1.0, 1.0), 1.0);
     out_Col = vec4(sunIntensity * fs_Col.xyz, 1.0);
}
