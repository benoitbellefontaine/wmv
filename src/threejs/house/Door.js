import * as THREE from 'three'
import doorTexture from '../../assets/textures/porte.jpg';
import uvTexture from '../../assets/textures/UV_Grid_Sm.jpg';

export default (scene,color,pos,rot) => {

    var extrudeSettings = { depth: .5, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

    var loader = new THREE.TextureLoader();
    var texture = loader.load( doorTexture );
	texture.minFilter = THREE.NearestFilter;
	texture.magFilter = THREE.NearestFilter;
					
    //texture.anisotropy = 16;

    //texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping; //THREE.RepeatWrapping;
    //texture.repeat.set( 0.08, 0.08 );
    //texture.repeat.set( 1, 1 );

    // wall
    var doorShape = new THREE.Shape();
    doorShape.moveTo( 0,  0 );
    doorShape.lineTo( 0,  0 );
    doorShape.lineTo( 30,  0 );
    doorShape.lineTo( 30,  70 );
    doorShape.lineTo( 0,  70 );
    doorShape.lineTo( 0,  0 );

    //var geometry = new THREE.ExtrudeBufferGeometry( doorShape, extrudeSettings );
    //var geometry = new THREE.ShapeBufferGeometry( doorShape );
    var geometry = new THREE.PlaneBufferGeometry( 30, 70 );
    var mesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial( { color: color, side: THREE.DoubleSide , map: texture  } ) );
    mesh.position.set( pos.x,pos.y,pos.z );
    mesh.rotation.set( rot.x,rot.y,rot.z );
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