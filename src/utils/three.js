import * as THREE from 'three'

const three = {
  ...THREE,
  mesh: (geometry, material) => new THREE.Mesh(geometry, material),
}

export default three
