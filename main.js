let scene, camera, renderer, cube, animal, controls;

function init() {
  //scene
  scene = new THREE.Scene();
  //camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    5000,
  );

  //renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  //盒模型
  // const geometry = new THREE.BoxGeometry(2, 2, 2);
  // const texture = new THREE.TextureLoader().load('textures/moon.jpg');
  // const material = new THREE.MeshBasicMaterial({ map: texture });
  // cube = new THREE.Mesh(geometry, material);
  // scene.add(cube);

  //light
  const light = new THREE.AmbientLight(0x404040); // soft white light
  scene.add(light);

  const hLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 4);
  scene.add(hLight);

  //
  let loader = new THREE.GLTFLoader();
  loader.load('gltf/scene.gltf', function (gltf) {
    animal = gltf.scene.children[0];
    animal.scale.set(0.5, 0.5, 0.5);
    animal.position.y = -2;
    scene.add(gltf.scene);
    renderer.render(scene, camera);
  });

  camera.position.z = 5;
}

function animate() {
  requestAnimationFrame(animate);
  animal.rotation.x += 0.01;
  animal.rotation.y += 0.01;
  animal.rotation.z += 0.01;
  renderer.render(scene, camera);
}

// function onWindowResize() {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize(window.innerWidth, window.innerHeight);
// }

// window.addEventListener('resize', onWindowResize, false);

init();
animate();
