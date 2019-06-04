import React from 'react';
import * as THREE from 'three';

class Tree extends React.Component {
    render () {
        return (
            <div>hello</div>
        );
    }
}

var Root = (function () {

    var instance;

    function createInstance( params ) {
        var geometry = new THREE.BoxBufferGeometry( params.dim[0],params.dim[1],params.dim[2]);
        var material = new THREE.MeshNormalMaterial();
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

var Switch = (function () {

    var instance;

    function createInstance( params ) {
        var geometry = new THREE.SphereBufferGeometry(params.dim[0],params.dim[1],params.dim[2]);
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

var Hotspot = (function () {

    var instance;

    function createInstance( params ) {
        var geometry = new THREE.SphereBufferGeometry(params.dim[0],params.dim[1],params.dim[2]);
        var material = new THREE.MeshNormalMaterial();
        var hs = new THREE.Mesh( geometry, material );
        hs.name = params.name;
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

var Link = (function () {

    var instance;

    function createInstance( params ) {
        var geometry = new THREE.SphereBufferGeometry(params.dim[0],params.dim[1],params.dim[2]);
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

export default { Tree, Root, Switch, Hotspot, Link };
