import * as THREE from 'three'
import stripesTexture from '../../assets/textures/stripes_gradient.jpg';
import uvTexture from '../../assets/textures/UV_Grid_Sm.jpg';
import brickTexture from '../../assets/textures/brick_diffuse.jpg';

export default (scene,color,pos,rot) => {

    var extrudeSettings = { depth: 0, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

    var loader = new THREE.TextureLoader();
    var texture = loader.load( brickTexture );

    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 0.008, 0.008 );

    // wall
    var wallShape = new THREE.Shape();
    wallShape.moveTo( 0,  0 );
    wallShape.lineTo( 0,  0 );
    wallShape.lineTo( 200, 0 );
    wallShape.lineTo( 200, 80 );
    wallShape.lineTo( 0,  80 );
    wallShape.lineTo( 0,  0 ); 
    
    // door hole
    var doorHolePath = new THREE.Path();
    doorHolePath.moveTo( 40,  0 );
    doorHolePath.lineTo( 40,  0 );
    doorHolePath.lineTo( 70,  0 );
    doorHolePath.lineTo( 70,  70 );
    doorHolePath.lineTo( 40,  70 );
    doorHolePath.lineTo( 40,  0 );
    //wallShape.holes.push( doorHolePath );

    var geometry = new THREE.ExtrudeBufferGeometry( wallShape, extrudeSettings );
    var mesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial( { color: color, side: THREE.DoubleSide , map: texture } ) );
    mesh.position.set( pos.x,pos.y,pos.z );
    mesh.rotation.set( rot.x,rot.y,rot.z );
    //mesh.scale.set( s, s, s );
    scene.add( mesh );
                
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