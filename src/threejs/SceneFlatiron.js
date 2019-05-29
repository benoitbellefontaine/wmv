//import * as THREE from 'three';
import alphaTexture from '../assets/textures/Flatiron_Building_diff.jpg';
import alphaMale from '../assets/obj/flatiron/13943_Flatiron_Building_v1_l1.obj';
var THREE = require('three');
var OBJLoader = require('three-obj-loader');
//OBJLoader(THREE);


export default scene => {

    let object;

    init(scene);

    function init(scene) {
        // manager
        function loadModel() {
            object.traverse( function ( child ) {
                if ( child.isMesh ) child.material.map = texture;
            } );
            object.position.y = - 95;
            scene.add( object );
        }
        var manager = new THREE.LoadingManager( loadModel );
        manager.onProgress = function ( item, loaded, total ) {
            console.log( item, loaded, total );
        };
        // texture
        var textureLoader = new THREE.TextureLoader( manager );
        var texture = textureLoader.load( alphaTexture );
        // model
        function onProgress( xhr ) {
            if ( xhr.lengthComputable ) {
                var percentComplete = xhr.loaded / xhr.total * 100;
                console.log( 'model ' + Math.round( percentComplete, 2 ) + '% downloaded' );
            }
        }
        function onError() {}
        var loader = new THREE.OBJLoader( manager );
        loader.load( alphaMale, function ( obj ) {
            object = obj;
        }, onProgress, onError );
        //
        /*
        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        container.appendChild( renderer.domElement );
        document.addEventListener( 'mousemove', onDocumentMouseMove, false );
        //
        window.addEventListener( 'resize', onWindowResize, false );
        */
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