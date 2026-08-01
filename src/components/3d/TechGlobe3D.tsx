import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Globe, MousePointer, Cpu } from 'lucide-react';

interface TechNode {
  name: string;
  lat: number;
  lon: number;
  category: string;
  color: string;
}

const defaultTechNodes: TechNode[] = [
  { name: 'React.js', lat: 30, lon: 45, category: 'Frontend', color: '#61dafb' },
  { name: 'TypeScript', lat: 45, lon: -60, category: 'Language', color: '#3178c6' },
  { name: 'Node.js', lat: -20, lon: 120, category: 'Backend', color: '#68a063' },
  { name: 'Tailwind', lat: 60, lon: 10, category: 'Styling', color: '#38bdf8' },
  { name: 'Python AI', lat: -35, lon: -80, category: 'AI/ML', color: '#f59e0b' },
  { name: 'PostgreSQL', lat: -10, lon: -30, category: 'Database', color: '#336791' },
  { name: 'Docker', lat: 15, lon: -140, category: 'DevOps', color: '#2496ed' },
  { name: 'GraphQL', lat: 50, lon: 140, category: 'API', color: '#e535ab' },
  { name: 'Gemini AI', lat: -50, lon: 40, category: 'AI Model', color: '#10b981' },
  { name: 'Next.js', lat: 10, lon: 90, category: 'Framework', color: '#000000' }
];

export const TechGlobe3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTech, setActiveTech] = useState<TechNode | null>(defaultTechNodes[0]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const width = container.clientWidth || 380;
    const height = container.clientHeight || 380;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 4.8;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Main Sphere Wireframe
    const sphereGeo = new THREE.IcosahedronGeometry(1.7, 3);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: 0.25
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    globeGroup.add(sphereMesh);

    // Inner Core Glow Sphere
    const innerGeo = new THREE.SphereGeometry(1.55, 32, 32);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x064e3b,
      transparent: true,
      opacity: 0.15
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    globeGroup.add(innerMesh);

    // Orbit Rings
    const ringGeo = new THREE.TorusGeometry(2.1, 0.012, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.5 });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    ring1.rotation.x = Math.PI / 2.5;
    globeGroup.add(ring1);

    const ring2 = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.35 }));
    ring2.rotation.y = Math.PI / 3;
    globeGroup.add(ring2);

    // Add Tech Node Points
    const nodeGeo = new THREE.SphereGeometry(0.06, 16, 16);
    
    defaultTechNodes.forEach((node) => {
      const phi = (90 - node.lat) * (Math.PI / 180);
      const theta = (node.lon + 180) * (Math.PI / 180);

      const radius = 1.72;
      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const z = radius * Math.sin(phi) * Math.sin(theta);
      const y = radius * Math.cos(phi);

      const nodeMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(node.color) });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.set(x, y, z);
      globeGroup.add(nodeMesh);

      // Pulse Ring Around Node
      const pRingGeo = new THREE.RingGeometry(0.08, 0.12, 16);
      const pRingMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(node.color), side: THREE.DoubleSide, transparent: true, opacity: 0.6 });
      const pRing = new THREE.Mesh(pRingGeo, pRingMat);
      pRing.position.set(x * 1.02, y * 1.02, z * 1.02);
      pRing.lookAt(0, 0, 0);
      globeGroup.add(pRing);
    });

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    // Drag / Touch Controls
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const deltaMove = {
        x: e.clientX - previousMousePosition.x,
        y: e.clientY - previousMousePosition.y
      };

      globeGroup.rotation.y += deltaMove.x * 0.008;
      globeGroup.rotation.x += deltaMove.y * 0.008;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Animation Loop
    let animationFrameId: number;
    let indexCycle = 0;
    let lastCycleTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isDragging) {
        globeGroup.rotation.y += 0.005;
        ring1.rotation.z += 0.003;
        ring2.rotation.z -= 0.002;
      }

      // Auto cycle node active highlight every 3 seconds
      const now = performance.now();
      if (now - lastCycleTime > 3000) {
        indexCycle = (indexCycle + 1) % defaultTechNodes.length;
        setActiveTech(defaultTechNodes[indexCycle]);
        lastCycleTime = now;
      }

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

    window.addEventListener('resize', handleResize);

    return () => {
      domEl.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
    };
  }, []);

  return (
    <div
      className="relative w-full h-[320px] sm:h-[380px] rounded-3xl bg-slate-900 border border-slate-800 p-4 flex flex-col items-center justify-between overflow-hidden shadow-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500/10 via-slate-900 to-slate-900 pointer-events-none" />

      {/* Top Badge */}
      <div className="relative z-10 w-full flex items-center justify-between px-2">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
          <Globe className="w-3.5 h-3.5 animate-spin" />
          <span>Interactive 3D Tech Ecosystem</span>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
          <MousePointer className="w-3 h-3 text-emerald-400" />
          <span>Drag to Rotate</span>
        </div>
      </div>

      {/* 3D WebGL Canvas */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing my-auto" />

      {/* Active Node Floating Tooltip */}
      {activeTech && (
        <div className="relative z-10 w-full bg-slate-800/90 backdrop-blur-md border border-slate-700/80 rounded-2xl p-3 flex items-center justify-between transition-all">
          <div className="flex items-center gap-2.5">
            <span
              className="w-3 h-3 rounded-full shadow-lg"
              style={{ backgroundColor: activeTech.color, boxShadow: `0 0 10px ${activeTech.color}` }}
            />
            <div>
              <p className="text-xs font-bold text-white font-mono">{activeTech.name}</p>
              <p className="text-[10px] text-slate-400">{activeTech.category}</p>
            </div>
          </div>
          <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
            Active Ecosystem Node
          </span>
        </div>
      )}
    </div>
  );
};
