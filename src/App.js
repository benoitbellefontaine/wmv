import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header'

import alphaMale from './assets/obj/male02/male02.obj';
import flatiron from './assets/obj/flatiron/13943_Flatiron_Building_v1_l1.obj';
import mnogohome from './assets/obj/mnogohome/building.obj';

var opts = [
  {name:'district 1',source:alphaMale},
  {name:'district 2',source:flatiron},
  {name:'district 3',source:mnogohome},
];

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          district_source: '../assets/obj/flatiron/13943_Flatiron_Building_v1_l1.obj', 
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
                
                    <div style={{width:'300px',borderRight:'1px solid lightgray',marginRight:10}}>

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

                      <div style={{fontSize:'55%'}}>{this.state.district_source}</div>

                    </div>

                    <section style={{width:'100vw'}}>
                        <Header district={alphaMale} />
                    </section>

                </div>
            </div>

        );
    }
}
export default App;
