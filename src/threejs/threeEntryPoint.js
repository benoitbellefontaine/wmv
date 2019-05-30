import React, { useState, useEffect, useRef } from 'react';
import SceneManager from './SceneManager';

import alphaTexture from '../assets/textures/UV_Grid_Sm.jpg';
import alphaMale from '../assets/obj/districts/male02.obj';

var THREE = require('three');
var OBJLoader = require('three-obj-loader');
OBJLoader(THREE);

export default (container,id,district,root) => {

        let canvas = createCanvas(document, container);
        let sceneManager = SceneManager(canvas, id, district, root);

        //useEffect(() => console.log('mounted'), []);

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