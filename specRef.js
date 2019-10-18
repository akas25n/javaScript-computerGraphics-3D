/**
* calculate specular reflection
* @param {Vector3} incoming vector
* @param {Vector3} normal vector
* @returns {Vector3} outgoing vector
*/
function specRef(vin, n){
    const n2 = n.clone();
    n2.normalize();
    let ret = vin.clone();
    const f = 2 * n2.dot(vin);
    ret.sub(n2.multiplyScalar(f));
    return ret;
}