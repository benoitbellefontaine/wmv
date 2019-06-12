//import * as THREE from 'three';
//import PCDLoader from '../loaders/PCDLoader';
import simple from './Zaghetto.pcd';

var THREE = require('three');
var PCDLoader = require('../loaders/PCDLoader');
PCDLoader(THREE);

export default (scene) => {

    // instantiate a loader
    var loader = new THREE.PCDLoader();

    // load a resource
    loader.load( simple, function ( points ) {
        scene.add( points );
        var center = points.geometry.boundingSphere.center;
        //controls.target.set( center.x, center.y, center.z );
        //controls.update();
    } );
                
    function update(time) {
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
