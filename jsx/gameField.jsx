(function (global){

    var React = global.React;

    var createMixedArray = function (numberOfElements) {
        var newArray = Array.apply(null, Array(numberOfElements)).map(function(el, i){return i}),
            currentIndex = numberOfElements,
            temp,
            randomIndex;

        while (0 !== currentIndex) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex --;

            temp = newArray[currentIndex];
            newArray[currentIndex] = newArray[randomIndex];
            newArray[randomIndex] = temp;
        }

        return newArray

    };

    var GameCell = React.createClass({
        render: function() {
            var classString = "cel-" + this.props.id;
            return <span className={classString}><span className="inner" onClick={this.props.onClick} >{this.props.id}</span></span>
        }
    });


    var GameField = React.createClass({

        getDefaultProps: function() {
            return {
                rowNumber: 4
            }
        },

        getInitialState: function() {
            var cells = createMixedArray(Math.pow(this.props.rowNumber, 2));
            return {cells: cells,
                    emptyCellIndex: cells.indexOf(0)};
        },

        handleCellClick: function(event) {
            this.switchCells(parseInt(event.target.innerText));
        },

        switchCells: function (cellNumber) {
            var cells = this.state.cells,
                emptyCellIndex = this.state.emptyCellIndex,
                switchCellIndex = cells.indexOf(cellNumber);

            if (this.isSwitchable(switchCellIndex, emptyCellIndex)) {
                cells[emptyCellIndex] = cellNumber;
                cells[switchCellIndex] = 0;

                this.setState({cells: cells, emptyCellIndex:switchCellIndex});
            }
        },

        isSwitchable: function (switchCellIndex, emptyCellIndex) {
            var result = (((emptyCellIndex % this.props.rowNumber) !== (this.props.rowNumber-1) && (emptyCellIndex + 1 )) === switchCellIndex) ||
                         ((emptyCellIndex % this.props.rowNumber !== 0) && ((emptyCellIndex - 1) === switchCellIndex)) ||
                         ((emptyCellIndex + this.props.rowNumber) === switchCellIndex) ||
                         ((emptyCellIndex - this.props.rowNumber) === switchCellIndex);
            return result;
        },

        render: function() {
            var gameCells = this.state.cells.map((function(el){return <GameCell id={el} onClick={this.handleCellClick}  />}).bind(this));

            return <section id="gameField">{gameCells}</section>;
        }
    });

    React.render(
    <GameField />,
        document.getElementById('container')
    );

})(window);