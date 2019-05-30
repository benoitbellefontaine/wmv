import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Root from './tree/root';
import Switch from './tree/switch';
import Hotspot from './tree/hotspot';
import ReactTree from './ReactTree'
import * as THREE from 'three';

import alphaMale  from './assets/obj/districts/male02.obj';
import flatiron   from './assets/obj/districts/male02.obj';
import alphaFemale from './assets/obj/districts/female02.obj';
import ninja from './assets/obj/districts/ninjaHead_Low.obj';

var opts = [
  {name:'district 1',source:alphaMale},
  {name:'district 2',source:alphaFemale},
  {name:'district 3',source:ninja},
];

function createTree() {

    var root = Root.getInstance();

    var switch1 = Switch.createInstance(root,{name:'switch1',type:'switch',x:100,y:0,z:0})
    var switch2 = Switch.createInstance(root,{name:'switch2',type:'switch',x:0,y:100,z:0})
    var switch3 = Switch.createInstance(root,{name:'switch3',type:'switch',x:0,y:0,z:100})
    var switch4 = Switch.createInstance(root,{name:'switch4',type:'switch',x:-100,y:0,z:0})
    var switch5 = Switch.createInstance(root,{name:'switch5',type:'switch',x:0,y:-100,z:0})
    var switch6 = Switch.createInstance(root,{name:'switch6',type:'switch',x:-0,y:0,z:-100})

    var hotspot1 = Hotspot.createInstance(switch1.instance,{name:'hotspot1',type:'hotspot',x:0,y:0,z:35})
    var hotspot2 = Hotspot.createInstance(switch1.instance,{name:'hotspot2',type:'hotspot',x:-0,y:0,z:-15})
    var hotspot3 = Hotspot.createInstance(switch2.instance,{name:'hotspot3',type:'hotspot',x:25,y:0,z:0})
    var hotspot4 = Hotspot.createInstance(switch3.instance,{name:'hotspot4',type:'hotspot',x:0,y:25,z:0})
    var hotspot5 = Hotspot.createInstance(switch4.instance,{name:'hotspot5',type:'hotspot',x:0,y:-25,z:0})
    var hotspot6 = Hotspot.createInstance(switch4.instance,{name:'hotspot6',type:'hotspot',x:0,y:25,z:0})
    var hotspot7 = Hotspot.createInstance(switch5.instance,{name:'hotspot7',type:'hotspot',x:0,y:-10,z:0})
    var hotspot8 = Hotspot.createInstance(switch6.instance,{name:'hotspot8',type:'hotspot',x:0,y:25,z:0})
    var hotspot9 = Hotspot.createInstance(switch6.instance,{name:'hotspot9',type:'hotspot',x:0,y:-10,z:0})

    /*group.add( hotspot1.instance );
    group.add( hotspot2.instance );
    group.add( hotspot3.instance );
    group.add( hotspot4.instance );
    group.add( hotspot5.instance );
    group.add( hotspot6.instance );*/
    

    console.log(root)

    return root;

}

const root = createTree();

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          district_source: alphaMale,
          district_name: 'district 1'
        };
        this.handleChange = this.handleChange.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        console.log('pressed handleChange:',event.target.value);
        const result = opts.filter(opt => opt.name === event.target.value);
        console.log(result[0].source)
        this.setState({district_name: event.target.value, district_source:result[0].source});
    }

    /*handleSubmit(event) {
        alert('Your favorite flavor is: ' + this.state.district);
        event.preventDefault();
    }*/

    render () {

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    wifi map viewer
                </header>
                <div style={{display:'flex',padding:'10px 10px 0px 10px',height:'90vh',boxSizing: 'border-box'}}>
                
                    <div style={{width:'300px',borderRight:'1px solid lightgray',paddingRight:10}}>

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

                      <div style={{height:'75vh',fontSize:'75%',border:'1px solid lightgray',borderRadius:'.25rem',textAlign:'left',padding:5,overflow:'hidden',overflowY:'scroll'}}>
                        root
                        <ReactTree items={root.children} />
                      </div>

                    </div>

                    <section style={{width:'100vw'}}>
                        <Header district={this.state.district_source} root={root} />
                    </section>

                </div>
            </div>

        );
    }
}
export default App;