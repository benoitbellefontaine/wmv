//import * as THREE from 'three'
import alphaTexture from '../assets/textures/stripes_gradient.jpg';
import alphaMale from '../assets/obj/districts/male02.obj';

var THREE = require('three');
var OBJLoader = require('three-obj-loader');
OBJLoader(THREE);

var EffectComposer = require('../postprocessing/EffectComposer');
EffectComposer(THREE);

var RenderPass = require('../postprocessing/RenderPass');
RenderPass(THREE);

var FilmPass = require('../postprocessing/FilmPass');
FilmPass(THREE);

var BloomPass = require('../postprocessing/BloomPass');
BloomPass(THREE);

var ShaderPass = require('../postprocessing/ShaderPass');
ShaderPass(THREE);

var CopyShader = require('../shaders/CopyShader');
CopyShader(THREE);

var FilmShader = require('../shaders/FilmShader');
FilmShader(THREE);

var FocusShader  = require('../shaders/FocusShader');
FocusShader (THREE);

var ConvolutionShader = require('../shaders/ConvolutionShader');
ConvolutionShader(THREE);


export default (scene,renderer,camera) => {

    var mesh;
    var parent, meshes = [], clonemeshes = [];
    var composer, effectFocus;
    var clock = new THREE.Clock();
    var stats;

    var loader = new THREE.OBJLoader();
    loader.load( alphaMale, function ( object ) {
        var positions = combineBuffer( object, 'position' );
        createMesh( positions, scene, 4.05, - 500, - 350, 600, 0xff7744 );
        createMesh( positions, scene, 4.05, 500, - 350, 0, 0xff5522 );
        createMesh( positions, scene, 4.05, - 250, - 350, 1500, 0xff9922 );
        createMesh( positions, scene, 4.05, - 250, - 350, - 1500, 0xff99ff );
    } );

    parent = new THREE.Object3D();
    scene.add( parent );

    var grid = new THREE.Points( new THREE.PlaneBufferGeometry( 15000, 15000, 64, 64 ), new THREE.PointsMaterial( { color: 0xff0000, size: 10 } ) );
    grid.position.y = - 400;
    grid.rotation.x = - Math.PI / 2;
    parent.add( grid );

    const speed = 0.02;

    // postprocessing
    var renderModel = new THREE.RenderPass( scene, camera );
    var effectBloom = new THREE.BloomPass( 0.75 );
    var effectFilm = new THREE.FilmPass( 0.5, 0.5, 1448, false );
    effectFocus = new THREE.ShaderPass( THREE.FocusShader );
    effectFocus.uniforms[ "screenWidth" ].value = window.innerWidth * window.devicePixelRatio;
    effectFocus.uniforms[ "screenHeight" ].value = window.innerHeight * window.devicePixelRatio;
    composer = new THREE.EffectComposer( renderer );
    composer.addPass( renderModel );
    composer.addPass( effectBloom );
    composer.addPass( effectFilm );
    composer.addPass( effectFocus );

    function combineBuffer( model, bufferName ) {
        let count = 0;
        model.traverse( function ( child ) {
            if ( child.isMesh ) {
                var buffer = child.geometry.attributes[ bufferName ];
                count += buffer.array.length;
            }
        } );
        var combined = new Float32Array( count );
        let offset = 0;
        model.traverse( function ( child ) {
            if ( child.isMesh ) {
                var buffer = child.geometry.attributes[ bufferName ];
                combined.set( buffer.array, offset );
                offset += buffer.array.length;
            }
        } );
        return new THREE.BufferAttribute( combined, 3 );
    }

    function createMesh( positions, scene, scale, x, y, z, color ) {
        var geometry = new THREE.BufferGeometry();
        geometry.addAttribute( 'position', positions.clone() );
        geometry.addAttribute( 'initialPosition', positions.clone() );
        geometry.attributes.position.setDynamic( true );
        var clones = [
            [ 6000, 0, - 4000 ],
            [ 5000, 0, 0 ],
            [ 1000, 0, 5000 ],
            [ 1000, 0, - 5000 ],
            [ 4000, 0, 2000 ],
            [ - 4000, 0, 1000 ],
            [ - 5000, 0, - 5000 ],
            [ 0, 0, 0 ]
        ];
        for ( var i = 0; i < clones.length; i ++ ) {
            var c = ( i < clones.length - 1 ) ? 0x252525 : color;
            mesh = new THREE.Points( geometry, new THREE.PointsMaterial( { size: 30, color: c } ) );
            mesh.scale.x = mesh.scale.y = mesh.scale.z = scale;
            mesh.position.x = x + clones[ i ][ 0 ];
            mesh.position.y = y + clones[ i ][ 1 ];
            mesh.position.z = z + clones[ i ][ 2 ];
            parent.add( mesh );
            clonemeshes.push( { mesh: mesh, speed: 0.5 + Math.random() } );
        }
        meshes.push( {
            mesh: mesh, verticesDown: 0, verticesUp: 0, direction: 0, speed: 15, delay: Math.floor( 200 + 200 * Math.random() ),
            start: Math.floor( 100 + 200 * Math.random() ),
        } );
    }

    function update(time) {

        var delta = 10 * clock.getDelta();

        delta = delta < 2 ? delta : 2;
        
        parent.rotation.y += - 0.02 * delta;
        
        for ( var j = 0; j < clonemeshes.length; j ++ ) {
            var cm = clonemeshes[ j ];
            cm.mesh.rotation.y += - 0.1 * delta * cm.speed;
        }
        
        for ( var j = 0; j < meshes.length; j ++ ) {
            var data = meshes[ j ];
            var positions = data.mesh.geometry.attributes.position;
            var initialPositions = data.mesh.geometry.attributes.initialPosition;
            var count = positions.count;
            if ( data.start > 0 ) {
                data.start -= 1;
            } else {
                if ( data.direction === 0 ) {
                    data.direction = - 1;
                }
            }
            for ( var i = 0; i < count; i ++ ) {
                var px = positions.getX( i );
                var py = positions.getY( i );
                var pz = positions.getZ( i );
                // falling down
                if ( data.direction < 0 ) {
                    if ( py > 0 ) {
                        positions.setXYZ(
                            i,
                            px + 1.5 * ( 0.50 - Math.random() ) * data.speed * delta,
                            py + 3.0 * ( 0.25 - Math.random() ) * data.speed * delta,
                            pz + 1.5 * ( 0.50 - Math.random() ) * data.speed * delta
                        );
                    } else {
                        data.verticesDown += 1;
                    }
                }
                // rising up
                if ( data.direction > 0 ) {
                    var ix = initialPositions.getX( i );
                    var iy = initialPositions.getY( i );
                    var iz = initialPositions.getZ( i );
                    var dx = Math.abs( px - ix );
                    var dy = Math.abs( py - iy );
                    var dz = Math.abs( pz - iz );
                    var d = dx + dy + dx;
                    if ( d > 1 ) {
                        positions.setXYZ(
                            i,
                            px - ( px - ix ) / dx * data.speed * delta * ( 0.85 - Math.random() ),
                            py - ( py - iy ) / dy * data.speed * delta * ( 1 + Math.random() ),
                            pz - ( pz - iz ) / dz * data.speed * delta * ( 0.85 - Math.random() )
                        );
                    } else {
                        data.verticesUp += 1;
                    }
                }
            }
            // all vertices down
            if ( data.verticesDown >= count ) {
                if ( data.delay <= 0 ) {
                    data.direction = 1;
                    data.speed = 5;
                    data.verticesDown = 0;
                    data.delay = 320;
                } else {
                    data.delay -= 1;
                }
            }
            // all vertices up
            if ( data.verticesUp >= count ) {
                if ( data.delay <= 0 ) {
                    data.direction = - 1;
                    data.speed = 15;
                    data.verticesUp = 0;
                    data.delay = 120;
                } else {
                    data.delay -= 1;
                }
            }
            
            positions.needsUpdate = true;

        }

        composer.render( 0.01 );
        
    }

    return {
        update
    }

}