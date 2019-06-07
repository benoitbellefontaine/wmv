import React, { useState, useEffect, useRef } from 'react';
import threeEntryPoint from "./threejs/threeEntryPoint"
import "./header.css"

export default class Header extends React.Component {
//export default function Header(props) {
    //const refContainer = useRef(element => this.threeRootElement = element);
    
    componentDidMount() {
        this.sceneManager = threeEntryPoint(this.threeRootElement, "canvas", this.props.district, this.props.root );
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
        if (this.props.zoom !== prevProps.zoom) {
            if (this.sceneManager !== null) {
                console.log("componentDidUpdate : this.sceneManager != null");
                this.sceneManager.zoom(this.props.zoom);
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
            <div style={{width:"100&",height:"100%"}}>
                <div className="header-header" ref={element => this.threeRootElement = element} id="canvas" />
            </div>
        );
    }
}