import React from 'react'
import BoardImage from '../../assets/gameboard.jpg'
import Square from './square.js';
import winCondition from '../model/winCondition.js';
import StatusBar from './statusbar.js'
import { socket } from '../../connection/socket'
import Sound from '../../assets/clickSound.mp3'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Redirect } from 'react-router-dom'


class Board extends React.Component {

    state = {
        squares: Array(15).fill(null).map(row => new Array(15).fill(null)),
        hasWinner: false,
        isBlackPlayerTurn: true,
        audio: new Audio(Sound),
        redirect: false
    }

    componentDidMount() {
        socket.on('opponent move', move => {
            if (move.playerColorThatMovedIsBlack !== this.props.color) {
                this.newMove(move.squares, false, move.i, move.j);
                this.setState({
                    isBlackPlayerTurn: !move.playerColorThatMovedIsBlack
                })
            }
        })
    }

    newMove = (currentSquares, isMyMove, i, j) => {
        if (isMyMove) {
            socket.emit('new move', {
                nextPlayerColorToMove: !this.props.isBlack,
                playerColorThatMovedIsBlack: this.props.isBlack,
                gameID: this.props.gameID,
                squares: this.state.squares,
                i: i,
                j: j
            })
        }

        this.setState({squares: currentSquares,
            isBlackPlayerTurn: !this.props.isBlack});

        if (winCondition(currentSquares, i, j)==='black' || winCondition(currentSquares, i, j)==='white'){
            this.setState({
                hasWinner: true,
            });
            let winner = this.state.isBlackPlayerTurn ? "White" : "Black"
            socket.emit('has winner', {
                winner: winner,
                gameID: this.props.gameID
            })
            setTimeout(() => {
                this.setState({
                    redirect: true,
                })
            }, 5000)
        }
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
        this.props.isBlack ? squares[i][j] = 'black' : squares[i][j] = 'white';

        this.newMove(squares, true, i, j)

        this.state.audio.play();
    }

    renderSquare(column, row) {
        return <Square
                    key = {column + row * 100}
                    x = {25 + column * 51}
                    y = {25 + row * 51}
                    color = {this.state.squares[row][column]}
                    isMyTurn = {(this.props.isBlack && this.state.isBlackPlayerTurn) || (!this.props.isBlack && !this.state.isBlackPlayerTurn)}
                    onClick = {() => this.handleClick(row, column)}
                    />
    }
    
    render() {

        let board = this.state.squares.slice();

        return (
            <React.Fragment>
                {this.state.redirect?
                <Redirect to = "/"></Redirect> :
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
                                return this.renderSquare(cindex, rindex);
                                })
                            )
                        })}
                    </div>
                    <StatusBar isBlack = {this.props.isBlack}
                                opponentUsername = {this.props.opponentUsername}
                                username = {this.props.username}
                                currentIsBlack = {this.state.isBlackPlayerTurn}
                    />
                    <WinnerModal ></WinnerModal>
                </React.Fragment>}
            </React.Fragment>
        )

    }
}
export default Board;

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
}));

export function WinnerModal(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [winner, setWinner] = React.useState('');
    const [counter, setCounter] = React.useState(5);
    React.useEffect(() => {
        socket.on('open modal', (winner) => {
            setOpen(true);
            setWinner(winner);
            setCounter(5)
        });
    })
    React.useEffect(() => {
        if (counter > 0) {
            setTimeout(()=> {setCounter(counter - 1)}, 1000);  
        }
    })
  
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <h2 id="transition-modal-title">The game has ended!</h2>
              <p id="transition-modal-description">{winner} player won the game! <br/> Redirect in {counter} seconds</p>
            </div>
          </Fade>
        </Modal>
      </div>
    );
}