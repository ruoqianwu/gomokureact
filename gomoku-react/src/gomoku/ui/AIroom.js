import React from 'react'
import Square from './square.js'
import BoardImage from '../../assets/gameboard.jpg'
import winCondition from '../model/winCondition.js';
import Button from '@material-ui/core/Button'
import aiMove from '../model/AI/ai.js'
import './stylesheets/AIroom.css'


const AIboard = (props) => {

    const [squares, setSquares] = React.useState(Array(15).fill(null).map(row => new Array(15).fill(null)));
    const [winner, setWinner] = React.useState('');

    React.useEffect(() => {
        winner !== '' && alert(`The winner is ${winner}!`);
    }, [winner]);


    const handleClick = (i, j) => {
        
        if (winner !== ''){
            alert('The game has ended')
            return;
        }


        if (squares[i][j] !== null){
            alert("You can't play here!");
            return;
        }

        let newSquares = squares.slice();
        props.isBlack ? newSquares[i][j] = 'black' : newSquares[i][j] = 'white';
        setSquares(newSquares);
        if (winCondition(newSquares, i, j)==='black' || winCondition(newSquares, i, j)==='white') {
            setWinner(winCondition(newSquares, i, j));
            return;
        }
        let tempSquares = squares.slice();
        let humanMove = [i,j]
        let aimove = aiMove(tempSquares, humanMove, props.isBlack);
        props.isBlack? tempSquares[aimove[0]][aimove[1]] = 'white' : tempSquares[aimove[0]][aimove[1]] = 'black';
        setSquares(tempSquares)
        if (winCondition(tempSquares, aimove[0], aimove[1])==='black' || winCondition(tempSquares, aimove[0], aimove[1])==='white') {
            setWinner(winCondition(tempSquares, aimove[0], aimove[1]));
        }
    }

    function renderSquare(column, row) {
        return <Square
            key = {column + row * 100}
            x = {25 + column * 51}
            y = {25 + row * 51}
            color = {squares[row][column]}
            isMyTurn = {true}
            onClick = {() => handleClick(row, column)}
            />
    }

    let board = squares.slice();
    if (!props.isBlack) {
        board[7][7] = "black"
    }
    return (
        <React.Fragment>
        <div style = {{
                backgroundImage: `url(${BoardImage})`,
                width: '794px',
                height: '790px',
                position: 'absolute',
                display: 'inline-block',
                left: String(window.innerWidth / 5) + "px"}}>         
            {board.map((rows, rindex) => {
                return (rows.map((column, cindex) => {
                    return renderSquare(cindex, rindex);
                    })
                )
            })}
        </div>
    </React.Fragment>
    )
}

const AIroom = () => {

    const [isBlack, setIsBlack] = React.useState(false);
    const [selectedColor, setSelectedColor] = React.useState(false);
    
    return (
        <React.Fragment>
            {
                selectedColor ? (
                    <div>
                        <div style={{position: "relative",
                                 height: String(window.innerHeight) + "px"
                                }}>
                                    <div style = {{display: 'flex', flexWrap: 'wrap', height: "5%"}}>
                                        <h3 style = {{color: '#757575', marginLeft: '1%', backgroundColor: 'rgba(255,255,255, 0.65)', padding: '5px 5px'}}>Made by Raymond &#38; Grace</h3>
                                    </div>
                            <AIboard isBlack = {isBlack} />
                        </div>
                    </div>
                ) : (
                    <div style = {{backgroundColor: 'rgba(255,255,255, 0.65)'}}>
                        <h1  style = {{
                            textAlign: "left",
                            marginLeft: String(window.innerWidth / 4) + "px",
                            marginTop: String(window.innerHeight / 10) + "px",
                            fontSize: '4vw'
                        }}>
                            Please choose your color:
                        </h1>
                        <br/>
                        <div className = "chooseColor">
                            <Button className = "colorBut"
                            size = 'large'
                            onClick = {() => {
                                setIsBlack(true);
                                setSelectedColor(true);
                            }}>BLACK</Button>
                            <Button className = "colorBut"
                            size = 'large'
                            onClick = {() => {
                                setIsBlack(false);
                                setSelectedColor(true);
                            }}>WHITE</Button>
                        </div>
                    </div>
                )
            }
        </React.Fragment>
    )
}

export default AIroom;