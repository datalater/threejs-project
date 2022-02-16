import * as THREE from 'three'
import * as dat from 'lil-gui'
import { fullscreen, updateCanvas } from '@utils/eventFunctions'
import { eventCleanStore } from '@store'
import { three } from '@utils'

export default function draw(canvas) {
  /**
   * Debug
   */
  const gui = new dat.GUI()
  gui.close()

  const parameters = {
    materialColor: '#ffeded',
  }

  gui.addColor(parameters, 'materialColor').onChange(() => {
    material.color.set(parameters.materialColor)
  })

  // Scene
  const scene = new THREE.Scene()

  /**
   * Objects
   */
  // Texture
  const textureLoader = new THREE.TextureLoader()
  const gradientTexture = textureLoader.load('textures/gradients/3.jpg')
  gradientTexture.magFilter = THREE.NearestFilter

  // Material
  const material = new three.MeshToonMaterial({
    color: parameters.materialColor,
    gradientMap: gradientTexture,
  })

  // Meshes
  const mesh1 = three.mesh(new three.TorusGeometry(1, 0.4, 16, 60), material)
  const mesh2 = three.mesh(new three.ConeGeometry(1, 2, 32), material)
  const mesh3 = three.mesh(
    new three.TorusKnotGeometry(0.8, 0.35, 100, 16),
    material
  )
  scene.add(mesh1, mesh2, mesh3)

  // Meshes gap
  const objectsDistance = 4
  mesh1.position.y = -objectsDistance * 0
  mesh2.position.y = -objectsDistance * 1
  mesh3.position.y = -objectsDistance * 2

  /**
   * Lights
   */
  const directionalLight = new THREE.DirectionalLight('#ffffff', 1)
  directionalLight.position.set(1, 1, 0)
  scene.add(directionalLight)

  /**
   * Sizes
   */
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  }

  /**
   * Camera
   */
  // Base camera
  const camera = new THREE.PerspectiveCamera(
    35,
    sizes.width / sizes.height,
    0.1,
    100
  )
  camera.position.z = 6
  scene.add(camera)

  const guiCamera = gui.addFolder('Camera')
  guiCamera.add(camera.position, 'x').min(-3).max(3).step(0.01).name('cameraX')
  guiCamera.add(camera.position, 'y').min(-3).max(3).step(0.01).name('cameraY')
  guiCamera.add(camera.position, 'z').min(0).max(10).step(0.01).name('cameraZ')

  /**
   * Renderer
   */
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
  })
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  /**
   * Animate
   */
  const clock = new THREE.Clock()

  const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
  }

  tick()

  window.addEventListener('resize', updateCanvas(sizes, camera, renderer))
  window.addEventListener('dblclick', fullscreen(canvas))

  eventCleanStore.push(
    ...[
      () => window.removeEventListener('resize', updateCanvas),
      () => window.removeEventListener('dblclick', fullscreen),
    ]
  )

  return canvas
}
