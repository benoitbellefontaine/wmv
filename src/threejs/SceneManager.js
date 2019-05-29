//import * as THREE from 'three';
import SceneSubject from './SceneSubject';
import ScenePlane from './ScenePlane';
import SceneHierarchy from './SceneHierarchy';
import SceneHelpers from './SceneHelpers';
import SceneMale from './SceneMale';
import SceneFemale from './SceneFemale';
import SceneFlatiron from './SceneFlatiron';
import GeneralLights from './GeneralLights';

import alphaTexture from '../assets/textures/UV_Grid_Sm.jpg';
import alphaMale from '../assets/obj/male02/male02.obj';
import flatiron from '../assets/obj/flatiron/13943_Flatiron_Building_v1_l1.obj';
import mnogohome from '../assets/obj/mnogohome/building.obj';

var THREE = require('three');
var OBJLoader = require('three-obj-loader');
OBJLoader(THREE);

const OrbitControls = require("three-orbit-controls")(THREE);

export default (canvas,id,district) => {

    const clock = new THREE.Clock();
    const origin = new THREE.Vector3(0,0,0);

    console.log('SM:district', district);

    const screenDimensions = {
        width: canvas.width,
        height: canvas.height
    }

    const mousePosition = {
        x: 0,
        y: 0
    }

    let object;

    const scene = buildScene();
    const renderer = buildRender(screenDimensions);
    const camera = buildCamera(screenDimensions);
    const controls = buildControls(camera,id);
    const sceneSubjects = createSceneSubjects(scene);

    // male
    //var pointLight = new THREE.PointLight( 0xffffff, 0.8 );
    //camera.add( pointLight );
    //scene.add( camera );
    
    //loadObjects(scene);

    function loadObjects(scene) {
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
        console.log('loading',district);
        loader.load( district, function ( obj ) {
            object = obj;
        }, onProgress, onError );
    }

    function buildScene() {
        const scene = new THREE.Scene();
        //scene.add(obj);
        scene.background = new THREE.Color("#FFF");
        //scene.background = new THREE.Color("#000");

        function loadObjects(scene) {
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
            console.log('loading',district);
            loader.load( district, function ( obj ) {
                object = obj;
            }, onProgress, onError );
        }

        loadObjects(scene);

        return scene;
    }

    function buildRender({ width, height }) {
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true }); 
        const DPR = window.devicePixelRatio ? window.devicePixelRatio : 1;
        renderer.setPixelRatio(DPR);
        renderer.setSize(width, height);

        renderer.gammaInput = true;
        renderer.gammaOutput = true; 

        return renderer;
    }

    function buildCamera({ width, height }) {
        const aspectRatio = width / height;
        const fieldOfView = 60;
        const nearPlane = 4;
        const farPlane = 100; 
        //const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
        //camera.position.z = 40;

        //const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 15000 );
        //camera.position.z = 40;

        // male
        const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
		camera.position.z = 250;

        // flatiron 
        /*
        const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 25000 );
		camera.position.z = 15000; */

        return camera;
    }

    function buildControls(camera, identifier) {
        console.log(identifier)
        const controls = new OrbitControls(camera,document.getElementById(identifier));
        controls.rotateSpeed = 1.0;
        controls.zoomSpeed = 1.2;
        controls.panSpeed = 0.8;
        controls.screenSpacePanning = false;
        return controls;
    }

    function createSceneSubjects(scene) {
        const sceneSubjects = [
            GeneralLights(scene),
            //SceneSubject(scene),
            //ScenePlane(scene),
            //SceneHierarchy(scene),
            //SceneHelpers(scene),
            //SceneFemale(scene),
            //SceneFlatiron(scene),
        ];

        return sceneSubjects;
    }

    function update() {
        const elapsedTime = clock.getElapsedTime();

        for(let i=0; i<sceneSubjects.length; i++)
            sceneSubjects[i].update(elapsedTime);

        //updateCameraPositionRelativeToMouse();

        //controls.update();

        renderer.render(scene, camera);
    }

    function updateCameraPositionRelativeToMouse() {
        camera.position.x += (  (mousePosition.x * 0.01) - camera.position.x ) * 0.01;
        camera.position.y += ( -(mousePosition.y * 0.01) - camera.position.y ) * 0.01;
        camera.lookAt(origin);
    }

    function onWindowResize() {
        const { width, height } = canvas;
        
        screenDimensions.width = width;
        screenDimensions.height = height;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        
        renderer.setSize(width, height);
    }

    function onMouseMove(x, y) {
        mousePosition.x = x;
        mousePosition.y = y;
    }

    return {
        update,
        onWindowResize,
        onMouseMove
    }
}