import React, { useState, useEffect, useRef } from 'react';
import SceneManager from './SceneManager';

import alphaTexture from '../assets/textures/UV_Grid_Sm.jpg';
import alphaMale from '../assets/obj/male02/male02.obj';

var THREE = require('three');
var OBJLoader = require('three-obj-loader');
OBJLoader(THREE);

export default (container,id,district) => {

    /*function loadObjects(d,cb) {
        let object;
        console.log('STEP 1');
        function loadModel() {
            object.traverse( function ( child ) {
                if ( child.isMesh ) child.material.map = texture;
            } );
            object.position.y = - 95;
            //scene.add( object );
            //return object;
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
        function onError() { console.log('ONERROR') }
        var loader = new THREE.OBJLoader( manager );
        console.log('loading', d);
        loader.load( d, function ( obj ) {
            object = obj;
            //return object;
        }, onProgress, onError );
        cb(object)
    }
    
    loadObjects(alphaMale,

    function(object) {*/

        //console.log('STEP 2');
        //console.log( 'ONJECT: ', object );

        let canvas = createCanvas(document, container);
        let sceneManager = SceneManager(canvas, id, district);

        //useEffect(() => console.log('mounted'), []);

        console.log( '%%%%%%%%%%%%%%%%%%%%district: ', district );

        let canvasHalfWidth;
        let canvasHalfHeight;

        bindEventListeners();
        render();

        function createCanvas(document, container) {
            const canvas = document.createElement('canvas');     
            container.appendChild(canvas);
            return canvas;
        }

        function bindEventListeners() {
            window.onresize = resizeCanvas;
            window.onmousemove = mouseMove;
            resizeCanvas(); 
        }

        function resizeCanvas() {
            canvas.style.width = '100%';
            canvas.style.height= '100%';
            
            canvas.width  = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;

            canvasHalfWidth = Math.round(canvas.offsetWidth/2);
            canvasHalfHeight = Math.round(canvas.offsetHeight/2);

            sceneManager.onWindowResize()
        }

        function mouseMove({screenX, screenY}) {
            sceneManager.onMouseMove(screenX-canvasHalfWidth, screenY-canvasHalfHeight);
        }

        function render(time) {
            requestAnimationFrame(render);
            sceneManager.update();
        }

    //});
    return sceneManager;

}