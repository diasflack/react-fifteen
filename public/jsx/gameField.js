"use strict";

var React = require('react');

import GameCell from "./gameCell";
import PlayAgain from "./playAgain";
import {createFilledArray, shuffleArray} from "./helpers";

export default class GameField extends React.Component{
    constructor(props) {
        super(props);
        this._handlePlayAgainClick = this._handlePlayAgainClick.bind(this);
        this._handleCellClick = this._handleCellClick.bind(this);
        this.state = this.getState();
    }

    getState() {
        var winStateArray = createFilledArray(Math.pow(this.props.rowNumber, 2)),
            cells = shuffleArray(winStateArray);
        return {
            cells: cells,
            emptyCellIndex: cells.indexOf(0),
            winStateArray: winStateArray.slice(1).join(),
            winState: false
            };
    }

    _handlePlayAgainClick() {
        this.setState(this.getState());
    }

    _handleCellClick(event) {
        this.switchCells(parseInt(event.target.innerText));
    }

    switchCells(cellNumber) {
        var cells = this.state.cells,
            emptyCellIndex = this.state.emptyCellIndex,
            switchCellIndex = cells.indexOf(cellNumber),
            winState;

        if (this.isSwitchable(switchCellIndex, emptyCellIndex)) {
            cells[emptyCellIndex] = cellNumber;
            cells[switchCellIndex] = 0;

            winState = this.isWin(cells, this.state.winStateArray);
            this.setState({cells: cells, emptyCellIndex:switchCellIndex, winState: winState});
        }
    }

    isSwitchable(switchCellIndex, emptyCellIndex) {
        var result = (((emptyCellIndex % this.props.rowNumber) !== (this.props.rowNumber - 1) && (emptyCellIndex + 1 )) === switchCellIndex) ||
                     ((emptyCellIndex % this.props.rowNumber !== 0) && ((emptyCellIndex - 1) === switchCellIndex)) ||
                     ((emptyCellIndex + this.props.rowNumber) === switchCellIndex) ||
                     ((emptyCellIndex - this.props.rowNumber) === switchCellIndex);
        return result;
    }

    isWin(currentState, winState) {
        return currentState.join().indexOf(winState) > -1;
    }

    render() {
        var gameCells = this.state.cells.map((function(el){return <GameCell key={el} text={el} onClick={this._handleCellClick} winStateAnimation={this.state.winState}  />}).bind(this));
        var playAgain = this.state.winState ? <PlayAgain onClick={this._handlePlayAgainClick} /> : "";

        return <section id="gameField">{gameCells} {playAgain} </section>;
    }
}

GameField.propTypes = { rowNumber: React.PropTypes.number };
GameField.defaultProps = { rowNumber: 4 };