import * as THREE from 'three';

export default (function () {

    var instance;

    function createInstance( params ) {
        var geometry = new THREE.BoxBufferGeometry(params.dim[0],params.dim[1],params.dim[2]);
        var material = new THREE.MeshNormalMaterial();
        var sw = new THREE.Mesh( geometry, material );
        sw.name = params.name;
        sw.position.set(params.pos[0],params.pos[1],params.pos[2]);
        return sw;
    }

    return {
        getInstance: function ( params ) {
            instance = createInstance( params );
            return instance;
        }
    }

})();