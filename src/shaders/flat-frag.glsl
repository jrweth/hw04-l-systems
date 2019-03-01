#version 300 es
precision highp float;

uniform vec3 u_Eye, u_Ref, u_Up;
uniform vec2 u_Dimensions;
uniform float u_Time;

uniform vec3      iResolution;           // viewport resolution (in pixels)
uniform float     iTime;                 // shader playback time (in seconds)
uniform float     iTimeDelta;            // render time (in seconds)
uniform int       iFrame;                // shader playback frame
uniform float     iChannelTime[4];       // channel playback time (in seconds)
uniform vec3      iChannelResolution[4]; // channel resolution (in pixels)
uniform vec4      iMouse;                // mouse pixel coords. xy: current (if MLB down), zw: click

//uniform samplerXX iChannel0..3;          // input channel. XX = 2D/Cube
uniform vec4      iDate;                 // (year, month, day, time in seconds)

in vec2 fs_Pos;
out vec4 out_Col;


const float sceneRadius = 100.0;

const float sunOrbit = 80.0;
const float horizon = 0.0;
const float midSky = 15.0;

float night;
float noon;
float sunset;
float dawn;
float camChange;


vec3 v3Up = vec3(0.0, 1.0, 0.0);
vec3 v3Ref = vec3(0.0, 0.0, 0.0);
vec3 v3Eye = vec3(0.0, 0.0, 4.0);
vec3 sunPosition = vec3(5.0,10.0,10.0);


vec2 v2ScreenPos;
float hour;
float sunBloomDistance;        //the distance of the ray from teh sun in the sky
float pi = 3.14159;

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

////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////// Utilities ////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
vec2 pixelToScreenPos(vec2 pixelPos) {
    return (2.0 * vec2(pixelPos.x / iResolution.x, pixelPos.y/iResolution.y)) - vec2(1.0);
}

vec2 screenToPixelPos(vec2 pixelPos) {
    return iResolution.xy * (pixelPos + vec2(1.0)) / 2.0;
}

//  Function to calculate the ray based upn the up, eye, ref, aspect ration and screen position
vec3 getRay(vec3 up, vec3 eye, vec3 ref, float aspect, vec2 screenPos) {
    vec3 right = normalize(cross( up - eye, up));  //right vector
    float len = length(ref - eye);   //length
    vec3 vert = up * len * 0.5; //normally this would also be based upon FOV tan(FOV) but we are constraing to the box
    vec3 horiz = right * aspect * len * 0.5; //normally this would also be based upon FOV tan(FOV) but we are constraining to the box
    vec3 point = ref + (screenPos.x * horiz) + screenPos.y * vert;

    //calculate the ray
    return normalize(point - eye);

}

mat3 rotateX(float angle) {
    float c = cos(angle);
    float s = sin(angle);
    return mat3(1.0, 0.0, 0.0,
                0.0, c, -s,
                0.0, s, c);
}


mat3 rotateY(float angle) {
    float c = cos(angle);
    float s = sin(angle);
    return mat3(c, 0.0, -s,
                0.0, 1.0, 0.0,
                s, 0.0, c);
}

mat3 rotateZ(float angle) {
    float c = cos(angle);
    float s = sin(angle);
    return mat3(c, -s, 0.0,
                s, c, 0.0,
                0.0, 0.0, 1.0);
}


////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////// Background  ////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
float horizonHeight() {
    vec2 adjustedPos = vec2(fs_Pos.x - camChange*0.5, 0.0);
    float displacement = fbm2to1(adjustedPos, vec2(3.33, 3.2343))*1.3 - .75;
    return displacement;
}

vec3 skyColor() {

      vec3 color;
      vec3 horizonColor;
      vec3 midColor;
      vec3 zenithColor;

      vec3 nightHorizon = vec3(0.107, 0.127, 0.468);
      vec3 nightMid = vec3(0.030, 0.031, 0.3);
      vec3 nightZenith = vec3(0.002, 0.005, 0.2);

      vec3 noonHorizon = vec3(0.137, 0.227, 0.568);
      vec3 noonMid = vec3(0.050, 0.071, 0.7);
      vec3 noonZenith = vec3(0.007, 0.009, 1.0);

      vec3 sunsetHorizon = vec3(0.823, 0.325, 0.227);
      vec3 sunsetMid = vec3(0.909, 0.450, 0.262);
      vec3 sunsetZenith = vec3(0.007, 0.009, 0.3);

      vec3 dawnHorizon = vec3(0.323, 0.225, 0.127);
      vec3 dawnMid = vec3(0.209, 0.150, 0.262);
      vec3 dawnZenith = vec3(0.007, 0.009, 0.3);
      float blend;


      horizonColor = nightHorizon  * night
                   + dawnHorizon   * dawn
                   + noonHorizon   * noon
                   + sunsetHorizon * sunset;

      midColor     = nightMid  * night
                   + dawnMid   * dawn
                   + noonMid   * noon
                   + sunsetMid * sunset;

      zenithColor  = nightZenith  * night
                   + dawnZenith   * dawn
                   + noonZenith  * noon
                   + sunsetZenith* sunset;



      if(fs_Pos.y < 0.25) {
          color = mix(horizonColor, midColor, fs_Pos.y * 4.0);
      }
      else {
          color = mix(midColor, zenithColor, (fs_Pos.y - 0.25) *1.333);
      }
      return color;

}


vec3 landColor() {

    vec2 adjustedPos = fs_Pos;
    adjustedPos.x -= camChange*0.5;
    float noise = fbm2to1(adjustedPos*70.0, vec2(1.0,2.0));
    float noise2= fbm2to1(adjustedPos*5.0, vec2(1.0,2.0));
    vec3 grass = vec3(0.180, 0.356, 0.039);
    vec3 dirt = vec3(0.878, 0.733, 0.141);
    vec3 base = mix(grass, dirt, noise) * noise2;

    float noonIntensity = 1.5;
    float sunsetIntensity = 0.5;
    float nightIntensity = 0.03;
    float dawnIntensity = 0.5;

//    float pulseIntensity = 0.0;
//    if(abs(distance(fs_Pos - vec2(0, -1)) < 0.1)) {
//      // pulseIntensity = 1.0;
//
//    }


    return noise * base * (
        noon * noonIntensity
        + sunset * sunsetIntensity
        + night * nightIntensity
        + dawn * dawnIntensity
        //+ pulseIntensity
    );

}

vec3 backgroundColor() {


    if(fs_Pos.y < horizonHeight()) {
        return landColor();
    }
    return skyColor();

}


void adjustColorForLights(inout vec3 color, vec3 normal, vec3 point, int sdfIndex) {
    vec3 direction;
    vec3 lightColor;
    vec3 sunDirection = normalize(sunPosition - point);
    vec3 sunColor = vec3(1.5, 1.25, 1.0);
    vec3 skyColor = vec3(0.08,0.10,0.14);
    vec3 indirectColor = vec3(0.04, 0.028, 0.020);
    vec3 fireFlyColor = vec3(0.698, 0.956, 0.145);


    //get the soft shadow and subsurface amounts
    float sunIntensity;


    if(dot(normal, sunDirection) >= 0.0) {
        sunIntensity = clamp(dot(normal, sunDirection), 0.0, 1.0);
    }
    else {
        sunIntensity = 0.0;
    }


    //make sun brighter at noon
    sunIntensity = sunIntensity * clamp(sunPosition.y/80.0, 0.0, 1.0);
    float skyIntensity = clamp(0.5 + 0.5*normal.y, 0.0, 1.0);

    //decrease skyintesity at night

    //vec3 indirectDirection = normalize(sunDirection * vec3(-1.0, 0.0, -1.0));
    vec3 indirectDirection = normalize(vec3(0.2, 0.0, 1.0));
    float indirectIntensity = clamp(dot(normal, indirectDirection), 0.0, 1.0);

    //tone down indirect at night
    indirectIntensity = indirectIntensity * (1.0 - night);

    //make sun redder at sunrise/sunset
    sunColor.r = max(sunColor.r * 3.0 * (dawn*0.8 + sunset), sunColor.r);
    if(hour < 5.0) {
       sunIntensity = 0.0;
    }


    //get firefly intensity
    //float fireflyIntesnity = getFireFlyLightIntensity(point, normal, sdfIndex);


    vec3 intensity = sunIntensity*sunColor
                    + skyIntensity * skyColor
                    + indirectIntensity * indirectColor;
//                    + fireflyIntesnity * fireFlyColor;


    color = color * intensity;

}




////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////// Lighting ////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
void initTiming() {
    hour = 18.0;
    ///night
    if(hour >= 19.0 || hour < 5.0) {
        night  = 1.0;
        dawn   = 0.0;
        noon   = 0.0;
        sunset = 0.0;
   }
   //night to dawn
    if(hour >= 5.0 && hour < 7.0) {
        night  = (7.0 - hour) / 2.0;
        dawn   = (hour - 5.0) / 2.0;
        noon   = 0.0;
        sunset = 0.0;
    }
   //dawn to noo
    if(hour >= 7.0 && hour < 10.0) {
        night  = 0.0;
        dawn   = (10.0 - hour) / 3.0;
        noon   = (hour - 7.0) / 3.0;
        sunset = 0.0;
    }
    //noon
    if(hour >= 10.0 && hour < 15.0) {
        night  = 0.0;
        dawn   = 0.0;
        noon   = 1.0;
        sunset = 0.0;
   }
   //noon to sunset
    if(hour >= 15.0 && hour < 17.0) {
        night  = 0.0;
        dawn   = 0.0;
        noon   = (17.0 - hour) / 2.0;
        sunset = (hour - 15.0) / 2.0;
    }
    //sunset to evening
    if(hour >= 17.0 && hour < 19.0) {
        night  = (hour - 17.0) / 2.0;
        dawn   = 0.0;
        noon   = 0.0;
        sunset = (19.0 - hour) / 2.0;
    }

}




void main() {
   initTiming();
   out_Col = vec4(backgroundColor(), 1.0);
}


