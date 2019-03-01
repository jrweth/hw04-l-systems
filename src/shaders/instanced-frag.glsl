#version 300 es
precision highp float;
uniform float u_Time;
in vec4 fs_Col;
in vec4 fs_Pos;
in vec4 fs_Nor;

out vec4 out_Col;


vec3 leafBaseColor = vec3(0.1, 0.4, 0.1);
vec3 branchBaseColor = vec3(0.301, 0.203, 0.078);
vec3 branchBaseColor2 = vec3(0.4, 0.4, 1.0);
vec3 lightVector = normalize(vec3(1.0, 1.0, 1.0));
float pulseSpacing = 220.0;
float pulseSpeed = 0.1;





////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////// Random/Noise Functions ////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

float random1( vec2 p , vec2 seed) {
  return fract(sin(dot(p + seed, vec2(127.1, 311.7))) * 43758.5453);
}

float random1( vec3 p , vec3 seed) {
  return fract(sin(dot(p + seed, vec3(987.654, 123.456, 531.975))) * 85734.3545);
}

vec2 random2( vec2 p , vec2 seed) {
  return fract(sin(vec2(dot(p + seed, vec2(311.7, 127.1)), dot(p + seed, vec2(269.5, 183.3)))) * 85734.3545);
}



float interpNoiseRandom2to1(vec2 p, vec2 seed) {
    float fractX = fract(p.x);
    float x1 = floor(p.x);
    float x2 = x1 + 1.0;

    float fractY = fract(p.y);
    float y1 = floor(p.y);
    float y2 = y1 + 1.0;

    float v1 = random1(vec2(x1, y1), seed);
    float v2 = random1(vec2(x2, y1), seed);
    float v3 = random1(vec2(x1, y2), seed);
    float v4 = random1(vec2(x2, y2), seed);

    float i1 = mix(v1, v2, fractX);
    float i2 = mix(v3, v4, fractX);

//    return smoothstep(i1, i2, fractY);
    return mix(i1, i2, fractY);

}

float fbm2to1(vec2 p, vec2 seed) {
    float total  = 0.0;
    float persistence = 0.5;
    float octaves = 8.0;

    for(float i = 0.0; i < octaves; i++) {
        float freq = pow(2.0, i);
        float amp = pow(persistence, i+1.0);
        total = total + interpNoiseRandom2to1(p * freq, seed) * amp;
    }
    return total;
}




vec3 getBranchColor(float fDist, float time, float lightIntensity) {
    float t = mod(time * pulseSpeed, pulseSpacing);
    //float intensity = clamp(1.0 - abs(fDist - mod(time, 30.0)), 0.5, 1.0);
    float pulseIntensity = clamp(2.0 / abs(fDist - t), 0.3, 5.0);

    //add some fbm noise for bark
    float noise = fbm2to1(fs_Pos.xy * 4.0, vec2(34, 43.2));
    //lightIntensity = clamp(lightIntensity - 2.0 * noise, 0.0, 1.0);

    float intensity = pulseIntensity + lightIntensity - noise/2.0;

    intensity = intensity;


    return intensity * branchBaseColor;

}

vec3 getLeafColor(float fDist, float time, float lightIntensity) {
    float t = mod(time * pulseSpeed, pulseSpacing);
    float intensity = clamp(2.0 / abs(t-fDist), 0.3, 5.0);

    vec3 color = leafBaseColor;

    //make the falloff a bit longer
    if(t > fDist) {
       intensity = clamp(2.0 / (0.005 * abs(t-fDist) / pulseSpeed), 0.3, 3.0);
    }

    if(intensity > 0.3) {
       vec2 seed = vec2(fDist, fDist + 2.0);
       vec2 point = vec2(fDist+3.0, fDist+4.0);
       vec3 color2 = vec3( random2(point, seed), random1(point, seed));
       color = mix(color, color2, (intensity - 0.3) / 2.7);
    }

    intensity = intensity + lightIntensity;

    return intensity * color;

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
         out_Col = vec4(getBranchColor(fs_Col.g, u_Time-500.0, sunIntensity), 1.0);
     }
     else if(fs_Col.r == 1.0) {
         out_Col = vec4(getLeafColor(fs_Col.g, u_Time-500.0, sunIntensity), 1.0);
     }
}
