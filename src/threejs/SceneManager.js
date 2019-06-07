//import * as THREE from 'three';
import SceneSubject         from './SceneSubject';
import ScenePlane           from './ScenePlane';
import SceneHierarchy       from './SceneHierarchy';
import SceneHumanHierarchy  from './SceneHumanHierarchy';
import SceneHelpers         from './SceneHelpers';
import ScenePeriodicTable   from './ScenePeriodicTable';
import SceneRaycaster       from './SceneRaycaster';
import SceneHouse           from './SceneHouse';
//import SceneMale          from './SceneMale';
//import SceneFemale        from './SceneFemale';
//import SceneFlatiron      from './SceneFlatiron';
import GeneralLights        from './GeneralLights';

import alphaTexture     from '../assets/textures/UV_Grid_Sm.jpg';
import alphaMale  from '../assets/obj/districts/male02.obj';
import flatiron   from '../assets/obj/districts/male02.obj';
import mnogohome  from '../assets/obj/districts/female02.obj';

import { CSS3DObject, CSS3DRenderer } from 'three-css3drenderer';
//CSS3DRenderer(THREE);

var THREE = require('three');
var OBJLoader = require('three-obj-loader');
OBJLoader(THREE);

const OrbitControls = require("three-orbit-controls")(THREE);

export default (canvas,id,district,root,rendererType) => {

    const clock = new THREE.Clock();
    const origin = new THREE.Vector3(0,0,0);

    var raycaster = new THREE.Raycaster();
	var mouse = new THREE.Vector2();

    console.log('SM:district', district);

    const screenDimensions = {
        width: canvas.width,
        height: canvas.height
    }

    const mousePosition = {
        x: 0,
        y: 0
    }

    let obj;

    //const scene = buildScene(district,loadOBJFile);
    //const scene2 = new THREE.Scene();

    const scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xf0f0f0 );
    const scene2 = new THREE.Scene();

    for (var i = 0; i<root.elements.length; i++) {
        scene.add(root.elements[i]);
    }

    scene.add(root.cubes);

    let renderer = buildRender(screenDimensions);
    let renderer2 = buildCSS3DRender(screenDimensions);
    const camera = buildCamera(screenDimensions);
    const controls = buildControls(camera,id);
    const sceneSubjects = createSceneSubjects(scene);
    const sceneCSS3DSubjects = createSceneCSS3DSubjects(scene,scene2);

    //ScenePeriodicTable(scene2);

   // console.log(scene2)
    
    /* 
        function f1(subject, callback) {
            alert(`Starting my ${subject} homework.`);
            callback();
        }
        function f2() {
            alert('Finished my homework');
        }
        //f1('math', f2);
    */

    function buildScene(district,callback) {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color("#FFF");
        //scene.background = new THREE.Color("#000");
        //callback(scene,district)
        return scene;
    }

    function loadOBJFile(scene,objFile){            
        /* material of OBJ model */                                       
        var OBJMaterial = new THREE.MeshPhongMaterial({color: 0xff0000,transparent:true,opacity:0.1});
        var loader = new THREE.OBJLoader();
        loader.load(objFile, function (object){
            object.traverse (function (child){
                if (child instanceof THREE.Mesh) {
                    child.material = OBJMaterial;
                }
            });
            object.name = objFile;
            obj = object.name
            object.position.y = -100;
            scene.add(object);
        });
    }

    function loadObjects(scene,district) {
        var OBJMaterial = new THREE.MeshPhongMaterial({color: 0x8888ff});
        function loadModel() {
            console.log('loadModel');
            obj.traverse( function ( child ) {
                if ( child.isMesh ) {
                    //child.material.map = texture;
                    child.material = OBJMaterial;
                }
            } );
            obj.position.y = - 95;
            scene.add( obj );
        }
        var manager = new THREE.LoadingManager( loadModel );
        manager.onProgress = function ( item, loaded, total ) {
            console.log('manager.onProgress');
            console.log( item, loaded, total );
        };
        // texture
        var textureLoader = new THREE.TextureLoader( manager );
        var texture = textureLoader.load( alphaTexture );
        // model
        function onProgress( xhr ) {
            console.log('onProgress');
            if ( xhr.lengthComputable ) {
                var percentComplete = xhr.loaded / xhr.total * 100;
                console.log( 'model ' + Math.round( percentComplete, 2 ) + '% downloaded' );
            }
        }
        function onError() {}
        var loader = new THREE.OBJLoader( manager );
        loader.load( district, function ( objf ) {
            console.log('loader.load');
            obj = objf;
        }, onProgress, onError );
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

    function buildCSS3DRender({ width, height }) {
        const renderer = new CSS3DRenderer();
        renderer.setSize(width, height);
        renderer.domElement.style.position = 'absolute';
		renderer.domElement.style.top = 0;       
        return renderer; 
    }

    function buildCamera({ width, height }) {
        // pers
        /*
        const aspectRatio = width / height;
        const fieldOfView = 60;
        const nearPlane = 4;
        const farPlane = 1000;

        const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
        camera.position.set(-200,200,200)
        */
        //const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 15000 );
        //camera.position.z = 40;

        // male
        //const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
		//camera.position.z = 100;
        //camera.position.y = 100;

        // flatiron 
        /*
        const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 25000 );
        camera.position.z = 15000; */
        
        //ortho
        var frustumSize = 500;
        const aspect = width / height;
        const camera = new THREE.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 1, 1000 );
        camera.position.set( - 200, 200, 200 );

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
            //SceneHumanHierarchy(scene),
            //SceneHierarchy(scene),
            SceneHelpers(scene),
            //SceneFemale(scene),
            //ScenePeriodicTable(scene),
            SceneRaycaster(canvas,scene,camera,renderer),
        ];

        return sceneSubjects;
    }

    function createSceneCSS3DSubjects(scene,scene2) {
        const sceneSubjects = [
            SceneHouse(scene,scene2),
        ];
        return sceneSubjects;
    }

    const pickPosition = {x: 0, y: 0};
    //const pickHelper = new PickHelper();
    clearPickPosition();

    function setPickPosition(clientX,clientY) {
        pickPosition.x = (clientX / canvas.clientWidth) *  2 - 1;
        pickPosition.y = (clientY / canvas.clientHeight) * -2 + 1;  // note we flip Y
    }

    function clearPickPosition() {
        // unlike the mouse which always has a position
        // if the user stops touching the screen we want
        // to stop picking. For now we just pick a value
        // unlikely to pick something
        pickPosition.x = -100000;
        pickPosition.y = -100000;
    }
        
    /*window.addEventListener('mousemove', setPickPosition);
    window.addEventListener('mouseout', clearPickPosition);
    window.addEventListener('mouseleave', clearPickPosition);*/

    function update(time) {
        time *= 0.001;
        const elapsedTime = clock.getElapsedTime();

        for(let i=0; i<sceneSubjects.length; i++)
            sceneSubjects[i].update(elapsedTime);

        for(let i=0; i<sceneCSS3DSubjects.length; i++)
            sceneCSS3DSubjects[i].update(elapsedTime);

        //updateCameraPositionRelativeToMouse();

        //controls.update();

        //pickHelper.pick(pickPosition, scene, camera, time);

        renderer2.render(scene2, camera);
        //renderer.render(scene, camera);
        
    }

    function load(newDistrict) {
        var selectedObject = scene.getObjectByName(obj);
        console.log('obj',obj);
        scene.remove( selectedObject );
        obj = newDistrict;
        loadOBJFile(scene,obj);
        scene.add(obj);
    }

    function zoom(value) {
        if (zoom === 1)
            camera.position.z += 10;
        else camera.position.z += -10;
    }

    function render(value) {
        if (value === 'WEBGL') {
            console.log('WEBGL')
            renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true }); 
            const DPR = window.devicePixelRatio ? window.devicePixelRatio : 1;
            renderer.setPixelRatio(DPR);
            renderer.setSize(screenDimensions.width,screenDimensions.height);

            renderer.gammaInput = true;
            renderer.gammaOutput = true; 
        }
        else if (value === 'CSS3D') {
            console.log('CSS3D')
            renderer = new CSS3DRenderer();
            renderer.setSize(screenDimensions.width,screenDimensions.height);
            renderer.domElement.style.position = 'absolute';
            renderer.domElement.style.top = 0;       
        }
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
        renderer2.setSize(width, height);
    }

    function onMouseMove(x, y) {
        mousePosition.x = x;
        mousePosition.y = y;
        setPickPosition(x,y);
        //console.log('x,y::',x,y)
    }

    function onMouseOut(x, y) {
        mousePosition.x = x;
        mousePosition.y = y;
        clearPickPosition();
    }

    function onMouseLeave(x, y) {
        mousePosition.x = x;
        mousePosition.y = y;
        clearPickPosition();
    }

    return {
        update,
        onWindowResize,
        onMouseMove,
        onMouseOut,
        onMouseLeave,
        load,
        zoom,
        render
    }
}