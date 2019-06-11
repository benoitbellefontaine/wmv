import * as THREE from 'three';
import Wall from './house/Wall'
import WallWithHoles from './house/WallWithHoles'
//import { CSS3DObject, CSS3DRenderer } from 'three-css3drenderer';
//var THREE = require('three');
//var OBJLoader = require('three-obj-loader');

export default (scene,scene2) => {

    const group = new THREE.Group();

    const floors = Math.ceil( Math.random()*10 );
    console.log('# of floors',floors);

    for (var i=0;i<floors;i++) {
        createFloor(i,80)
    }
    
    function createFloor(floor,height) {
        // interior
        const wall1 = WallWithHoles(scene,'chocolate',new THREE.Vector3( 0, floor*height, 0 ), new THREE.Euler( 0, 0, 0 ));
        const wall2 = WallWithHoles(scene,'chocolate',new THREE.Vector3( 0, floor*height, 0 ), new THREE.Euler( 0, - 90 * THREE.Math.DEG2RAD, 0 ));
        //const wall3 = WallWithHoles(scene,'chocolate',new THREE.Vector3( 0, floor*height, 0 ), new THREE.Euler( 0, 90 * THREE.Math.DEG2RAD, 0 ));
        //const wall4 = Wall(scene,'chocolate',new THREE.Vector3( 0, floor*height, 0 ), new THREE.Euler( 0, - 90 * THREE.Math.DEG2RAD, 0 ));

        // exterior
        const wall5 = Wall(scene,'chocolate',new THREE.Vector3( 0, floor*height, -200 ), new THREE.Euler( 0, 0, 0 ));
        const wall6 = Wall(scene,'chocolate',new THREE.Vector3( 200, floor*height, -200 ), new THREE.Euler( 0, - 90 * THREE.Math.DEG2RAD, 0 ));
        const wall7 = Wall(scene,'chocolate',new THREE.Vector3( 200, floor*height, 0 ), new THREE.Euler( 0, - 90 * THREE.Math.DEG2RAD, 0 ));
        const wall8 = Wall(scene,'chocolate',new THREE.Vector3( 0, floor*height, 200 ), new THREE.Euler( 0, 0, 0 ));
        const wall9 = Wall(scene,'chocolate',new THREE.Vector3( -200, floor*height, -200 ), new THREE.Euler( 0, 0, 0 ));
        const wall10 = Wall(scene,'chocolate',new THREE.Vector3( -200, floor*height, -200 ), new THREE.Euler( 0, - 90 * THREE.Math.DEG2RAD, 0 ));
        const wall11 = Wall(scene,'chocolate',new THREE.Vector3( -200, floor*height, 0 ), new THREE.Euler( 0, - 90 * THREE.Math.DEG2RAD, 0 ));
        const wall12 = WallWithHoles(scene,'chocolate',new THREE.Vector3( -200, floor*height, 200 ), new THREE.Euler( 0, 0, 0 ));

        /*
        const wall8 = Wall(scene,'chocolate',new THREE.Vector3( 0, floor*height, 0 ), new THREE.Euler( 0, - 90 * THREE.Math.DEG2RAD, 0 ));
        const wall9 = Wall(scene,'chocolate',new THREE.Vector3( 0, floor*height, 0 ), new THREE.Euler( 0, 0, 0 ));
        const wall10 = Wall(scene,'chocolate',new THREE.Vector3( 0, floor*height, 0 ), new THREE.Euler( 0, - 180 * THREE.Math.DEG2RAD, 0 ));
        const wall11 = Wall(scene,'chocolate',new THREE.Vector3( 0, floor*height, 0 ), new THREE.Euler( 0, 90 * THREE.Math.DEG2RAD, 0 ));
        const wall12 = Wall(scene,'chocolate',new THREE.Vector3( 0, floor*height, 0 ), new THREE.Euler( 0, - 90 * THREE.Math.DEG2RAD, 0 ));
        */

        var geometry = new THREE.PlaneBufferGeometry( 400, 400 );
        var material = new THREE.MeshBasicMaterial( { color: 'firebrick', wireframe: false, wireframeLinewidth: 1, side: THREE.DoubleSide, transparent:true, opacity:0.7 } );
        var meshFloor = new THREE.Mesh( geometry, material );
        meshFloor.position.copy( new THREE.Vector3( 0, (floor+1)*height, 0 ) );
        meshFloor.rotation.copy( new THREE.Euler( 90 * THREE.Math.DEG2RAD, 0, 0 ) );
        scene.add( meshFloor );
    }

    var material = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true, wireframeLinewidth: 1, side: THREE.DoubleSide } );    

    // room
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
    

    function createPlane( width, height, cssColor, pos, rot ) {
        /*var element = document.createElement( 'div' );
        element.style.width = width + 'px';
        element.style.height = height + 'px';
        element.style.opacity = 0.75;
        element.style.background = cssColor;
        var object = new CSS3DObject( element );
        object.position.copy( pos );
        object.rotation.copy( rot );
        group2.add( object );*/
        var geometry = new THREE.PlaneBufferGeometry( width, height );
        var material = new THREE.MeshBasicMaterial( { color: cssColor, wireframe: false, wireframeLinewidth: 1, side: THREE.DoubleSide, transparent:true, opacity:0.7 } );
        var mesh = new THREE.Mesh( geometry, material );
        mesh.position.copy( pos );
        mesh.rotation.copy( rot );
        group.add( mesh );
    }

    //scene.add(group);



    //init();
                
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
