import * as THREE from 'three'
import alphaTexture from '../assets/textures/stripes_gradient.jpg';

export default scene => {
    const group = new THREE.Group();

    const planeGeometry = new THREE.PlaneGeometry( 50, 100, 1 );

    var meshBasicMaterial = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
    //var meshBasicMaterial = new THREE.MeshBasicMaterial( { color: 0x006500, wireframe: true, wireframeLinewidth: 1, side: THREE.DoubleSide } );
    
    const planeMaterial = new THREE.MeshStandardMaterial({ color: "#000", transparent: true, side: THREE.DoubleSide, alphaTest: 0.5 });
    planeMaterial.alphaMap = new THREE.TextureLoader().load(alphaTexture);
    planeMaterial.alphaMap.magFilter = THREE.NearestFilter;
    planeMaterial.alphaMap.wrapT = THREE.RepeatWrapping;
    planeMaterial.alphaMap.repeat.y = 1;

    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);

    planeMesh.position.copy( new THREE.Vector3( 0, 0, -25 ) );
    planeMesh.rotation.copy( new THREE.Euler( - 90 * THREE.Math.DEG2RAD, 0, 0 ) );

    group.add(planeMesh);
    scene.add(group);

    //group.rotation.z = Math.PI/4;

    const speed = 0.02;
    const textureOffsetSpeed = 0.02;

    function update(time) {
        const angle = time*speed;

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