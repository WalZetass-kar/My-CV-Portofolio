import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, RotateCw, Layers, ShieldCheck } from 'lucide-react';

export const Hero3DCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shapeType, setShapeType] = useState<'torusKnot' | 'icosahedron' | 'wireframeCube'>('torusKnot');
  const [isRotating, setIsRotating] = useState(true);
  const [fps, setFps] = useState(60);

  const shapeTypeRef = useRef(shapeType);
  shapeTypeRef.current = shapeType;
  const isRotatingRef = useRef(isRotating);
  isRotatingRef.current = isRotating;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;

    // Clear existing canvas
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // Group for main geometry
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Create Geometries
    const torusKnotGeo = new THREE.TorusKnotGeometry(1.2, 0.35, 128, 32);
    const icosahedronGeo = new THREE.IcosahedronGeometry(1.6, 1);
    const cubeGeo = new THREE.BoxGeometry(2, 2, 2);

    // Material with Emerald / Glass Metallic theme
    const mainMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#10b981'),
      emissive: new THREE.Color('#064e3b'),
      roughness: 0.15,
      metalness: 0.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9,
      wireframe: false,
    });

    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#34d399'),
      wireframe: true,
      transparent: true,
      opacity: 0.65
    });

    let currentMesh: THREE.Mesh = new THREE.Mesh(torusKnotGeo, mainMaterial);
    let wireMesh: THREE.Mesh = new THREE.Mesh(torusKnotGeo, wireframeMaterial);
    wireMesh.scale.set(1.05, 1.05, 1.05);

    mainGroup.add(currentMesh);
    mainGroup.add(wireMesh);

    // Outer Orbiting Wireframe Rings
    const ringGeo1 = new THREE.TorusGeometry(2.6, 0.02, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: '#10b981', transparent: true, opacity: 0.4 });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    mainGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(3.1, 0.015, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: '#06b6d4', transparent: true, opacity: 0.3 });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    mainGroup.add(ring2);

    // Orbiting Floating 3D Cubes
    const smallCubesGroup = new THREE.Group();
    const smallCubeGeo = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    const smallCubeMat = new THREE.MeshStandardMaterial({
      color: '#34d399',
      metalness: 0.9,
      roughness: 0.1
    });

    const numCubes = 12;
    for (let i = 0; i < numCubes; i++) {
      const smallCube = new THREE.Mesh(smallCubeGeo, smallCubeMat);
      const angle = (i / numCubes) * Math.PI * 2;
      const radius = 2.8 + Math.sin(i) * 0.4;
      smallCube.position.set(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 1.5,
        Math.sin(angle) * radius
      );
      smallCubesGroup.add(smallCube);
    }
    mainGroup.add(smallCubesGroup);

    // Particle Stars
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 12;
      positions[i + 1] = (Math.random() - 0.5) * 12;
      positions[i + 2] = (Math.random() - 0.5) * 12;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: '#10b981',
      size: 0.04,
      transparent: true,
      opacity: 0.6
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 2.0);
    mainLight.position.set(5, 5, 5);
    scene.add(mainLight);

    const emeraldPointLight = new THREE.PointLight(0x10b981, 4, 10);
    emeraldPointLight.position.set(-3, 2, 3);
    scene.add(emeraldPointLight);

    const cyanPointLight = new THREE.PointLight(0x06b6d4, 3, 10);
    cyanPointLight.position.set(3, -2, -2);
    scene.add(cyanPointLight);

    // Mouse Move Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      mouseX = (x / rect.width - 0.5) * 2;
      mouseY = (y / rect.height - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationFrameId: number;
    let lastTime = performance.now();
    let frameCount = 0;

    const updateMeshGeometry = () => {
      let geo: THREE.BufferGeometry;
      switch (shapeTypeRef.current) {
        case 'icosahedron':
          geo = icosahedronGeo;
          break;
        case 'wireframeCube':
          geo = cubeGeo;
          break;
        case 'torusKnot':
        default:
          geo = torusKnotGeo;
          break;
      }
      if (currentMesh.geometry !== geo) {
        currentMesh.geometry = geo;
        wireMesh.geometry = geo;
      }
    };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // FPS counter
      const now = performance.now();
      frameCount++;
      if (now - lastTime >= 1000) {
        setFps(frameCount);
        frameCount = 0;
        lastTime = now;
      }

      updateMeshGeometry();

      // Mouse Lerp Smooth Movement
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      if (isRotatingRef.current) {
        mainGroup.rotation.y += 0.008;
        mainGroup.rotation.x += 0.004;
        ring1.rotation.z += 0.006;
        ring2.rotation.z -= 0.005;
        smallCubesGroup.rotation.y -= 0.012;
      }

      // Parallax effect with mouse
      mainGroup.rotation.y = targetX * 0.6 + (isRotatingRef.current ? mainGroup.rotation.y : 0);
      mainGroup.rotation.x = -targetY * 0.6 + (isRotatingRef.current ? mainGroup.rotation.x : 0);

      // Subtle levitation
      mainGroup.position.y = Math.sin(now * 0.0015) * 0.15;

      particles.rotation.y = now * 0.0001;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      torusKnotGeo.dispose();
      icosahedronGeo.dispose();
      cubeGeo.dispose();
      mainMaterial.dispose();
      wireframeMaterial.dispose();
      ringGeo1.dispose();
      ringGeo2.dispose();
      ringMat1.dispose();
      ringMat2.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[380px] sm:h-[460px] lg:h-[500px] flex items-center justify-center">
      {/* 3D WebGL Canvas Viewport */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing rounded-3xl overflow-hidden border border-slate-200/60 bg-gradient-to-b from-slate-900/5 via-emerald-500/5 to-slate-900/5 backdrop-blur-sm shadow-xl"
      />

      {/* Interactive Floating Control Overlay */}
      <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 flex flex-wrap items-center justify-between gap-2 p-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-lg text-xs">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 font-mono font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            3D WebGL Engine
          </span>
          <span className="hidden sm:inline-block text-slate-400 font-mono">
            {fps} FPS
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setShapeType('torusKnot')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              shapeType === 'torusKnot'
                ? 'bg-emerald-500 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
            }`}
          >
            Torus
          </button>
          <button
            type="button"
            onClick={() => setShapeType('icosahedron')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              shapeType === 'icosahedron'
                ? 'bg-emerald-500 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
            }`}
          >
            Crystal
          </button>
          <button
            type="button"
            onClick={() => setShapeType('wireframeCube')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              shapeType === 'wireframeCube'
                ? 'bg-emerald-500 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
            }`}
          >
            Cube
          </button>

          <button
            type="button"
            onClick={() => setIsRotating(!isRotating)}
            title="Toggle Spin"
            className={`p-1.5 rounded-lg border transition-all ${
              isRotating
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600'
                : 'border-slate-200 text-slate-400 hover:text-slate-600'
            }`}
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
};
