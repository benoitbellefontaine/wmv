import * as THREE from 'three'
import alphaTexture from '../assets/textures/stripes_gradient.jpg';

export default scene => {

    const group = new THREE.Group();

    var position = 1;

    var body_geometry = new THREE.BoxBufferGeometry( 2, 3, 1 );
    var material = new THREE.MeshNormalMaterial();

    var root = new THREE.Mesh( body_geometry, material );
    root.position.x = 0;
    scene.add( root );


    var arm_geometry = new THREE.BoxBufferGeometry( 0.5, 1.5, 0.5 );
    var larm_geometry = new THREE.BoxBufferGeometry( 0.5, 1.5, 0.5 );
    
    var object, parent = root;

    // right arm
    object = new THREE.Mesh( arm_geometry, material );
    object.position.x = 1.5;
    object.position.y = .5;
    parent.add( object );
    // right lower arm
    object = new THREE.Mesh( arm_geometry, material );
    object.position.x = 1.5;
    object.position.y = -1;
    parent.add( object );
    
    // left arm
    object = new THREE.Mesh( arm_geometry, material );
    object.position.x = -1.5;
    object.position.y = .5;
    parent.add( object );

    parent = root;

    function update(time) {

        var time = Date.now() * 0.001;
        var rx = Math.sin( time * 0.7 ) * 0.2;
        var ry = Math.sin( time * 0.3 ) * 0.1;
        var rz = Math.sin( time * 0.2 ) * 0.1;

        root.traverse( function ( object ) {
            object.rotation.x = rx;
            object.rotation.y = ry;
            object.rotation.z = rz;
        } );

    }

    return {
        update
    }
}