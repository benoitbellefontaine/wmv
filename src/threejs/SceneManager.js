//import * as THREE from 'three';
import SceneSubject     from './SceneSubject';
import ScenePlane       from './ScenePlane';
import SceneHierarchy   from './SceneHierarchy';
import SceneHumanHierarchy   from './SceneHumanHierarchy';
import SceneHelpers     from './SceneHelpers';
import SceneRaycaster   from './SceneRaycaster';
//import SceneMale        from './SceneMale';
//import SceneFemale      from './SceneFemale';
//import SceneFlatiron    from './SceneFlatiron';
import GeneralLights    from './GeneralLights';

import alphaTexture     from '../assets/textures/UV_Grid_Sm.jpg';
import alphaMale  from '../assets/obj/districts/male02.obj';
import flatiron   from '../assets/obj/districts/male02.obj';
import mnogohome  from '../assets/obj/districts/female02.obj';

var THREE = require('three');
var OBJLoader = require('three-obj-loader');
OBJLoader(THREE);

const OrbitControls = require("three-orbit-controls")(THREE);

export default (canvas,id,district,root) => {

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

    const scene = buildScene(district,loadOBJFile);

    for (var i = 0; i<root.elements.length; i++) {
        scene.add(root.elements[i]);
    }

    scene.add(root.cubes);

    const renderer = buildRender(screenDimensions);
    const camera = buildCamera(screenDimensions);
    const controls = buildControls(camera,id);
    const sceneSubjects = createSceneSubjects(scene);
    
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

    function buildCamera({ width, height }) {
        const aspectRatio = width / height;
        const fieldOfView = 60;
        const nearPlane = 4;
        const farPlane = 500;

        const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
        camera.position.z = 15;

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
            //SceneFlatiron(scene),
            SceneRaycaster(canvas,scene,camera,renderer),
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

        //updateCameraPositionRelativeToMouse();

        //controls.update();

        //pickHelper.pick(pickPosition, scene, camera, time);

        renderer.render(scene, camera);
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
        zoom
    }
}