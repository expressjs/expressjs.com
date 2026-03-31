import vertexShader from './shaders/vertex.glsl?raw';
import fragmentShader from './shaders/fragment.glsl?raw';

/**
 * Initializes the WebGL hero background on the given canvas.
 *
 * @param canvas - The canvas element to render into.
 * @param reducedMotion - If true, freezes time at 0 (static frame).
 * @returns Controller with play/pause/destroy, or null if WebGL is unavailable.
 */
export function initHeroWebGL(canvas: HTMLCanvasElement, reducedMotion = false) {
  // Attempt to get a WebGL context; return null if unsupported
  const gl = canvas.getContext('webgl', { alpha: false, powerPreference: 'low-power' });
  if (!gl) return null;

  // -- Shader compilation --

  function compile(type: number, src: string) {
    const s = gl!.createShader(type)!;
    gl!.shaderSource(s, src);
    gl!.compileShader(s);
    if (!gl!.getShaderParameter(s, gl!.COMPILE_STATUS)) {
      console.error(gl!.getShaderInfoLog(s));
      gl!.deleteShader(s);
      return null;
    }
    return s;
  }

  const vs = compile(gl.VERTEX_SHADER, vertexShader);
  const fs = compile(gl.FRAGMENT_SHADER, fragmentShader);
  if (!vs || !fs) {
    if (vs) gl.deleteShader(vs);
    if (fs) gl.deleteShader(fs);
    return null;
  }

  // -- Program linking --

  const prog = gl.createProgram()!;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(prog));
    gl.deleteProgram(prog);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    return null;
  }
  gl.useProgram(prog);

  // -- Full-screen quad geometry --
  // 4 vertices at the clip-space corners (-1 to 1) forming a rectangle
  // via TRIANGLE_STRIP, so the fragment shader runs on every pixel.

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(prog, 'aPos');
  gl.enableVertexAttribArray(aPos);
  // Each vertex is 2 floats (x, y), no stride or offset
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  // -- Uniform locations --

  const uTime = gl.getUniformLocation(prog, 'uTime');
  const uRes = gl.getUniformLocation(prog, 'uRes');
  const uDark = gl.getUniformLocation(prog, 'uDark');

  // -- Animation state --

  let animId = 0;
  const t0 = performance.now();
  let running = false;

  /** Checks the current color scheme (data-theme attribute or system preference). */
  function isDark() {
    const theme = document.documentElement.getAttribute('data-theme');
    if (theme) return theme === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  /** Syncs the canvas resolution with its CSS size, accounting for device pixel ratio. */
  function resize() {
    const dpr = Math.min(window.devicePixelRatio, 2);
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
    gl!.viewport(0, 0, canvas.width, canvas.height);
    gl!.uniform2f(uRes, canvas.width, canvas.height);
  }

  /** Draws a single frame and schedules the next via requestAnimationFrame. */
  function render() {
    if (!running) return;
    gl!.uniform1f(uTime, reducedMotion ? 0.0 : (performance.now() - t0) / 1000);
    gl!.uniform1f(uDark, isDark() ? 1.0 : 0.0);
    gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
    // Static frame: stop after the first render
    if (reducedMotion) {
      running = false;
      return;
    }
    animId = requestAnimationFrame(render);
  }

  // Initial sizing + auto-resize on layout changes
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);

  return {
    /** Starts the render loop. No-op if already running. */
    play() {
      if (running) return;
      running = true;
      animId = requestAnimationFrame(render);
    },
    /** Stops the render loop. */
    pause() {
      running = false;
      cancelAnimationFrame(animId);
    },
  };
}
