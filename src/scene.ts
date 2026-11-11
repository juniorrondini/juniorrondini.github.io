import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

export function mountScene(
  host: HTMLElement,
  theme: "light" | "dark",
  onReady: () => void,
  onLost: () => void,
): () => void {
  const dark = theme === "dark";
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.65));
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = dark ? 1.1 : 1.35;
  host.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(33, 1, 0.1, 100);
  camera.position.set(0, 0.1, 11.5);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const env = pmrem.fromScene(room, 0.04);
  scene.environment = env.texture;
  const group = new THREE.Group();
  scene.add(group);
  const material = new THREE.MeshPhysicalMaterial({
    color: dark ? 0xa5afa0 : 0x555d54,
    metalness: 0.94,
    roughness: 0.23,
    clearcoat: 0.5,
    clearcoatRoughness: 0.2,
    envMapIntensity: dark ? 1.6 : 2.1,
  });
  const accent = new THREE.MeshStandardMaterial({
    color: dark ? 0xc6f378 : 0xf05533,
    metalness: 0.35,
    roughness: 0.3,
  });
  const j = new THREE.Shape();
  j.moveTo(-1.8, 1.5);
  j.lineTo(-0.16, 1.5);
  j.lineTo(-0.16, -0.65);
  j.quadraticCurveTo(-0.16, -1.6, -1.15, -1.6);
  j.quadraticCurveTo(-2.15, -1.6, -2.15, -0.55);
  j.lineTo(-1.47, -0.55);
  j.quadraticCurveTo(-1.47, -0.97, -1.15, -0.97);
  j.quadraticCurveTo(-0.85, -0.97, -0.85, -0.55);
  j.lineTo(-0.85, 0.85);
  j.lineTo(-1.8, 0.85);
  j.closePath();
  const r = new THREE.Shape();
  r.moveTo(0.18, -1.5);
  r.lineTo(0.18, 1.5);
  r.lineTo(1.25, 1.5);
  r.quadraticCurveTo(2.3, 1.5, 2.3, 0.5);
  r.quadraticCurveTo(2.3, -0.1, 1.65, -0.37);
  r.lineTo(2.45, -1.5);
  r.lineTo(1.62, -1.5);
  r.lineTo(0.88, -0.4);
  r.lineTo(0.88, -1.5);
  r.closePath();
  const hole = new THREE.Path();
  hole.moveTo(0.88, 0.85);
  hole.lineTo(1.25, 0.85);
  hole.quadraticCurveTo(1.6, 0.85, 1.6, 0.52);
  hole.quadraticCurveTo(1.6, 0.18, 1.25, 0.18);
  hole.lineTo(0.88, 0.18);
  hole.closePath();
  r.holes.push(hole);
  const geometries: THREE.BufferGeometry[] = [];
  for (const shape of [j, r]) {
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 0.6,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.09,
      bevelThickness: 0.09,
      curveSegments: 20,
    });
    geometries.push(geometry);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(-0.12, 0, -0.3);
    group.add(mesh);
  }
  const connectorGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.48, 16);
  geometries.push(connectorGeo);
  for (const y of [0.05, 0.36]) {
    const mesh = new THREE.Mesh(connectorGeo, accent);
    mesh.rotation.z = Math.PI / 2;
    mesh.position.set(-0.1, y, 0.08);
    group.add(mesh);
  }
  const boltGeo = new THREE.SphereGeometry(0.055, 12, 8);
  geometries.push(boltGeo);
  for (const [x, y] of [
    [-1.58, 1.19],
    [0.42, 1.18],
  ]) {
    const bolt = new THREE.Mesh(boltGeo, accent);
    bolt.position.set(x, y, 0.4);
    group.add(bolt);
  }
  const key = new THREE.DirectionalLight(0xffffff, dark ? 6 : 4);
  key.position.set(-3, 4, 5);
  scene.add(key);
  const rim = new THREE.DirectionalLight(dark ? 0xd6ff9e : 0xffcab5, 3);
  rim.position.set(3, 1, -2);
  scene.add(rim);
  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  let frame = 0,
    visible = true,
    disposed = false;
  let targetX = -0.16,
    targetY = -0.32,
    rotationX = -0.16,
    rotationY = -0.32;
  group.rotation.set(rotationX, rotationY, -0.12);
  const render = () => {
    frame = 0;
    if (disposed || !visible || document.hidden) return;
    rotationX += (targetX - rotationX) * 0.075;
    rotationY += (targetY - rotationY) * 0.075;
    group.rotation.x = rotationX;
    group.rotation.y = rotationY;
    renderer.render(scene, camera);
    if (Math.abs(targetX - rotationX) + Math.abs(targetY - rotationY) > 0.0003)
      frame = requestAnimationFrame(render);
  };
  const requestRender = () => {
    if (!frame && visible && !disposed) frame = requestAnimationFrame(render);
  };
  const resize = () => {
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    requestRender();
  };
  const move = (event: PointerEvent) => {
    targetY = -0.32 + (event.clientX / window.innerWidth - 0.5) * 0.4;
    targetX = -0.16 + (event.clientY / window.innerHeight - 0.5) * 0.18;
    requestRender();
  };
  const scroll = () => {
    targetX = -0.16 + Math.min(window.scrollY / window.innerHeight, 1) * 0.35;
    requestRender();
  };
  const lost = (event: Event) => {
    event.preventDefault();
    onLost();
    if (frame) cancelAnimationFrame(frame);
  };
  const visibility = () => {
    if (!document.hidden) requestRender();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(host);
  const intersection = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) requestRender();
  });
  intersection.observe(host);
  renderer.domElement.addEventListener("webglcontextlost", lost);
  window.addEventListener("pointermove", move, { passive: true });
  window.addEventListener("scroll", scroll, { passive: true });
  document.addEventListener("visibilitychange", visibility);
  resize();
  renderer.render(scene, camera);
  onReady();
  return () => {
    disposed = true;
    cancelAnimationFrame(frame);
    observer.disconnect();
    intersection.disconnect();
    window.removeEventListener("pointermove", move);
    window.removeEventListener("scroll", scroll);
    document.removeEventListener("visibilitychange", visibility);
    renderer.domElement.removeEventListener("webglcontextlost", lost);
    geometries.forEach((geometry) => geometry.dispose());
    material.dispose();
    accent.dispose();
    env.dispose();
    pmrem.dispose();
    room.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
    renderer.domElement.remove();
  };
}
