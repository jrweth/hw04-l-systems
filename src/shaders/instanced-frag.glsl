#version 300 es
precision highp float;
uniform float u_Time;
in vec4 fs_Col;
in vec4 fs_Pos;
in vec4 fs_Nor;

out vec4 out_Col;


vec3 baseColor = vec3(0.4, 0.4, 1.0);
vec3 lightVector = normalize(vec3(1.0, 1.0, 1.0));
float pulseSpacing = 200.0;
float pulseSpeed = 0.2;


vec3 getBranchColor(float fDist, float time, float lightIntensity) {
    float t = mod(time * pulseSpeed, pulseSpacing);
    //float intensity = clamp(1.0 - abs(fDist - mod(time, 30.0)), 0.5, 1.0);
    float intensity = clamp(2.0 / abs(fDist - t), 0.3, 5.0);
    intensity = intensity + lightIntensity;

    return intensity * baseColor;

}

vec3 getLeafColor(float fDist, float time, float lightIntensity) {
    float t = mod(time * pulseSpeed, pulseSpacing);
    //float intensity = clamp(1.0 - abs(fDist - mod(time, 30.0)), 0.5, 1.0);
    float intensity = clamp(2.0 / abs(fDist - t), 0.3, 5.0);
    intensity = intensity + lightIntensity;

    return intensity * baseColor;

}

vec4 getBranchColor2(float order, float pos) {
    float numColors = 4.0;
    vec4 color1 = vec4(1.0, .0, .0, 1.0);
    vec4 color2 = vec4(1.0, 1.0, .0, 1.0);
    vec4 color3 = vec4(0.0, 1.0, 1.0, 1.0);
    vec4 color4 = vec4(0.0, 0.0, 1.0, 1.0);
    if(mod(order, 5.0) == 0.0) {
       return color1;
    }
    else if(mod(order, numColors * 2.0) == 1.0) {
        if(pos == 0.0) {
           return color1;
        }
        else {
            return color2;
        }
    }
    else if(mod(order, numColors * 2.0) == 2.0) {
       return color2;
    }
    else if(mod(order, numColors * 2.0) == 3.0) {
        if(pos == 0.0) {
           return color2;
        }
        else {
            return color3;
        }
    }
    else if(mod(order, numColors * 2.0) == 4.0) {
        return color3;
    }
    else if(mod(order, numColors * 2.0) == 5.0) {
        if(pos == 0.0) {
           return color3;
        }
        else {
            return color4;
        }
    }
    else if(mod(order, numColors * 2.0) == 6.0) {
        return color4;
    }
    else if(mod(order, numColors * 2.0) == 7.0) {
        if(pos == 0.0) {
           return color4;
        }
        else {
            return color1;
        }
    }

    return vec4(0.0, 0.0, 0.8, 1.0);
}

void main()
{
     vec4 normal = normalize(fs_Nor);

     vec4 diffuseColor;
     //sunlight
     // Calculate the diffuse term for Lambert shading
     float sunDiffuseTerm = dot(normalize(normal.xyz), lightVector.xyz);
     float ambientTerm = 0.1;
     float sunIntensity = clamp(0.0, 1.0, sunDiffuseTerm + ambientTerm);   //Add a small float value to the color multiplier

     if(fs_Col.r == 0.0) {
         out_Col = vec4(getBranchColor(fs_Col.g, u_Time, sunIntensity), 1.0);
     }
     else if(fs_Col.r == 1.0) {
         out_Col = vec4(getLeafColor(fs_Col.g, u_Time, sunIntensity), 1.0);
     }
}
