import React, { Component } from "react";
//import Link from 'next/link';
import { uniqueId } from 'lodash';
import PropTypes from 'prop-types';

export default class Tree extends Component {

    renderSubTree = (children) => {
        if (children && children.length > 0) {
        return (
            <ul className="menu__submenu">
            {this.renderTreeItems(children)}
            </ul>
        );
        }
    };

    renderTreeItems = (items) => 
        items.children.map((item, i) => {
        const { label, children } = item;
        return (
            <li className="menu__item" key={uniqueId(`item-${i}-`)}>
                {item.label}
            {this.renderSubTree(children)}
            </li>
        );
    });


    render() {
        const className = this.props.className
        ? `menu ${this.props.className}`
        : 'menu';
        return (
            <ul>
                {this.renderTreeItems(this.props.items)}
            </ul>
        );
    }
}