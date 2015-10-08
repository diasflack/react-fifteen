"use strict";

var React = require('react');

export var PlayAgain = React.createClass({
    render: function () {
        return <div className="playAgain">
            <p>Congrats!</p>
            <button onClick={this.props.onClick}>Play Again!</button>
        </div>
    }
});