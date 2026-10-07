"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Lock, ShieldCheck, Key } from "lucide-react";

export function SecurityVault3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 350;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Outer Encrypted Vault Cube
    const cubeGeo = new THREE.BoxGeometry(2.2, 2.2, 2.2);
    const cubeMat = new THREE.MeshPhysicalMaterial({
      color: 0x0284c7,
      emissive: 0x0369a1,
      emissiveIntensity: 0.25,
      roughness: 0.1,
      transmission: 0.9,
      thickness: 0.5,
      transparent: true,
      opacity: 0.5
    });
    const cubeMesh = new THREE.Mesh(cubeGeo, cubeMat);
    scene.add(cubeMesh);

    // Inner Glowing Encrypted Core
    const innerGeo = new THREE.OctahedronGeometry(1.0, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.8
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerMesh);

    // Orbiting Shield Security Rings
    const ringGeo1 = new THREE.TorusGeometry(2.6, 0.012, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.7 });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 4;
    scene.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(2.9, 0.012, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.5 });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 3;
    scene.add(ring2);

    // Encrypted Data Particles
    const count = 70;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 3.5;
      particlePositions[i + 1] = (Math.random() - 0.5) * 3.5;
      particlePositions[i + 2] = (Math.random() - 0.5) * 3.5;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x34d399,
      size: 0.05,
      transparent: true,
      opacity: 0.8
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Lights
    const pointLight = new THREE.PointLight(0x38bdf8, 4, 10);
    pointLight.position.set(3, 3, 3);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0x0f172a, 2);
    scene.add(ambientLight);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      cubeMesh.rotation.x = elapsed * 0.15;
      cubeMesh.rotation.y = elapsed * 0.2;

      innerMesh.rotation.x = -elapsed * 0.3;
      innerMesh.rotation.y = -elapsed * 0.4;

      ring1.rotation.z = elapsed * 0.25;
      ring2.rotation.z = -elapsed * 0.2;

      particles.rotation.y = elapsed * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      cubeGeo.dispose();
      cubeMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 dark:border-emerald-500/20 bg-white/90 dark:bg-slate-950/80 p-6 sm:p-8 shadow-xl backdrop-blur-2xl transition-colors duration-300">
      <div className="grid gap-8 lg:grid-cols-12 items-center">
        {/* Left Info & Certifications */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/40 px-3.5 py-1 text-xs font-bold text-emerald-800 dark:text-emerald-400">
            <Lock size={14} /> PRIVACY & DATA PROTECTION VAULT
          </div>

          <h2 className="text-3xl font-extrabold sm:text-4xl text-slate-900 dark:text-white">
            Your Medical Information <br />
            <span className="text-gradient-teal">Stays Entirely Protected</span>
          </h2>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            MediDecode employs client-first isolation, zero-persistence raw image buffers, and encrypted local storage architecture so your confidential medical documents are never exposed.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-4">
              <div className="flex items-center gap-2.5 text-cyan-700 dark:text-cyan-400 font-bold text-sm">
                <ShieldCheck size={18} /> Zero Data Persistence
              </div>
              <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400">
                Uploaded doctor notes are processed in memory and discarded immediately after OCR analysis.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-4">
              <div className="flex items-center gap-2.5 text-emerald-700 dark:text-emerald-400 font-bold text-sm">
                <Key size={18} /> Controlled Session Access
              </div>
              <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400">
                Encrypted auth session keys enforce strict row-level security across all personal prescriptions.
              </p>
            </div>
          </div>
        </div>

        {/* Right 3D Vault Object */}
        <div className="lg:col-span-5 relative flex items-center justify-center min-h-[320px]">
          <div ref={containerRef} className="h-80 w-full cursor-grab active:cursor-grabbing" />
          <div className="absolute bottom-2 rounded-full bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-emerald-500/30 px-3 py-1 text-[11px] font-mono font-bold text-emerald-700 dark:text-emerald-400 backdrop-blur-md shadow-xs">
            ENCRYPTION: ACTIVE (AES-256-GCM)
          </div>
        </div>
      </div>
    </div>
  );
}
