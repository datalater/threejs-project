import "./Fullscreen.style.scss";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";
import gsap from "gsap";

export default function Fullscreen({ $target }) {
  const $section = document.createElement("section");
  $section.classList.add("fullscreen");

  const $article = document.createElement("article");
  $article.classList.add("fullscreen__article");

  const canvas = document.createElement("canvas");
  canvas.classList.add("fullscreen__canvas");

  this.render = () => {
    this.renderContent();
    this.renderCanvas();

    $target.appendChild($section);
  };

  this.renderContent = () => {
    $article.innerHTML = `
      <span class="fullscreen__text">"Double click to toggle fullscreen"</span>
    `;

    $section.appendChild($article);
  };

  this.renderCanvas = () => {
    /**
     * Debug
     */
    const gui = new dat.GUI();
    gui.close();

    const parameters = {
      color: 0x00eeff,
    };

    gui.addColor(parameters, "color").onChange(() => {
      material.color.set(parameters.color);
    });

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

    gui.add(mesh.position, "y").min(-3).max(3).step(0.01).name("meshY");
    gui.add(material, "wireframe");

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

    gui.add(camera.position, "z").min(0).max(10).step(0.01).name("cameraZ");
    gui.add(camera.position, "x").min(-3).max(3).step(0.01).name("cameraX");
    gui.add(camera.position, "y").min(-3).max(3).step(0.01).name("cameraY");

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

    mesh.quaternion;

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

    window.addEventListener("resize", () => {
      // Update sizes
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      // Update camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    window.addEventListener("dblclick", () => {
      const fullscreenElement =
        document.fullscreenElement || document.webkitFullscreenElement;

      if (fullscreenElement) {
        document.exitFullscreen
          ? document.exitFullscreen()
          : document.webkitFullscreenElement
          ? document.webkitExitFullscreen()
          : null;
        return;
      }

      canvas.requestFullscreen
        ? canvas.requestFullscreen()
        : canvas.webkitRequestFullscreen
        ? canvas.webkitRequestFullscreen()
        : null;
    });

    $section.appendChild(canvas);
  };

  this.render();
}
