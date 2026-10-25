"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface Hero3DProps {
  primaryColor?: string;
  accentColor?: string;
  speed?: number;
}

export default function Hero3DScene({
  primaryColor = "#1D4ED8",
  accentColor = "#06B6D4",
  speed = 1.0,
}: Hero3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    // Check reduced motion preference
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReducedMotion(mediaQuery.matches);
    }

    if (!containerRef.current) return;
    const container = containerRef.current;

    // Detect WebGL
    try {
      const testCanvas = document.createElement("canvas");
      const gl =
        testCanvas.getContext("webgl") ||
        testCanvas.getContext("experimental-webgl");
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch {
      setWebglSupported(false);
      return;
    }

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 18);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // 2. Quantum Orbital & Molecular Crystal Structure
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Core Nucleus / Center Sphere
    const coreGeometry = new THREE.IcosahedronGeometry(1.6, 2);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(primaryColor),
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    rootGroup.add(coreMesh);

    // Inner Glowing Particle
    const innerLightGeom = new THREE.SphereGeometry(0.7, 16, 16);
    const innerLightMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(accentColor),
    });
    const innerLight = new THREE.Mesh(innerLightGeom, innerLightMat);
    rootGroup.add(innerLight);

    // Three Tilted Orbital Rings (Physics / Bohr Model representation)
    const ringMaterials = [
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(accentColor),
        transparent: true,
        opacity: 0.6,
      }),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(primaryColor),
        transparent: true,
        opacity: 0.5,
      }),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#6366F1"),
        transparent: true,
        opacity: 0.45,
      }),
    ];

    const ringRadii = [3.8, 5.2, 6.6];
    const ringTilts = [
      { x: Math.PI / 4, y: Math.PI / 6 },
      { x: -Math.PI / 3, y: Math.PI / 4 },
      { x: Math.PI / 2.5, y: -Math.PI / 5 },
    ];

    const rings: THREE.Line[] = [];
    ringRadii.forEach((radius, idx) => {
      const ringGeom = new THREE.BufferGeometry();
      const points: THREE.Vector3[] = [];
      const segments = 64;
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        points.push(
          new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius)
        );
      }
      ringGeom.setFromPoints(points);
      const ring = new THREE.Line(ringGeom, ringMaterials[idx]);
      ring.rotation.x = ringTilts[idx].x;
      ring.rotation.y = ringTilts[idx].y;
      rootGroup.add(ring);
      rings.push(ring);
    });

    // Molecular Valence Nodes (Electron / Lattice cloud)
    const particleCount = 120;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color(accentColor);
    const c2 = new THREE.Color(primaryColor);

    for (let i = 0; i < particleCount; i++) {
      const radius = 3.5 + Math.random() * 5.0;
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const sinPhi = Math.sin(phi);

      particlePositions[i * 3] = radius * sinPhi * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * sinPhi * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);

      const lerped = Math.random() > 0.5 ? c1 : c2;
      colors[i * 3] = lerped.r;
      colors[i * 3 + 1] = lerped.g;
      colors[i * 3 + 2] = lerped.b;
    }

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    rootGroup.add(particles);

    // Interactive pointer response
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 0.8;
      targetY = y * 0.8;
    };

    window.addEventListener("mousemove", onPointerMove);

    // Handle Window Resize
    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", onResize);

    // 3. Animation Loop with Framerate & Visibility Guard
    let animationFrameId: number;
    let clock = new THREE.Clock();
    let isVisible = true;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const delta = clock.getDelta();
      const currentSpeed = speed * delta;

      // Smooth mouse follow
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      rootGroup.rotation.y += 0.25 * currentSpeed;
      rootGroup.rotation.x = mouseY * 0.5;
      rootGroup.rotation.z = mouseX * 0.5;

      // Pulse and spin rings individually
      rings.forEach((ring, idx) => {
        ring.rotation.z += (idx % 2 === 0 ? 0.3 : -0.3) * currentSpeed;
      });

      // Subtle breath on core
      const scale = 1 + Math.sin(clock.getElapsedTime() * 1.5) * 0.05;
      coreMesh.scale.set(scale, scale, scale);

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on unmount
    return () => {
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);

      coreGeometry.dispose();
      coreMaterial.dispose();
      innerLightGeom.dispose();
      innerLightMat.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [primaryColor, accentColor, speed]);

  // Fallback if WebGL unavailable or user prefers reduced motion
  if (!webglSupported || reducedMotion) {
    return (
      <div className="w-full h-full flex items-center justify-center p-8 bg-surface-dark rounded-2xl relative overflow-hidden">
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full max-w-[340px] text-accent-cyan opacity-80"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          {/* Scientific Orbital SVG Fallback */}
          <circle cx="200" cy="200" r="140" strokeDasharray="4 4" className="opacity-40" />
          <ellipse cx="200" cy="200" rx="160" ry="60" transform="rotate(30 200 200)" />
          <ellipse cx="200" cy="200" rx="160" ry="60" transform="rotate(-45 200 200)" />
          <ellipse cx="200" cy="200" rx="160" ry="60" transform="rotate(75 200 200)" />
          <circle cx="200" cy="200" r="28" fill="#1D4ED8" className="opacity-80" />
          <circle cx="200" cy="200" r="12" fill="#06B6D4" />
          <circle cx="340" cy="200" r="6" fill="#06B6D4" />
          <circle cx="80" cy="130" r="5" fill="#6366F1" />
          <circle cx="270" cy="320" r="5" fill="#1D4ED8" />
        </svg>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[380px] lg:min-h-[520px] relative cursor-grab active:cursor-grabbing"
      aria-label="3D Quantum Orbital & Science Visualization"
    />
  );
}
