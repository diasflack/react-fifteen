"use strict";

var React = require('react');

export var GameCell = React.createClass({
    render: function() {
        var animate = this.props.winStateAnimation ? " animate" : "",
            classString = "cel-" + this.props.id + animate;
        return <div className={classString}><span className="inner animate" onClick={this.props.onClick} >{this.props.id}</span><span className="back"></span></div>
    }
});
