import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';
import { fullscreen, updateCanvas } from '../../utils/eventFunctions';
import { eventCleanStore } from '@store';
import * as dat from 'lil-gui';

export default function draw(canvas) {
  /**
   * Debug
   */
  const gui = new dat.GUI();
  gui.close();

  const parameters = {
    color: 0x00eeff,
  };

  // Scene
  const scene = new THREE.Scene();

  /**
   * Object
   */
  // const geometry = new THREE.BoxGeometry(1, 1, 1);
  const geometry = new THREE.SphereGeometry(1, 16, 16);
  const material = new THREE.MeshBasicMaterial({
    color: parameters.color,
    wireframe: true,
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const guiMesh = gui.addFolder('Mesh');
  guiMesh.add(mesh.position, 'x').min(-3).max(3).step(0.01);
  guiMesh.add(mesh.position, 'y').min(-3).max(3).step(0.01);
  guiMesh.add(mesh.position, 'z').min(-3).max(3).step(0.01);
  guiMesh.add(material, 'wireframe');
  guiMesh.addColor(parameters, 'color').onChange(() => {
    material.color.set(parameters.color);
  });

  /**
   * Sizes
   */
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  /**
   * Camera
   */
  // Base camera
  const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
  );
  camera.position.z = 7;
  scene.add(camera);

  const guiCamera = gui.addFolder('Camera');
  guiCamera.add(camera.position, 'x').min(-3).max(3).step(0.01).name('cameraX');
  guiCamera.add(camera.position, 'y').min(-3).max(3).step(0.01).name('cameraY');
  guiCamera.add(camera.position, 'z').min(0).max(10).step(0.01).name('cameraZ');

  // Controls
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  /**
   * Helpers
   */
  const axesHelper = new THREE.AxesHelper(2);
  scene.add(axesHelper);

  const gridHelper = new THREE.GridHelper(5, 10);
  scene.add(gridHelper);

  /**
   * Renderer
   */
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
  });
  renderer.setSize(sizes.width, sizes.height);

  /**
   * Animate
   */
  const clock = new THREE.Clock();

  gsap.to(camera.position, { duration: 1, z: 3 });
  gsap.to(camera.position, {
    duration: 1,
    delay: 0.7,
    x: 2.04,
    y: 1.53,
    z: 2.75,
  });

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    // mesh.rotation.x = elapsedTime;
    mesh.rotation.y = elapsedTime * 0.2;

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
  };

  tick();

  window.addEventListener('resize', updateCanvas(sizes, camera, renderer));
  window.addEventListener('dblclick', fullscreen(canvas));

  eventCleanStore.push(
    () => window.removeEventListener('resize', updateCanvas),
    () => window.removeEventListener('dblclick', fullscreen),
    () => gui.destroy()
  );

  return canvas;
}
