//import * as THREE from 'three';
import alphaTexture from '../assets/textures/UV_Grid_Sm.jpg';
import alphaMale from '../assets/obj/female02/female02.obj';
import { CSS3DObject, CSS3DRenderer } from 'three-css3drenderer';
var THREE = require('three');
var OBJLoader = require('three-obj-loader');

export default (scene,scene2) => {

    let object;

    var material = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true, wireframeLinewidth: 1, side: THREE.DoubleSide } );    

    function createPlane( width, height, cssColor, pos, rot ) {
        var element = document.createElement( 'div' );
        element.style.width = width + 'px';
        element.style.height = height + 'px';
        element.style.opacity = 0.75;
        element.style.background = cssColor;
        var object = new CSS3DObject( element );
        object.position.copy( pos );
        object.rotation.copy( rot );
        scene2.add( object );
        var geometry = new THREE.PlaneBufferGeometry( width, height );
        var mesh = new THREE.Mesh( geometry, material );
        mesh.position.copy( object.position );
        mesh.rotation.copy( object.rotation );
        scene.add( mesh );
    }

    init();

    function init() {
        // left
        createPlane( 100, 100, 'chocolate', new THREE.Vector3( - 50, 0, 0 ), new THREE.Euler( 0, - 90 * THREE.Math.DEG2RAD, 0 ) );
        // right
        createPlane( 100, 100, 'saddlebrown', new THREE.Vector3(  0, 0, 50 ), new THREE.Euler( 0, 0, 0 ) );
        // top
        createPlane( 100, 100, 'yellowgreen', new THREE.Vector3( 0, 50, 0 ), new THREE.Euler( - 90 * THREE.Math.DEG2RAD, 0, 0 ) );
        // left2
        createPlane( 100, 100, 'rosybrown', new THREE.Vector3(   50, 0, 0 ), new THREE.Euler( 0, - 90 * THREE.Math.DEG2RAD, 0 ) );
        // right2
        createPlane( 100, 100, 'firebrick', new THREE.Vector3(  0, 0, -50 ), new THREE.Euler( 0, 0, 0 ) );
        // bottom
        createPlane( 300, 300, 'seagreen', new THREE.Vector3( 0, - 50, 0 ), new THREE.Euler( - 90 * THREE.Math.DEG2RAD, 0, 0 ) );     
    }
                
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