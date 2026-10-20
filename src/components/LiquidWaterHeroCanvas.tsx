"use client";

import React, { useEffect, useRef } from "react";

interface WaveNode {
  x: number;
  y: number;
  baseY: number;
  vy: number;
  targetY: number;
}

interface WaveLayer {
  color: string;
  crestColor?: string;
  baseHeightRatio: number;
  amplitude: number;
  frequency: number;
  speed: number;
  phase: number;
  spring: number;
  damping: number;
  spread: number;
  nodes: WaveNode[];
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  speed: number;
  color: string;
}

export const LiquidWaterHeroCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.offsetHeight || 750);

    // Track mouse coordinates & velocity
    const mouse = {
      x: -1000,
      y: -1000,
      prevX: -1000,
      prevY: -1000,
      vx: 0,
      vy: 0,
      speed: 0,
      isHovered: false,
      lastSpawn: 0,
    };

    const ripples: Ripple[] = [];
    const NUM_NODES = 42; // Number of fluid spring nodes per wave

    // Palette matching retro wavy sunset luxury tones
    const layerConfigs = [
      {
        color: "#780838", // Deep Wine Magenta
        crestColor: "rgba(255, 120, 180, 0.25)",
        baseHeightRatio: 0.16,
        amplitude: 28,
        frequency: 0.0018,
        speed: 0.0018,
        spring: 0.022,
        damping: 0.93,
        spread: 0.22,
      },
      {
        color: "#b80c55", // Hot Fuchsia
        crestColor: "rgba(255, 180, 220, 0.3)",
        baseHeightRatio: 0.28,
        amplitude: 34,
        frequency: 0.0022,
        speed: -0.002,
        spring: 0.024,
        damping: 0.94,
        spread: 0.24,
      },
      {
        color: "#c4103f", // Deep Crimson
        crestColor: "rgba(255, 200, 150, 0.35)",
        baseHeightRatio: 0.42,
        amplitude: 38,
        frequency: 0.0019,
        speed: 0.0023,
        spring: 0.025,
        damping: 0.94,
        spread: 0.25,
      },
      {
        color: "#f25420", // Vivid Electric Tangerine
        crestColor: "rgba(255, 240, 180, 0.45)",
        baseHeightRatio: 0.58,
        amplitude: 42,
        frequency: 0.0024,
        speed: -0.0021,
        spring: 0.026,
        damping: 0.93,
        spread: 0.26,
      },
      {
        color: "#9b0e4a", // Deep Rich Magenta
        crestColor: "rgba(255, 150, 200, 0.3)",
        baseHeightRatio: 0.72,
        amplitude: 36,
        frequency: 0.002,
        speed: 0.0019,
        spring: 0.025,
        damping: 0.94,
        spread: 0.24,
      },
      {
        color: "#f55923", // Vivid Flame Orange
        crestColor: "rgba(255, 255, 255, 0.4)",
        baseHeightRatio: 0.86,
        amplitude: 32,
        frequency: 0.0026,
        speed: -0.0024,
        spring: 0.028,
        damping: 0.94,
        spread: 0.25,
      },
      {
        color: "#ba0d57", // Foreground Hot Fuchsia Crimson
        crestColor: "rgba(255, 200, 220, 0.35)",
        baseHeightRatio: 0.94,
        amplitude: 24,
        frequency: 0.003,
        speed: 0.0022,
        spring: 0.03,
        damping: 0.95,
        spread: 0.26,
      },
    ];

    let waves: WaveLayer[] = [];

    const initWaves = () => {
      width = canvas.width = canvas.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.offsetHeight || 750;

      waves = layerConfigs.map((cfg, idx) => {
        const nodes: WaveNode[] = [];
        const step = width / (NUM_NODES - 1);
        const baseH = height * cfg.baseHeightRatio;

        for (let i = 0; i < NUM_NODES; i++) {
          nodes.push({
            x: i * step,
            y: baseH,
            baseY: baseH,
            vy: 0,
            targetY: baseH,
          });
        }

        return {
          ...cfg,
          phase: idx * 1.2,
          nodes,
        };
      });
    };

    initWaves();

    const handleResize = () => {
      initWaves();
    };

    window.addEventListener("resize", handleResize);

    // Mouse listeners on parent container
    const parent = canvas.parentElement || document.body;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;

      if (mouse.prevX !== -1000) {
        mouse.vx = currentX - mouse.prevX;
        mouse.vy = currentY - mouse.prevY;
        mouse.speed = Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy);
      }

      mouse.x = currentX;
      mouse.y = currentY;
      mouse.prevX = currentX;
      mouse.prevY = currentY;
      mouse.isHovered = true;

      // Spawn water ripple droplet on movement
      const now = performance.now();
      if (mouse.speed > 3 && now - mouse.lastSpawn > 65) {
        mouse.lastSpawn = now;
        ripples.push({
          x: currentX,
          y: currentY,
          radius: 8,
          maxRadius: Math.min(220, 70 + mouse.speed * 4),
          alpha: Math.min(0.7, 0.2 + mouse.speed * 0.015),
          speed: 2.8 + mouse.speed * 0.08,
          color: "rgba(255, 230, 200,",
        });
      }
    };

    const onMouseEnter = () => {
      mouse.isHovered = true;
    };

    const onMouseLeave = () => {
      mouse.isHovered = false;
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.prevX = -1000;
      mouse.prevY = -1000;
    };

    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Big water splash ripple on click
      for (let i = 0; i < 3; i++) {
        ripples.push({
          x: clickX,
          y: clickY,
          radius: 12 + i * 15,
          maxRadius: 260 + i * 40,
          alpha: 0.8 - i * 0.15,
          speed: 3.8 + i * 1.2,
          color: "rgba(255, 255, 255,",
        });
      }

      // Splash impulse onto waves directly
      waves.forEach((wave) => {
        wave.nodes.forEach((node) => {
          const dx = node.x - clickX;
          const dist = Math.abs(dx);
          if (dist < 260) {
            const force = (1 - dist / 260) * 45;
            node.vy += (node.y > clickY ? force : -force);
          }
        });
      });
    };

    // Touch support for mobile / tablets
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        const currentX = touch.clientX - rect.left;
        const currentY = touch.clientY - rect.top;

        if (mouse.prevX !== -1000) {
          mouse.vx = currentX - mouse.prevX;
          mouse.vy = currentY - mouse.prevY;
          mouse.speed = Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy);
        }

        mouse.x = currentX;
        mouse.y = currentY;
        mouse.prevX = currentX;
        mouse.prevY = currentY;
        mouse.isHovered = true;

        const now = performance.now();
        if (now - mouse.lastSpawn > 80) {
          mouse.lastSpawn = now;
          ripples.push({
            x: currentX,
            y: currentY,
            radius: 10,
            maxRadius: 180,
            alpha: 0.6,
            speed: 3.2,
            color: "rgba(255, 240, 210,",
          });
        }
      }
    };

    const onTouchEnd = () => {
      mouse.isHovered = false;
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.prevX = -1000;
      mouse.prevY = -1000;
    };

    // ResizeObserver for reliable dimension tracking
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        initWaves();
      });
      resizeObserver.observe(parent);
    }

    parent.addEventListener("mousemove", onMouseMove);
    parent.addEventListener("mouseenter", onMouseEnter);
    parent.addEventListener("mouseleave", onMouseLeave);
    parent.addEventListener("click", onClick);
    parent.addEventListener("touchmove", onTouchMove, { passive: true });
    parent.addEventListener("touchend", onTouchEnd);

    let time = 0;

    // Render loop
    const render = () => {
      time += 1;

      // Base background: Warm Flame Red
      ctx.fillStyle = "#f04e23";
      ctx.fillRect(0, 0, width, height);

      // Decay mouse speed
      mouse.speed *= 0.92;

      // Update and draw each fluid wave layer
      waves.forEach((wave) => {
        // 1. Natural idle harmonic breathing
        wave.phase += wave.speed;
        const nodes = wave.nodes;
        const len = nodes.length;

        for (let i = 0; i < len; i++) {
          const node = nodes[i];
          const harmonic =
            Math.sin(node.x * wave.frequency + wave.phase) * wave.amplitude +
            Math.cos(node.x * wave.frequency * 0.5 + wave.phase * 0.7) * (wave.amplitude * 0.4);

          node.targetY = node.baseY + harmonic;

          // 2. Mouse Water Displacement (Surface tension push/pull)
          if (mouse.isHovered) {
            const dx = node.x - mouse.x;
            const dy = node.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const radius = 180;

            if (dist < radius) {
              const normalDist = 1 - dist / radius;
              // Push waves down or pull up dynamically with fluid velocity
              const pushForce =
                Math.sin(normalDist * Math.PI) * (mouse.speed * 0.75 + 14);
              const direction = dy < 0 ? -1 : 1;
              node.vy += direction * pushForce * wave.spring * 1.8;
            }
          }

          // 3. Spring physics (Hooke's Law + damping)
          const displacement = node.targetY - node.y;
          node.vy += displacement * wave.spring;
          node.vy *= wave.damping;
          node.y += node.vy;
        }

        // 4. Wave Neighbor Spread (Simulating water molecular surface tension)
        // Repeat spread passes for smooth liquid ripple propagation
        const leftDeltas = new Float32Array(len);
        const rightDeltas = new Float32Array(len);

        for (let j = 0; j < 3; j++) {
          for (let i = 0; i < len; i++) {
            if (i > 0) {
              leftDeltas[i] = wave.spread * (nodes[i].y - nodes[i - 1].y);
              nodes[i - 1].vy += leftDeltas[i];
            }
            if (i < len - 1) {
              rightDeltas[i] = wave.spread * (nodes[i].y - nodes[i + 1].y);
              nodes[i + 1].vy += rightDeltas[i];
            }
          }
          for (let i = 0; i < len; i++) {
            if (i > 0) nodes[i - 1].y += leftDeltas[i];
            if (i < len - 1) nodes[i + 1].y += rightDeltas[i];
          }
        }

        // 5. Draw fluid curve
        ctx.beginPath();
        ctx.moveTo(0, height);
        ctx.lineTo(nodes[0].x, nodes[0].y);

        // Smooth Bezier spline through water nodes
        for (let i = 0; i < len - 1; i++) {
          const current = nodes[i];
          const next = nodes[i + 1];
          const xc = (current.x + next.x) / 2;
          const yc = (current.y + next.y) / 2;
          ctx.quadraticCurveTo(current.x, current.y, xc, yc);
        }

        const last = nodes[len - 1];
        ctx.lineTo(last.x, last.y);
        ctx.lineTo(width, height);
        ctx.closePath();

        ctx.fillStyle = wave.color;
        ctx.fill();

        // 6. Draw glowing liquid water crest sheen along the edge
        if (wave.crestColor) {
          ctx.beginPath();
          ctx.moveTo(nodes[0].x, nodes[0].y);
          for (let i = 0; i < len - 1; i++) {
            const current = nodes[i];
            const next = nodes[i + 1];
            const xc = (current.x + next.x) / 2;
            const yc = (current.y + next.y) / 2;
            ctx.quadraticCurveTo(current.x, current.y, xc, yc);
          }
          ctx.lineTo(last.x, last.y);
          ctx.strokeStyle = wave.crestColor;
          ctx.lineWidth = 2.5;
          ctx.stroke();
        }
      });

      // 7. Render dynamic expanding water ripples (Rippling droplet rings)
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += r.speed;
        r.alpha *= 0.955;

        ctx.save();
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `${r.color}${r.alpha.toFixed(3)})`;
        ctx.lineWidth = Math.max(1, 3.5 * (1 - r.radius / r.maxRadius));
        ctx.shadowColor = "rgba(255, 255, 255, 0.4)";
        ctx.shadowBlur = 8;
        ctx.stroke();
        ctx.restore();

        if (r.alpha < 0.01 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (resizeObserver) resizeObserver.disconnect();
      parent.removeEventListener("mousemove", onMouseMove);
      parent.removeEventListener("mouseenter", onMouseEnter);
      parent.removeEventListener("mouseleave", onMouseLeave);
      parent.removeEventListener("click", onClick);
      parent.removeEventListener("touchmove", onTouchMove);
      parent.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "block",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
};
