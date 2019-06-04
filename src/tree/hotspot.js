import * as THREE from 'three';

export default (function () {

    var instance;

    function createInstance( params ) {
        var geometry = new THREE.SphereBufferGeometry(params.dim[0],params.dim[1],params.dim[2]);
        var material = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
        var hs = new THREE.Mesh( geometry, material );
        hs.name = params.name;
        hs.userData = 'hotspot';
        hs.position.set(params.pos[0],params.pos[1],params.pos[2]);
        return hs;
    }

    return {
        getInstance: function ( params ) {
            instance = createInstance( params );
            return instance;
        }
    }

})();