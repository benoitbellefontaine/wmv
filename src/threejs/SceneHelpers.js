import * as THREE from 'three'

export default scene => {

    var size = 50;
    var divisions = 50;
    
    scene.add( new THREE.AxesHelper( 20 ) );

    scene.add( new THREE.GridHelper( size, divisions ));

    function update(time) {}

    return {
        update
    }
}