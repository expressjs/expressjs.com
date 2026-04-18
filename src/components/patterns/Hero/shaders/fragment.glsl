precision mediump float;
varying vec2 vUv;
uniform float uTime;
uniform vec2 uRes;
uniform float uDark;

#define PI 3.14159265359

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1, 0)), f.x),
    mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x),
    f.y
  );
}

float turbulence(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 3; i++) {
    v += a * noise(p);
    p = mat2(0.877, 0.479, -0.479, 0.877) * p * 2.0;
    a *= 0.5;
  }
  return v;
}

vec3 iridescence(float t, float shift) {
  float phase = t * 6.2831 + shift;
  vec3 c = vec3(
    0.75 + 0.5 * sin(phase),
    0.5 + 0.5 * sin(phase + 2.094),
    0.5 + 0.5 * sin(phase + 4.189)
  ) * vec3(1.0, 0.25, 0.7) + vec3(0.25, 0.05, 0.18);
  float lum = dot(c, vec3(0.299, 0.587, 0.114));
  return mix(mix(vec3(lum), c, 0.5), vec3(1.0), 0.2);
}

void main() {
  vec2 uv = vUv;
  float t = uTime;
  float aspect = uRes.x / uRes.y;
  vec2 p = vec2((uv.x - 0.5) * aspect, uv.y - 0.5);
  vec2 center = vec2(aspect * 1.1, -0.5 - aspect * 1.8);
  float radius = aspect * 2.0 + 0.8;

  vec2 delta = p - center;
  float d = length(delta) - radius;
  float absd = abs(d);

  /* early exit: skip expensive work far from the arc */
  vec3 bg = mix(vec3(1.0), vec3(0.0), uDark);
  if (absd > 0.3) {
    gl_FragColor = vec4(bg, 1.0);
    return;
  }

  float angle = atan(delta.y, delta.x);

  /* ribbon */
  float thickness = 0.035 + 0.006 * sin(t * 0.4);
  float ribbon = 1.0 - smoothstep(0.0, thickness, absd);
  float glow = exp(-absd * 12.0) * 0.35;

  /* color — use 3-octave turbulence */
  float cp = angle * 1.2 + t * 0.15;
  float n = turbulence(vec2(angle * 3.0, t * 0.3)) * 0.6;
  vec3 iriCol = iridescence(cp + n, t * 0.2);
  iriCol += turbulence(vec2(angle * 8.0 - t * 0.5, d * 60.0)) * 0.2 * ribbon;

  /* secondary arc */
  float d2 = d + 0.07 + 0.005 * sin(t * 0.6);
  float ribbon2 = 1.0 - smoothstep(0.0, 0.012, abs(d2));
  float glow2 = exp(-abs(d2) * 18.0) * 0.15;
  vec3 iriCol2 = iridescence(cp + 1.5 + n, t * 0.25 + 1.0);

  /* compose */
  vec3 col = bg;
  col = mix(col, mix(iriCol * 1.2 + 0.1, iriCol, uDark), ribbon + glow);
  col = mix(col, mix(iriCol2 * 1.2 + 0.1, iriCol2, uDark), ribbon2 + glow2);

  /* sparkle + dark particles */
  float sparkle = 0.0, darkSparkle = 0.0;
  for (int i = 0; i < 30; i++) {
    float fi = float(i);
    float seed = hash(vec2(fi, fi * 0.7));
    float pAngle = seed * PI * 0.8 + 1.8;
    float pRadius = radius + (hash(vec2(fi * 1.3, 0.0)) - 0.5) * 0.08;
    vec2 pos = center + pRadius * vec2(cos(pAngle), sin(pAngle))
      + vec2(sin(t * (0.2 + seed * 0.3) + fi), cos(t * (0.15 + seed * 0.2) + fi * 1.3)) * 0.01;
    float dist = length(p - pos);
    float br = sin(t * (1.0 + seed * 2.0) + fi * 2.5) * 0.5 + 0.5;
    br *= br;
    sparkle += br * smoothstep(0.001 + seed * 0.002, 0.0, dist);

    if (i < 20) {
      float ds = hash(vec2(fi * 3.7, fi * 1.1 + 50.0));
      float da = ds * PI * 0.8 + 1.8;
      float dr = radius + (hash(vec2(fi * 2.1, 10.0)) - 0.5) * 0.12;
      vec2 dp = center + dr * vec2(cos(da), sin(da))
        + vec2(sin(t * (0.1 + ds * 0.2) + fi * 0.8), cos(t * (0.08 + ds * 0.15) + fi * 1.1)) * 0.015;
      float dd = length(p - dp);
      float db = sin(t * (0.5 + ds * 1.5) + fi * 3.0) * 0.5 + 0.5;
      db *= db;
      darkSparkle += db * smoothstep(0.001 + ds * 0.003, 0.0, dd);
    }
  }

  col += sparkle * vec3(1.0, 0.7, 0.85) * 1.5;
  col = mix(col, bg * 0.15, clamp(darkSparkle, 0.0, 1.0));

  /* ambient glow */
  col += vec3(0.5, 0.2, 0.4) * exp(-absd * 4.0) * 0.06;

  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
