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
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
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
  if (absd > 0.15) {
    gl_FragColor = vec4(bg, 1.0);
    return;
  }

  float angle = atan(delta.y, delta.x);

  /* ribbon */
  float thickness = 0.035 + 0.006 * sin(t * 0.4);
  float ribbon = 1.0 - smoothstep(0.0, thickness, absd);
  float glow = exp(-absd * 12.0) * 0.35;

  /* color — single-octave noise instead of turbulence */
  float cp = angle * 1.2 + t * 0.15;
  float n = noise(vec2(angle * 3.0, t * 0.3)) * 0.5;
  vec3 iriCol = iridescence(cp + n, t * 0.2);
  iriCol += noise(vec2(angle * 8.0 - t * 0.5, d * 60.0)) * 0.2 * ribbon;

  /* secondary arc */
  float d2 = d + 0.07 + 0.005 * sin(t * 0.6);
  float absd2 = abs(d2);
  float ribbon2 = 1.0 - smoothstep(0.0, 0.012, absd2);
  float glow2 = exp(-absd2 * 18.0) * 0.15;
  vec3 iriCol2 = iridescence(cp + 1.5 + n, t * 0.25 + 1.0);

  /* compose */
  vec3 col = bg;
  col = mix(col, mix(iriCol * 1.2 + 0.1, iriCol, uDark), ribbon + glow);
  col = mix(col, mix(iriCol2 * 1.2 + 0.1, iriCol2, uDark), ribbon2 + glow2);

  /* sparkles — reduced to 6 */
  float sparkle = 0.0;
  for (int i = 0; i < 6; i++) {
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
  }

  col += sparkle * vec3(1.0, 0.7, 0.85) * 1.5;

  /* ambient glow */
  col += vec3(0.5, 0.2, 0.4) * exp(-absd * 4.0) * 0.06;

  /* smooth fade to background near cutoff edge */
  col = mix(col, bg, smoothstep(0.1, 0.15, absd));

  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
