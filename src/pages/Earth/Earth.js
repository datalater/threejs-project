import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";

export default function Earth({ $target }) {
  const canvas = document.createElement("canvas");

  this.render = () => {
    /**
     * Debug
     */
    const gui = new dat.GUI();
    gui.close();

    const parameters = {
      color: 0xff0000,
    };

    gui.addColor(parameters, "color").onChange(() => {
      material.color.set(parameters.color);
    });

    // Scene
    const scene = new THREE.Scene();

    /**
     * Object
     */
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    // const geometry = new THREE.SphereGeometry(1, 16, 16);
    const material = new THREE.MeshBasicMaterial({ color: parameters.color });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    gui.add(mesh.position, "y").min(-3).max(3).step(0.01).name("elevation");
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
    camera.position.z = 3;
    scene.add(camera);

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

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

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

    $target.appendChild(canvas);
  };

  this.render();
}
