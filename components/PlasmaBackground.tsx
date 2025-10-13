"use client";

import { useEffect, useRef } from "react";

export default function PlasmaBackground({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const speedRef = useRef(0.12);

  useEffect(() => {
    const cnv = canvasRef.current;
    if (!cnv) return;
    const glCtx = cnv.getContext("webgl");
    if (!glCtx) return;
    const gl = glCtx as WebGLRenderingContext;

    const DPR = Math.min(2, window.devicePixelRatio || 1);
    const canvas = cnv as HTMLCanvasElement;
    function resize() {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(w * DPR));
      canvas.height = Math.max(1, Math.floor(h * DPR));
      gl.viewport(0, 0, canvas.width, canvas.height);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(cnv);

    const vert = `
      attribute vec2 a_pos;
      void main(){ gl_Position = vec4(a_pos, 0.0, 1.0); }
    `;

    const frag = `
      precision highp float;
      uniform vec2 u_res;
      uniform float u_time;
      uniform float u_speed;
      // Gold palette
      vec3 palette(float t){
        vec3 a = vec3(0.18, 0.14, 0.02);
        vec3 b = vec3(0.85, 0.73, 0.23);
        vec3 c = vec3(0.98, 0.82, 0.35);
        vec3 d = vec3(0.15, 0.25, 0.10);
        return a + b * cos(6.28318 * (c * t + d));
      }
      float noise(vec2 p){ return sin(p.x)*sin(p.y); }
      float fbm(vec2 p){
        float v = 0.0;
        float a = 0.5;
        for(int i=0;i<5;i++){
          v += a * noise(p);
          p *= 2.0;
          a *= 0.5;
        }
        return v;
      }
      void main(){
        vec2 uv = (gl_FragCoord.xy / u_res.xy) * 2.0 - 1.0;
        uv.x *= u_res.x / u_res.y;
        float t = u_time * u_speed;
        // swirl domain warp
        vec2 q = uv;
        float n = fbm(q * 1.2 + t * 0.4);
        q += vec2(n, -n);
        float n2 = fbm(q * 2.2 - t * 0.2);
        float v = 0.5 + 0.5 * sin(3.0 * n2 + t * 0.6);
        vec3 col = mix(vec3(0.05,0.05,0.06), palette(v), 0.8);
        // subtle vignette
        float r = length(uv);
        col *= smoothstep(1.1, 0.2, r);
        gl_FragColor = vec4(col, 1.0);
      }
    `;

    function compile(type: number, src: string) {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(s));
      }
      return s;
    }
    const vs = compile(gl.VERTEX_SHADER, vert);
    const fs = compile(gl.FRAGMENT_SHADER, frag);
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const aPos = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uSpeed = gl.getUniformLocation(prog, "u_speed");

    let start = performance.now();
    let raf = 0;
    function render(now: number){
      const t = (now - start) * 0.001;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, t);
      gl.uniform1f(uSpeed, speedRef.current);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(render);
    }
    raf = requestAnimationFrame(render);

    // Scroll-linked speed (slight increase while scrolling)
    let target = 0.12;
    let lastY = window.scrollY;
    const onScroll = () => {
      const dy = Math.abs(window.scrollY - lastY);
      lastY = window.scrollY;
      const boost = Math.min(0.25, dy / 2000);
      target = 0.12 + boost;
    };
    const onTick = () => {
      speedRef.current += (target - speedRef.current) * 0.08;
      requestAnimationFrame(onTick);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onTick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className={className} />;
}


