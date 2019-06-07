import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Tree from './tree/tree';
import Root from './tree/root';
import Switch from './tree/switch';
import Hotspot from './tree/hotspot';
import Link from './tree/link';
import ReactTree from './ReactTree'
import * as THREE from 'three';
import { uniqueId } from 'lodash';

import alphaMale  from './assets/obj/districts/male02.obj';
import flatiron   from './assets/obj/districts/male02.obj';
import alphaFemale from './assets/obj/districts/female02.obj';
import ninja from './assets/obj/districts/ninjaHead_Low.obj';

// data
import data from './treedata'

var opts = [
  {name:'district 1',source:alphaMale},
  {name:'district 2',source:alphaFemale},
  {name:'district 3',source:ninja},
];

var opts2 = ['WEBGL','CSS3D'];

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          district_source: alphaMale,
          district_name: 'district 1',
          renderer: 'WEBGL',
          zoom: 0,
          objects: [],
          meshes: [],
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeRenderer = this.handleChangeRenderer.bind(this);
        this.handleZoomPlus = this.handleZoomPlus.bind(this);
        this.handleZoomMinus = this.handleZoomMinus.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const result = opts.filter(opt => opt.name === event.target.value);
        this.setState({district_name: event.target.value, district_source:result[0].source});
    }
      
    handleChangeRenderer(event) {
        this.setState({renderer: event.target.value});
    }

    handleZoomPlus(event) {
      this.setState({zoom:1});
    }

    handleZoomMinus(event) {
      this.setState({zoom:0});
    }

    renderSubTree = (networkg,children) => {
      if (children && children.length > 0) {
        this.renderTreeItems(networkg,children);
      }
    };

    renderTreeItems = (networkg,items) => 
      items.map((item, i) => {
        const { name, children, type, pos, dim, start, end } = item;
        switch(type) {
          case 'switch':  networkg.push(Switch.getInstance({name:name,pos:pos,dim:dim})); break;
          case 'hotspot': networkg.push(Hotspot.getInstance({name:name,pos:pos,dim:dim})); break;
          case 'link':    networkg.push(Link.getInstance({name:name,start:start,end:end})); break;
        }
        this.renderSubTree(networkg,children);
    });
      
    createTree = (data) => {

      var size = 10, space = 2,
          root = null,
          cubes = new THREE.Group(),
          elements = [];

      // building dims dx:[-50,50] dy:[0,40] dz:[-10,10]

      root = Root.getInstance({name:data.name,pos:data.pos,dim:data.dim});
      
      for (var i=-5;i<6;i++) {
        for (var j=0;j<4;j++) {
          for (var k=-1;k<2;k++) {
            var geometry = new THREE.BoxGeometry(size-space,size-space,size-space);
            //var material = new THREE.MeshPhongMaterial({color: 0x8888ff,transparent:true,opacity:0.3});
            var material = new THREE.MeshStandardMaterial( { color: 0x8888ff, metalness: 0.9, roughness: 0.9, transparent:true, opacity:0.3 } )
            var mesh = new THREE.Mesh(geometry,material);
            mesh.position.set(i*(size),j*(size),k*(size));
            //cubes.add(mesh);
          }
        }
      }

      cubes.add(root);

      //this.renderTreeItems(elements,data.children);

      return {root,cubes,elements};

    }

    render () {

      const building = this.createTree(data);
     
      return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                wifi map viewer
            </header>
            <div style={{display:'flex',padding:'0px 0px 0px 0px',height:'100vh',boxSizing: 'border-box'}}>

                <div style={{minWidth:'300px',borderRight:'1px solid lightgray',padding:'0 10px 0 10px'}}>

                  <form onSubmit={this.handleSubmit} style={{padding:0}}>
                    <div className="form-group">
                      <label htmlFor="exampleFormControlSelect1">select district</label>
                      <select className="form-control" id="exampleFormControlSelect1" onChange={this.handleChange}>
                        {opts.map((district,index)=>{
                            return (<option key={index} >{district.name}</option>)
                        })}
                      </select>
                    </div>
                  </form>
                  <form onSubmit={this.handleSubmit} style={{padding:0}}>
                    <div className="form-group">
                      <label htmlFor="exampleFormControlSelect1">select renderer</label>
                      <select className="form-control" id="exampleFormControlSelect1" onChange={this.handleChangeRenderer}>
                        {opts2.map((renderer,index)=>{
                            return (<option key={index} >{renderer}</option>)
                        })}
                      </select>
                    </div>
                  </form>

                  <div style={{height:'80vh',border:'1px solid lightgray',borderRadius:'.25rem',textAlign:'left',padding:5,overflow:'hidden',overflowY:'scroll'}}>
                        {data.name}
                        <ReactTree items={data.children} />
                  </div>

                </div>

                <section style={{width:'100vw',height:'100vh'}}>
                  <div style={{display:'block',position:"fixed",marginLeft:'10px',bottom:'10px'}}>
                    <div style={{borderRadius:'10%',backgroundColor:"lightgray",fontSize:'120%',fontWeigth:'700',padding:'0 4px 5px 5px',marginBottom:'5px'}} onClick={this.handleZoomPlus}>
                        +
                    </div>
                      <div style={{borderRadius:'10%',backgroundColor:"lightgray",fontSize:'120%',fontWeigth:'700',padding:'0 4px 5px 5px'}} onClick={this.handleZoomMinus}>
                        -
                    </div>
                  </div>
                  <Header district={this.state.district_source} renderer={this.state.renderer} root={building} zoom={this.state.zoom}s />
                </section>

            </div>
        </div>
      );
    }
}
export default App;

/*
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                wifi map viewer
            </header>
            <div style={{display:'flex',padding:'0px 0px 0px 0px',height:'100vh',boxSizing: 'border-box'}}>

                <div style={{minWidth:'300px',borderRight:'1px solid lightgray',padding:'0 10px 0 10px'}}>

                  <form onSubmit={this.handleSubmit} style={{padding:0}}>
                    <div className="form-group">
                      <label htmlFor="exampleFormControlSelect1">select district</label>
                      <select className="form-control" id="exampleFormControlSelect1" onChange={this.handleChange}>
                        {opts.map((district,index)=>{
                            return (<option key={index} >{district.name}</option>)
                        })}
                      </select>
                    </div>
                  </form>

                  <div style={{height:'80vh',border:'1px solid lightgray',borderRadius:'.25rem',textAlign:'left',padding:5,overflow:'hidden',overflowY:'scroll'}}>
                        {data.name}
                        <ReactTree items={data.children} />
                  </div>

                </div>

                <section style={{width:'100vw',height:'100vh'}}>
                    <Header district={this.state.district_source} root={rootgroup.networkg} />
                </section>

            </div>
        </div>
*/