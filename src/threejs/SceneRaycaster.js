import * as THREE from 'three'

class PickHelper {

    constructor() {
        this.raycaster = new THREE.Raycaster();
        this.pickedObject = null;
        this.pickedObjectSavedColor = 0;
        this.geometry = null;
        this.points = [];
        for ( var i = -Math.PI; i < Math.PI; i+=Math.PI/4 ) {
            this.points.push( new THREE.Vector2( 10 * Math.cos( i ), 0.5 * Math.sin( i ) ) );
        }
        // SCALE
        var scaleKF = new THREE.VectorKeyframeTrack( '.scale', [ 0,1,2 ], [ 1,1,1,2,2,2,1,1,1 ] );
        // COLOR
        var colorKF = new THREE.ColorKeyframeTrack( '.material.color', [ 0, 1, 2 ], [ 1, 0, 0, 0, 1, 0, 0, 0, 1 ], THREE.InterpolateDiscrete );
        // create an animation sequence with the tracks
        // If a negative time value is passed, the duration will be calculated from the times of the passed tracks array
        this.clip = new THREE.AnimationClip( 'Action', 3, [ scaleKF/*, colorKF, positionKF, quaternionKF, opacityKF */ ] );
        var clock = new THREE.Clock();

        //this.material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
        //this.lathe = new THREE.Mesh( this.geometry, this.material );
    }

    pick(normalizedPosition, scene, camera, time) {

        // restore the color if there is a picked object
        if (this.pickedObject && (this.pickedObject.userData === 'hotspot')) {
            this.pickedObject.geometry.scale(1/5,1/5,1/5);
            //this.pickedObject.geometry = this.geometry;
            this.pickedObject.material = this.material;
            this.pickedObject.material.emissive.setHex(this.pickedObjectSavedColor);
            this.pickedObject = undefined;
            console.log('setting object to undefined')
        }

        // cast a ray through the frustum
        this.raycaster.setFromCamera(normalizedPosition, camera);
        // get the list of objects the ray intersected
        const intersectedObjects = this.raycaster.intersectObjects(scene.children);
        if (intersectedObjects.length) {
            // pick the first object. It's the closest one
            //console.log('PickHelper:intersectedObjects',intersectedObjects);
            this.pickedObject = intersectedObjects[0].object;
            if (this.pickedObject.userData === 'hotspot') {
                // console.log('this.pickedObject',this.pickedObject);
                // save its color
                this.pickedObjectSavedColor = this.pickedObject.material.emissive.getHex();
                //this.geometry = this.pickedObject.geometry;
                this.material = this.pickedObject.material;
                //this.pickedObject.geometry = new THREE.LatheGeometry( this.points, 50 );
                //this.pickedObject.geometry = new THREE.LatheGeometry( this.points, 50 );
                this.pickedObject.material = new THREE.MeshBasicMaterial( { color: 0x00ff00, transparent: false, opacity:0.7, wireframe: true } );
                this.pickedObject.geometry.scale(5,5,5);

                //if (pickObj !== null) {
                    // get mesh and apply mixer
                    var mixer = new THREE.AnimationMixer( this.pickedObject );
                    // create a ClipAction and set it to play
                    this.clipAction = mixer.clipAction( this.clip );
                    this.clipAction.play();
                    
                    if ( mixer ) {
                        mixer.update( time );
                    }
                //}

                return this.pickedObject;
                // 2 geos this.geometry & this.pickedObject.geometry
                //

                //this.pickedObject.geometry.scale(3,3,3);
                // set its emissive color to flashing red/yellow
                //this.pickedObject.material.emissive.setHex((time * 8) % 2 > 1 ? 0xFFFF00 : 0xFF0000);
            }
        } 
        return null;
    }

}

export default (canvas,scene,camera,renderer) => {
    const group = new THREE.Group();

    
    const pickPosition = {x:0,y:0};
    clearPickPosition();
        
    function setPickPosition(event) {
        //console.log('event.clientX',event.clientX);
        //console.log('canvas.clientWidth',canvas.clientWidth);
        // adjustment offset x - 300 / offset y - screen height*0.1
        pickPosition.x = ((event.clientX-300) / (canvas.clientWidth)) *  2 - 1;
        pickPosition.y = ((event.clientY-(canvas.clientHeight*0.1)) / canvas.clientHeight) * -2 + 1;  // note we flip Y
    }
    
    function clearPickPosition() {
        // unlike the mouse which always has a position
        // if the user stops touching the screen we want
        // to stop picking. For now we just pick a value
        // unlikely to pick something
        pickPosition.x = -100000;
        pickPosition.y = -100000;
    }
    
    window.addEventListener('mousemove', setPickPosition);
    window.addEventListener('mouseout', clearPickPosition);
    window.addEventListener('mouseleave', clearPickPosition);
    
    const pickHelper = new PickHelper();

    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
    }

    // MESH
    /*var geometry = new THREE.BoxBufferGeometry( 4.1, 1.1, 4.1 );
    var material = new THREE.MeshBasicMaterial( { color: 0x0000ff, transparent: true, opacity: 0.1 } );
    var mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );*/

    // KEYFRAME
    // SCALE
    var scaleKF = new THREE.VectorKeyframeTrack( '.scale', [ 0,1,2 ], [ 1,1,1,4,4,4,1,1,1 ] );
    // COLOR
	var colorKF = new THREE.ColorKeyframeTrack( '.material.color', [ 0, 1, 2 ], [ 1, 0, 0, 0, 1, 0, 0, 0, 1 ], THREE.InterpolateDiscrete );
    // create an animation sequence with the tracks
    // If a negative time value is passed, the duration will be calculated from the times of the passed tracks array
    var clip = new THREE.AnimationClip( 'Action', 3, [ scaleKF, colorKF, /*positionKF, quaternionKF, opacityKF */ ] );
    var clock = new THREE.Clock();

        /*
        // get mesh and apply mixer
        var mixer = new THREE.AnimationMixer( mesh );
        // create a ClipAction and set it to play
        var clipAction = mixer.clipAction( clip );
        clipAction.play();
        */
    

    function update(time) {

        time *= 3;  // convert to seconds;

        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        //camera.rotation.y = time * .1;
        var delta = clock.getDelta();

        var pickObj = pickHelper.pick(pickPosition, scene, camera, time);

    }

    return {
        update
    }
}