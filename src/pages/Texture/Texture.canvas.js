import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";
import gsap from "gsap";
import { fullscreen, updateCanvas } from "@utils/eventFunctions";
import { eventCleanStore } from "@store";

export default function draw(canvas) {
  /**
   * Debug
   */
  const gui = new dat.GUI();
  gui.close();

  /**
   * Base
   */
  // Scene
  const scene = new THREE.Scene();

  /**
   * Texture
   */
  const loadingManager = new THREE.LoadingManager();
  loadingManager.onProgress = (item, loaded, total) => {
    console.log(`${item}: ${loaded}/${total}`);
  };
  const textureLoader = new THREE.TextureLoader(loadingManager);

  const texture = {
    door: textureLoader.load("/textures/door/color.jpg"),
    checkerboard: textureLoader.load("/textures/checkerboard-8x8.png"),
    graytile: textureLoader.load(
      "/textures/TilesRectangularMirrorGray001_COL_1K.jpg"
    ),
  };

  texture.checkerboard.minFilter = THREE.NearestFilter;
  texture.checkerboard.magFilter = THREE.NearestFilter;

  /**
   * Object
   */
  const box = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ map: texture.door })
  );
  scene.add(box);

  box.position.y = 0.5;

  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(1, 32, 32),
    new THREE.MeshBasicMaterial({ map: texture.graytile })
  );

  scene.add(sphere);

  sphere.position.x = -1.5;
  sphere.position.y = 1;
  sphere.position.z = -1.5;

  const box2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ map: texture.checkerboard })
  );

  scene.add(box2);

  box2.position.x = 1.5;
  box2.position.y = 0.5;
  box2.position.z = -1.5;

  // Box3 ======================================================

  const textureDoor = textureLoader.load("/textures/door/color.jpg");
  textureDoor.wrapS = THREE.RepeatWrapping;
  textureDoor.wrapT = THREE.RepeatWrapping;
  textureDoor.repeat.set(2, 2);

  textureDoor.center.x = 0.5;
  textureDoor.center.y = 0.5;
  textureDoor.rotation = Math.PI * 0.25;

  const box3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ map: textureDoor })
  );

  scene.add(box3);

  box3.position.x = 1;
  box3.position.y = 0.5;
  box3.position.z = -8.5;

  /**
   * Helpers
   */
  const axesHelper = new THREE.AxesHelper(2);
  scene.add(axesHelper);

  const gridHelper = new THREE.GridHelper(5, 10);
  scene.add(gridHelper);

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
  camera.position.x = -0.01;
  camera.position.y = -3.75;
  camera.position.z = 0;
  scene.add(camera);

  const guiCamera = gui.addFolder("Camera");
  guiCamera.add(camera.position, "x").min(-3).max(3).step(0.01).name("cameraX");
  guiCamera.add(camera.position, "y").min(-3).max(3).step(0.01).name("cameraY");
  guiCamera.add(camera.position, "z").min(0).max(10).step(0.01).name("cameraZ");

  // Controls
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  /**
   * Renderer
   */
  const renderer = new THREE.WebGLRenderer({
    canvas,
  });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  /**
   * Animate
   */
  const clock = new THREE.Clock();
  gsap.to(camera.position, { duration: 1, x: 0, y: 0, z: 3 });
  gsap.to(camera.position, {
    duration: 1,
    delay: 0.5,
    y: 2,
    z: 3.75,
  });

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Update controls
    controls.update();

    // Update objects
    box.rotation.y = elapsedTime * 0.01;
    sphere.rotation.y = elapsedTime * 0.5;
    box2.rotation.y = -(elapsedTime * 0.25);
    box3.rotation.y = elapsedTime * 0.3;
    box3.rotation.x = elapsedTime * 0.3;

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
  };

  tick();

  window.addEventListener("resize", updateCanvas(sizes, camera, renderer));
  window.addEventListener("dblclick", fullscreen(canvas));

  eventCleanStore.push(
    ...[
      () => window.removeEventListener("resize", updateCanvas),
      () => window.removeEventListener("dblclick", fullscreen),
    ]
  );

  return canvas;
}
