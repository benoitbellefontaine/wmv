import * as THREE from 'three';

export default (function () {

    var instance;

    function createInstance( params ) {
        var geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3(params.start[0],params.start[1],params.start[2]));
        geometry.vertices.push(new THREE.Vector3(params.end[0],params.end[1],params.end[2]));
        var material = new THREE.MeshPhongMaterial( { color: 0xff0000 } );
        var line = new THREE.Line( geometry, material );
        line.name = params.name;
        line.userData = 'line';
        return line;
    }

    return {
        getInstance: function ( params ) {
            instance = createInstance( params );
            return instance;
        }
    }

})();