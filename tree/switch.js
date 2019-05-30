import * as THREE from 'three';

export default (function () {

        var instance;
    
        return {
            createInstance: function (parent,node) {
                var geometry = new THREE.SphereBufferGeometry( 5, 32, 32 );
                var material = new THREE.MeshNormalMaterial();
                instance = new THREE.Mesh( geometry, material );
                //instance.parent = parent;
                instance.name = node.name;
                //var v = new THREE.Vector3(x,y,z);
                instance.position.set(node.x,node.y,node.z);
                var geometry_line = new THREE.Geometry();
                    geometry_line.vertices.push(
                        parent.position,
                        instance.position
                    );
                var material_line = new THREE.LineBasicMaterial({color: 0x000000});
                var line = new THREE.Line( geometry_line, material_line );
                line.name = 'line-'+node.name;
                parent.add(line);
                parent.add(instance);
                return {instance,line};
            },
            getInstance: function () {
                return instance;
            },
            appendChild : function (node) {
                let object;
                var material = new THREE.MeshNormalMaterial();
                if (node.type === 'switch') {
                    var geometry = new THREE.SphereBufferGeometry( 5, 32, 32 );
                    object = new THREE.Mesh( geometry, material );
                    object.parent = instance;
                    instance.add(object)
                }
                else if (node.type === 'hotspot') {
                    var geometry = new THREE.ConeBufferGeometry( 5, 20, 32 );
                    object = new THREE.Mesh( geometry, material );
                    object.parent = instance;
                    instance.add(object)
                }
            },
            removeChild : function (node) {
                instance.remove(node);
            }
        };
    })();