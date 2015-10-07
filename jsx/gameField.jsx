(function (global){

    "use strict";

    var React = global.React;

    var createFilledArray = function(numberOfElements) {
        return Array.apply(null, Array(numberOfElements)).map(function(el, i){return i});
    };

    var shuffleArray = function (array) {
        var random = array.map(Math.random);
        return array.slice().sort(function(a, b) {
            return random[a] - random[b];
        });
    };

    var GameCell = React.createClass({
        render: function() {
            var animate = this.props.winStateAnimation ? " animate" : "",
                classString = "cel-" + this.props.id + animate;
            return <div className={classString}><span className="inner animate" onClick={this.props.onClick} >{this.props.id}</span><span className="back"></span></div>
        }
    });

    var PlayAgain = React.createClass({
        render: function () {
            return <div className="playAgain">
                        <p>Congrats!</p>
                        <button onClick={this.props.onClick}>Play Again!</button>
                   </div>
        }
    });


    var GameField = React.createClass({

        getDefaultProps: function() {
            return {
                rowNumber: 4
            }
        },

        getInitialState: function() {
            var winStateArray = createFilledArray(Math.pow(this.props.rowNumber, 2)),
                cells = shuffleArray(winStateArray);
            return {
                cells: cells,
                emptyCellIndex: cells.indexOf(0),
                winStateArray: winStateArray.slice(1).join(),
                winState: false
                };
        },

        handlePlayAgainClick: function() {
            this.replaceState(this.getInitialState());
        },

        handleCellClick: function(event) {
            this.switchCells(parseInt(event.target.innerText));
        },

        switchCells: function (cellNumber) {
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
        },

        isSwitchable: function (switchCellIndex, emptyCellIndex) {
            var result = (((emptyCellIndex % this.props.rowNumber) !== (this.props.rowNumber-1) && (emptyCellIndex + 1 )) === switchCellIndex) ||
                         ((emptyCellIndex % this.props.rowNumber !== 0) && ((emptyCellIndex - 1) === switchCellIndex)) ||
                         ((emptyCellIndex + this.props.rowNumber) === switchCellIndex) ||
                         ((emptyCellIndex - this.props.rowNumber) === switchCellIndex);
            return result;
        },

        isWin: function (currentState, winState) {
            return currentState.join().indexOf(winState) > -1;
        },

        render: function() {
            var gameCells = this.state.cells.map((function(el){return <GameCell id={el} onClick={this.handleCellClick} winStateAnimation={this.state.winState}  />}).bind(this));
            var playAgain = this.state.winState ? <PlayAgain onClick={this.handlePlayAgainClick} /> : "";

            return <section id="gameField">{gameCells} {playAgain} </section> ;
        }
    });

    React.render(
    <GameField />,
        document.getElementById('container')
    );

})(window);