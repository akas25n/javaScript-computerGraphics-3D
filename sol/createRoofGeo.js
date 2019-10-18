/**
 * creates a roof geometry object
 * @param{number} l length of roof
 * @param{number} w width of roof
 * @param{number} h height of roof
 * @param{number} frontSlope (optional) slope of front faces
 */
function createRoofGeo(l, w, h, frontSlope=1) {

    const geo = new THREE.Geometry();
  
    geo.vertices[0] = new THREE.Vector3(-w/2, 0, -l/2);
    geo.vertices[1] = new THREE.Vector3(w/2, 0, -l/2);
    geo.vertices[2] = new THREE.Vector3(0, h, -l/2*frontSlope);
    geo.vertices[3] = new THREE.Vector3(-w/2, 0, l/2);
    geo.vertices[4] = new THREE.Vector3(w/2, 0, l/2);
    geo.vertices[5] = new THREE.Vector3(0, h, l/2*frontSlope);
  
    geo.faces[0] = new THREE.Face3(0,2,1);
  
    geo.faces[1] = new THREE.Face3(0,3,2);
    geo.faces[2] = new THREE.Face3(2,3,5);
  
    geo.faces[3] = new THREE.Face3(0,1,4);
    geo.faces[4] = new THREE.Face3(0,4,3);
  
    geo.faces[5] = new THREE.Face3(1,2,5);
    geo.faces[6] = new THREE.Face3(1,5,4);
  
    geo.faces[7] = new THREE.Face3(3,4,5);
  
    return geo;
  }