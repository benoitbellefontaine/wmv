import React, { Component } from "react";
import * as THREE from "three";
import './css3d.css'
import ReactTree from './ReactTree'
const OrbitControls = require("three-orbit-controls")(THREE);
//const CSS3DRenderer = require("three-css3drenderer")(THREE);
const CSS3D = require('css3d');

/*
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
*/

const types = ['controller','switch','hotspot']

var targets = { table: [], sphere: [], helix: [], grid: [] };
var objects = [];

function Node(data,type,position) {
    this.data = data;
    this.type = type;
    this.parent = null;
    this.children = [];
}
 
function Link(node1, node2, segments) {
    this.node1 = node1;
    this.node2 = node2;
    if (segments != null)
        this.segments = segments; // [{x,y,z},{x,y,z},{x,y,z},{x,y,z}]
    else this.segments = [node1.position,node2.position]
}
 
function Tree(data,type,position) {
    var node = new Node(data,type,position);
    this._root = node;
}

function Queue() {
    this.dataStore = []
    this.enqueue = function enqueue(element) {
        this.dataStore.push(element)
    }
    this.dequeue = function dequeue() {
        return this.dataStore.shift()
    }
    this.front = function front() {
        return this.dataStore[0]
    }
    this.back = function back() {
        return this.dataStore[this.dataStore.length - 1]
    }
}
 
Tree.prototype.traverseDF = function(callback) {
 
    // this is a recurse and immediately-invoking function
    (function recurse(currentNode) {
        // step 2
        for (var i = 0, length = currentNode.children.length; i < length; i++) {
            // step 3
            recurse(currentNode.children[i]);
        }
 
        // step 4
        callback(currentNode);
 
        // step 1
    })(this._root);
 
};
 
Tree.prototype.traverseBF = function(callback) {
    var queue = new Queue();
 
    queue.enqueue(this._root);
 
    var currentTree = queue.dequeue();
 
    while(currentTree){
        for (var i = 0, length = currentTree.children.length; i < length; i++) {
            queue.enqueue(currentTree.children[i]);
        }
 
        callback(currentTree);
        currentTree = queue.dequeue();
    }
};
 
Tree.prototype.contains = function(callback, traversal) {
    traversal.call(this, callback);
};
 
Tree.prototype.add = function(data, toData, traversal) {
    var child = new Node(data),
        parent = null,
        callback = function(node) {
            if (node.data === toData) {
                parent = node;
            }
        };
 
    this.contains(callback, traversal);
 
    if (parent) {
        parent.children.push(child);
        child.parent = parent;
    } else {
        throw new Error('Cannot add node to a non-existent parent.');
    }
};
 
Tree.prototype.remove = function(data, fromData, traversal) {
    var tree = this,
        parent = null,
        childToRemove = null,
        index;
 
    var callback = function(node) {
        if (node.data === fromData) {
            parent = node;
        }
    };
 
    this.contains(callback, traversal);
 
    if (parent) {
        index = findIndex(parent.children, data);
 
        if (index === undefined) {
            throw new Error('Node to remove does not exist.');
        } else {
            childToRemove = parent.children.splice(index, 1);
        }
    } else {
        throw new Error('Parent does not exist.');
    }
 
    return childToRemove;
};

 
function findIndex(arr, data) {
    var index;
 
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].data === data) {
            index = i;
        }
    }
 
    return index;
}

class Shape extends Component {

    constructor(props) {
        super(props);
        this.state = {tree: null};
        this.createElement = this.createElement.bind(this);
        this.animate = this.animate.bind(this);
        this.addCube = this.addCube.bind(this);
        this.initializeCamera = this.initializeCamera.bind(this);
        this.initializeOrbits = this.initializeOrbits.bind(this);
    }

    //var objects = [];

    componentDidMount() {
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;
        this.scene = new THREE.Scene();
        this.light = new THREE.DirectionalLight( 0xffffff, 50 );
        this.light2 = new THREE.AmbientLight( 0xa0a0a0 ); // soft white light
        this.scene.add( this.light );
        this.scene.add( this.light2 );
        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.renderer.setSize(width, height);
        this.mount.appendChild(this.renderer.domElement);
        this.initializeOrbits();
        this.initializeCamera();
        
        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const material = new THREE.MeshLambertMaterial( { color: 0xFF00FF } );
        this.cube = new THREE.Mesh( geometry, material );
        this.scene.add( this.cube );

        for (var i=0;i<50;i++) {
            const geometry = new THREE.BoxGeometry( 1, 1, 1 );
            geometry.translate(Math.random() * 400 - 200, Math.random() * 400 - 200, Math.random() * 400 - 200);
            const material = new THREE.MeshPhongMaterial( { color: 0xFF00FF } );
            this.cube = new THREE.Mesh( geometry, material );
            objects.push( this.cube );
            this.scene.add( this.cube );
        }

        for (var i=0;i<50;i++) {
            var element = this.createElement('SW1','switch',
                new THREE.Vector3(Math.random() * 4 - 2, Math.random() * 4 - 2, Math.random() * 4 - 2));
            this.scene.add( element );

            var object = new THREE.Object3D();
			object.position.x = ( i * 140 ) - 1330;
			object.position.y = - ( i * 180 ) + 990;
			targets.table.push( object );
        }

        var vector = new THREE.Vector3();
        for ( var i = 0, l = objects.length; i < l; i ++ ) {
            var theta = i * 0.175 + Math.PI;
            var y = - ( i * 8 ) + 450;
            var object = new THREE.Object3D();
            object.position.setFromCylindricalCoords( 900, theta, y );
            vector.x = object.position.x * 2;
            vector.y = object.position.y;
            vector.z = object.position.z * 2;
            object.lookAt( vector );
            targets.helix.push( object );
        }

        var tree = new Tree('one','central network device ');
 
        tree._root.children.push(new Node('two','SW-2'));
        tree._root.children[0].parent = tree;
         
        tree._root.children.push(new Node('three','SW-3'));
        tree._root.children[1].parent = tree;
         
        tree._root.children.push(new Node('four','SW-4'));
        tree._root.children[2].parent = tree;
         
        tree._root.children[0].children.push(new Node('five','HS-5'));
        tree._root.children[0].children[0].parent = tree._root.children[0];
         
        tree._root.children[0].children.push(new Node('six','HS-6'));
        tree._root.children[0].children[1].parent = tree._root.children[0];
         
        tree._root.children[2].children.push(new Node('seven','hotspot'));
        tree._root.children[2].children[0].parent = tree._root.children[2];

        this.setState({tree:tree});

        tree.traverseDF(function(node) {
            console.log(node.data, node.type)
        });

        console.log('this.tree',tree);
        
        this.animate();
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.frameId);
        this.mount.removeChild(this.renderer.domElement);
    }

    initializeOrbits() {
        this.controls.rotateSpeed = 1.0;
        this.controls.zoomSpeed = 1.2;
        this.controls.panSpeed = 0.8;
    }

    initializeCamera() {
        this.camera.position.x = 0;
        this.camera.position.y = 0;
        this.camera.position.z = 4;
    }

    animate() {
        this.frameId = window.requestAnimationFrame(this.animate);
        this.renderer.render(this.scene, this.camera);
    }

    addCube(cube) {
        this.scene.add(cube);
    }

    createElement = (name, type, position)=> {
        var element = document.createElement( 'div' );
        element.className = 'element';
        if (type === 'controller')
            element.style.backgroundColor = 'rgba(127,0,0,' + ( Math.random() * 0.5 + 0.25 ) + ')';
        else if (type === 'switch')
            element.style.backgroundColor = 'rgba(0,127,0,' + ( Math.random() * 0.5 + 0.25 ) + ')';
        else if (type === 'hotspot')
            element.style.backgroundColor = 'rgba(0,0,127,' + ( Math.random() * 0.5 + 0.25 ) + ')';
        //var number = document.createElement( 'div' );
        //number.className = 'number';
        //number.textContent = ( i / 5 ) + 1;
        //element.appendChild( number );
        var symbol = document.createElement( 'div' );
        symbol.className = 'symbol';
        //symbol.textContent = table[ i ];
        symbol.textContent = name;
        element.appendChild( symbol );

        //var object = new THREE.CSS3DObject( element );
        var object = new CSS3D.CSS3DObject(element);
        object.position.x = position.x;
        object.position.y = position.y;
        object.position.z = position.z;
        //this.scene.add( object );
        //this.objects.push( object );

        return element;
    }

    createGeoObject(name,type,position,objects,scene) {
        if (type === 'controller') {
            const geometry = new THREE.BoxGeometry( 1, 1, 1 );
            geometry.translate(position.x,position.y,position.z);
            const material = new THREE.MeshPhongMaterial( { color: 0x0000FF } );
            this.cube = new THREE.Mesh( geometry, material );
            objects.push( this.cube );
            scene.add( this.cube );
        }
        else if (type === 'switch') {
            const geometry = new THREE.BoxGeometry( 1, 1, 1 );
            geometry.translate(position.x,position.y,position.z);
            const material = new THREE.MeshPhongMaterial( { color: 0x00FF00 } );
            this.cube = new THREE.Mesh( geometry, material );
            objects.push( this.cube );
            scene.add( this.cube );
        }
        else if (type === 'hotspot') {
            const geometry = new THREE.BoxGeometry( 1, 1, 1 );
            geometry.translate(position.x,position.y,position.z);
            const material = new THREE.MeshPhongMaterial( { color: 0xFF0000 } );
            this.cube = new THREE.Mesh( geometry, material );
            objects.push( this.cube );
            scene.add( this.cube );
        }
    }

    render() {
        const {tree} = this.state;
        return (
            <div>
                <div
                    id="boardCanvas"
                    style={{ width: "100vw", height: "90vh",  }}
                    ref={mount => {
                        this.mount = mount;
                    }}
                />
                <div style={{position:'absolute', top:'12vh',
                    left:'2vw', color:'white',
                    display:'flex', flexDirection: 'column'
                    }}>
                    <div>Tree</div>
                    {tree != null && tree.traverseDF(function(node) {
                        return (
                            <div>{node.data}</div>
                        )
                    })}
                </div>
            </div>
        );
    }
}
export default Shape;

/*
[{label:'label1',
children:[
    {label:'label1-1',
        children : [
            {label:'label1-1-1',
            children:[
                    {label:'label1-1-1-1'}
            ]}
        ]},
    {label:'label1-2',
        children : [
            {label:'label1-2-1',
            children:[
                    {label:'label1-2-1-1'}
            ]}
        ]},    
]}]
*/