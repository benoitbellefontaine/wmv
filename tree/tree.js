import React from 'react';
import treeEntryPoint from "./treejs/treeEntryPoint";

export default class Tree extends React.Component {
    
    componentDidMount() { treeEntryPoint(this.treeRoot); }

    render () {
        return (
            <div ref={element => this.threeRootElement = element} />
        );
    }
}