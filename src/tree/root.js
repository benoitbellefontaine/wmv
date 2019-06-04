import * as THREE from 'three';

export default (function () {

    var instance;

    function createInstance( params ) {
        var geometry = new THREE.BoxBufferGeometry( params.dim[0],params.dim[1],params.dim[2]);
        var material = new THREE.MeshNormalMaterial({color:'0x0000ff'});
        var root = new THREE.Mesh( geometry, material );
        root.name = params.name;
        root.position.set(params.pos[0],params.pos[1],params.pos[2]);
        return root;
    }

    return {
        getInstance: function ( params ) {
            if (!instance) {
                instance = createInstance( params );
            }
            return instance;
        }
    }

})();