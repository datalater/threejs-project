export const updateCanvas = (sizes, camera, renderer) => () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
};

export const fullscreen = (canvas) => () => {
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
};
