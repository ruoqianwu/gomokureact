import React from 'react'
import BoardImage from '../../assets/gameboard.jpg'
import Square from './square.js';
import winCondition from '../model/game.js';


class Board extends React.Component {
    state = {
        squares: Array(15).fill(null).map(row => new Array(15).fill(null)),
        isBlack: true,
        hasWinner: false
    }

    handleClick(i, j) {
        if (this.state.hasWinner===true){
            alert('The game has ended')
            return;
        }
        const squares = this.state.squares.slice();
       
        if (squares[i][j] !== null){
            alert("You can't play here!");
            return;
        }
        this.state.isBlack ? squares[i][j] = 'black' : squares[i][j] = 'white';
        this.setState({squares: squares,
                       isBlack: !this.state.isBlack});
        if (winCondition(squares, i, j)==='black'||winCondition(squares, i, j)==='white'){
            this.setState({
                hasWinner: true
            });
            alert(winCondition(squares, i, j)+' won ')
        }
    }

    renderSquare(column, row) {
        return <Square
                    key = {column + row * 100}
                    x = {25 + column * 51}
                    y = {25 + row * 51}
                    color = {this.state.squares[row][column]}
                    onClick = {() => this.handleClick(row, column)}
                    />
    }
    
    render(){

        let board = this.state.squares.slice();

        return (
            <React.Fragment>
            <div style = {{
                    backgroundImage: `url(${BoardImage})`,
                    width: '794px',
                    height: '790px',}}>
                
                <div>
                    {board.map((rows, rindex) => {
                        return (rows.map((column, cindex) => {
                            return this.renderSquare(cindex, rindex);
                            })
                        )
                    })}
                </div>
            </div>
            </React.Fragment>
        )

    }
}
export default Board;