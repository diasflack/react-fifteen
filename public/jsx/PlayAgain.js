"use strict";

var React = require('react');

export default class PlayAgain extends React.Component{
    render() {
        return <div className="playAgain">
            <p>Congrats!</p>
            <button onClick={this.props.onClick}>Play Again!</button>
        </div>
    }
}