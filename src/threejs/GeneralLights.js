import * as THREE from 'three'

export default scene => {    

    const lightIn = new THREE.PointLight("#4CAF50", 30);
    const lightOut = new THREE.PointLight("#2196F3", 10);
    lightOut.position.set(-30,30,30);

    var light = new THREE.AmbientLight( 0x404040 ); // soft white light
    scene.add( light );

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