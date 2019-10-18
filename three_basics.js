// Initialize webGL
const canvas = document.getElementById("mycanvas");
const renderer = new THREE.WebGLRenderer({canvas:canvas});
renderer.setClearColor('white');    // set background color

// Create a new Three.js scene with camera and light
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, canvas.width / canvas.height, 0.1, 1000 );
camera.position.set(0,0,3);
camera.lookAt(scene.position);   // camera looks at origin

const spotLight = new THREE.SpotLight("white");
spotLight.position.set(5,6,7);
scene.add(spotLight);


// Create geometry
const geo = new THREE.Geometry();
geo.vertices[0] = new THREE.Vector3(-1,1,0);
geo.vertices[1] = new THREE.Vector3(-1,-1,0);
geo.vertices[2] = new THREE.Vector3(1,-1,0);
geo.vertices[3] = new THREE.Vector3(1,1,0);
geo.faces[0] = new THREE.Face3(0,1,2);
geo.faces[1] = new THREE.Face3(0,2,3);

//const geo2 = new THREE.TeapotBufferGeometry(1);

// material specifies how triangle looks like
const mat = new THREE.MeshPhongMaterial({color: "green",
                                         wireframe:true,
                                         wireframeLinewidth:2,} );

// Combine geometry and material to a new object:
const obj = new THREE.Mesh(geo, mat);
obj.position.x=1.3;
obj.position.
scene.add(obj);

const axes = new THREE.AxesHelper();
scene.add(axes);

// Draw everything
const controls = new THREE.TrackballControls( camera, canvas);
function render() {
  requestAnimationFrame(render);

  controls.update();
  renderer.render(scene, camera);
}
render();
