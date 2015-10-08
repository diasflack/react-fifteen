"use strict";

var React = require('react');

export default class GameCell extends React.Component{
    render() {
        var animate = this.props.winStateAnimation ? " animate" : "",
            classString = "cel-" + this.props.text + animate;
        return <div className={classString}><span className="inner animate" onClick={this.props.onClick} >{this.props.text}</span><span className="back"></span></div>
    }
}
