import * as THREE from 'three'

export default scene => {    

    const lightIn = new THREE.PointLight("#4CAF50", 30);
    const lightOut = new THREE.PointLight("#2196F3", 10);
    lightOut.position.set(40,20,40);

    var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
	scene.add( ambientLight );

    scene.add(lightIn);
    scene.add(lightOut);

    const rad = 80;

    function update(time) {
        const x = rad * Math.sin(time*0.2)
        lightOut.position.x = x;
    }

    return {
        update
    }
}