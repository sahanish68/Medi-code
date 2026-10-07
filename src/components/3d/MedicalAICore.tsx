"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface MedicalAICoreProps {
  isProcessing?: boolean;
  size?: number;
  className?: string;
  mode?: "hero" | "processing" | "compact";
}

export function MedicalAICore({
  isProcessing = false,
  size = 400,
  className = "",
  mode = "hero"
}: MedicalAICoreProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch {
      setWebglSupported(false);
      return;
    }

    const width = container.clientWidth || size;
    const height = container.clientHeight || size;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = mode === "compact" ? 7 : 6;

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 3. Core Holographic Sphere (Outer shell)
    const sphereGeo = new THREE.IcosahedronGeometry(1.8, 4);
    const sphereMat = new THREE.MeshPhysicalMaterial({
      color: 0x06b6d4,
      emissive: 0x0284c7,
      emissiveIntensity: 0.35,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.85,
      ior: 1.3,
      thickness: 0.8,
      transparent: true,
      opacity: 0.65,
      wireframe: false
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(sphereMesh);

    // Inner Wireframe Grid Shell
    const wireGeo = new THREE.IcosahedronGeometry(1.82, 2);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.25
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    scene.add(wireMesh);

    // 4. DNA Helix Inside Core
    const dnaGroup = new THREE.Group();
    const dnaPoints: THREE.Vector3[] = [];
    const dnaColors: number[] = [];
    const count = 40;
    const radius = 0.7;
    const heightSpan = 2.4;

    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 4;
      const y = (i / count - 0.5) * heightSpan;
      
      // Strand 1
      const x1 = Math.cos(t) * radius;
      const z1 = Math.sin(t) * radius;
      dnaPoints.push(new THREE.Vector3(x1, y, z1));

      // Strand 2
      const x2 = Math.cos(t + Math.PI) * radius;
      const z2 = Math.sin(t + Math.PI) * radius;
      dnaPoints.push(new THREE.Vector3(x2, y, z2));
    }

    const dnaGeo = new THREE.BufferGeometry().setFromPoints(dnaPoints);
    const dnaMat = new THREE.PointsMaterial({
      color: 0x22d3ee,
      size: 0.08,
      transparent: true,
      opacity: 0.95
    });
    const dnaParticles = new THREE.Points(dnaGeo, dnaMat);
    dnaGroup.add(dnaParticles);
    scene.add(dnaGroup);

    // 5. Scanning Rings
    const ringGeo1 = new THREE.TorusGeometry(2.2, 0.015, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.7
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    scene.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(2.5, 0.01, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x14b8a6,
      transparent: true,
      opacity: 0.5
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    scene.add(ring2);

    // 6. Neural Data Particles Cloud
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 5;
      particlePositions[i + 1] = (Math.random() - 0.5) * 5;
      particlePositions[i + 2] = (Math.random() - 0.5) * 5;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x7dd3fc,
      size: 0.05,
      transparent: true,
      opacity: 0.6
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 7. Lighting
    const ambientLight = new THREE.AmbientLight(0x0f172a, 2.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x38bdf8, 4, 10);
    pointLight1.position.set(3, 3, 3);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x10b981, 3, 10);
    pointLight2.position.set(-3, -2, -2);
    scene.add(pointLight2);

    // Mouse interactive target
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX = x * 0.8;
      mouseY = y * 0.8;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Resize listener
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Rotation speeds
      const speedMult = isProcessing ? 2.5 : 1;

      sphereMesh.rotation.y = elapsedTime * 0.2 * speedMult;
      wireMesh.rotation.y = -elapsedTime * 0.15 * speedMult;

      dnaGroup.rotation.y = elapsedTime * 0.4 * speedMult;
      dnaGroup.rotation.x = Math.sin(elapsedTime * 0.5) * 0.1;

      ring1.rotation.z = elapsedTime * 0.3 * speedMult;
      ring1.rotation.x = Math.PI / 3 + Math.sin(elapsedTime * 0.8) * 0.15;

      ring2.rotation.z = -elapsedTime * 0.25 * speedMult;

      particleSystem.rotation.y = elapsedTime * 0.08;

      // Pulse effects on processing
      if (isProcessing) {
        const pulse = Math.sin(elapsedTime * 8) * 0.08 + 1;
        sphereMesh.scale.set(pulse, pulse, pulse);
        wireMesh.scale.set(pulse * 1.01, pulse * 1.01, pulse * 1.01);
        sphereMat.emissiveIntensity = 0.6 + Math.sin(elapsedTime * 6) * 0.3;
      } else {
        const floatY = Math.sin(elapsedTime * 1.5) * 0.15;
        sphereMesh.position.y = floatY;
        wireMesh.position.y = floatY;
        dnaGroup.position.y = floatY;
      }

      // Parallax response to mouse
      scene.rotation.y = targetX * 0.4;
      scene.rotation.x = -targetY * 0.4;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      dnaGeo.dispose();
      dnaMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, [isProcessing, mode, size]);

  if (!webglSupported) {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <div className="relative h-64 w-64 rounded-full bg-gradient-to-tr from-cyan-500/20 via-teal-500/30 to-blue-600/20 p-1 backdrop-blur-xl animate-pulse">
          <div className="h-full w-full rounded-full border border-cyan-400/40 bg-slate-950/80 flex items-center justify-center">
            <div className="h-40 w-40 rounded-full border-2 border-dashed border-cyan-400 animate-spin-slow flex items-center justify-center">
              <span className="text-3xl font-extrabold text-cyan-400">AI</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative cursor-grab active:cursor-grabbing ${className}`}
      style={{ width: "100%", height: "100%", minHeight: `${size}px` }}
    />
  );
}
