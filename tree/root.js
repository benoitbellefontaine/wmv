import * as THREE from 'three';
import Switch from './switch';
import Hotspot from './hotspot';

export default (function () {

        var instance;
 
        function createInstance() {
            var geometry = new THREE.BoxBufferGeometry( 10, 10, 10 );
            var material = new THREE.MeshNormalMaterial();
            var root = new THREE.Mesh( geometry, material );
            root.matrixAutoUpdate = false;
            root.name = 'central network device';
            root.parent = null;
            root.position.set(0,0,0);
            return root;
        }
    
        return {
            getInstance: function () {
                if (!instance) {
                    instance = createInstance();
                }
                return instance;
            },
            appendChild : function (node) {
                let object;
                var material = new THREE.MeshNormalMaterial();
                if (node.type === 'switch') {
                    const commutateur = new Switch(node);
                    commutateur.createInstance(instance);
                }
                else if (node.type === 'hotspot') {
                    const hotspot = new Hotspot(node);
                    hotspot.createInstance(instance);
                }
            },
            removeChild : function (node) {
                instance.remove(node);
            }
        };
    })();