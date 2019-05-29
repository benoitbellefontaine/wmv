import * as THREE from 'three'
import alphaTexture from '../assets/textures/stripes_gradient.jpg';

export default scene => {

    const group = new THREE.Group();

    var position = 1;

    var geometry = new THREE.BoxBufferGeometry( position, position, position );
    var material = new THREE.MeshNormalMaterial();

    var root = new THREE.Mesh( geometry, material );
    root.position.x = 0;
    scene.add( root );

    var amount = 200, object, parent = root;

    for ( var i = 0; i < amount; i ++ ) {
        object = new THREE.Mesh( geometry, material );
        object.position.x = position;
        parent.add( object );
        parent = object;
    }

    parent = root;

    for ( var i = 0; i < amount; i ++ ) {
        object = new THREE.Mesh( geometry, material );
        object.position.x = - position;
        parent.add( object );
        parent = object;
    }

    parent = root;

    for ( var i = 0; i < amount; i ++ ) {
        object = new THREE.Mesh( geometry, material );
        object.position.y = - position;
        parent.add( object );
        parent = object;
    }

    parent = root;

    for ( var i = 0; i < amount; i ++ ) {
        object = new THREE.Mesh( geometry, material );
        object.position.y = position;
        parent.add( object );
        parent = object;
    }

    parent = root;

    for ( var i = 0; i < amount; i ++ ) {
        object = new THREE.Mesh( geometry, material );
        object.position.z = - position;
        parent.add( object );
        parent = object;
    }

    parent = root;

    for ( var i = 0; i < amount; i ++ ) {
        object = new THREE.Mesh( geometry, material );
        object.position.z = position;
        parent.add( object );
        parent = object;
    }

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

        //const angle = time*speed;

        //group.rotation.y = angle;

        //planeMaterial.alphaMap.offset.y = 0.55 + time * textureOffsetSpeed;

        //subjectWireframe.material.color.setHSL( Math.sin(angle*2), 0.5, 0.5 );
        
        //const scale = (Math.sin(angle*8)+6.4)/5;
        //subjectWireframe.scale.set(scale, scale, scale)
    }

    return {
        update
    }
}