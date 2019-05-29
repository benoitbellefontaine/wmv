import React, { useState, useEffect, useRef } from 'react';
import threeEntryPoint from "./threejs/threeEntryPoint"
import "./header.css"

export default class Header extends React.Component {
//export default function Header(props) {
    //const refContainer = useRef(element => this.threeRootElement = element);
    
    componentDidMount() {
        this.sceneManager = 
            threeEntryPoint(this.threeRootElement, "LittleGreenDiv", this.props.district );
            console.log('this.sceneManager',this.sceneManager);
    }

    componentDidUpdate(prevProps) {
        console.log("componentDidUpdate");
        // Typical usage (don't forget to compare props):
        if (this.props.district !== prevProps.district) {
            if (this.sceneManager !== null) {
                console.log("componentDidUpdate : this.sceneManager != null");
                this.sceneManager.load(this.props.district);
            }
        }
    }

    // Similar to componentDidMount and componentDidUpdate:
    /*useEffect(() => {
        threeEntryPoint(refContainer, "LittleGreenDiv", this.props.district );
    });*/

    render () {
        //const inputEl = useRef(null);
        return (
            <div className="header-header" ref={element => this.threeRootElement = element} id="LittleGreenDiv" />
        );
    }
}