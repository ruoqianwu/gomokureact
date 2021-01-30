import React from 'react'
import { ColorContext } from '../context/colorcontext';
import Board from './board'
import { useParams } from 'react-router-dom'
import { socket } from '../../connection/socket'
import TextField from '@material-ui/core/TextField';
import './stylesheets/room.css'

const Room = (props) => {
    
    const color = React.useContext(ColorContext);
    const {gameid} = useParams();
    const [opponentDidJoinTheGame, didJoinGame] = React.useState(false);
    const [opponentUserName, setUserName] = React.useState('');
    const [gameSessionDoesNotExist, doesntExist] = React.useState(false);

    React.useEffect(() => {

        socket.on('status', statusUpdate => {
            console.log(statusUpdate);
            alert(statusUpdate);
            if (statusUpdate === 'The game session does not exist' || statusUpdate === 'There are already 2 players in the room.'){
                doesntExist(true);
            }
        });

        socket.on('start game', (opponentUserName) => {
            console.log('START');
            if (opponentUserName !== props.myUserName) {
                setUserName(opponentUserName);
                console.log("opponent username is: " + opponentUserName)
                didJoinGame(true);
            } else {
                socket.emit('request username', gameid);
            }
        });

        socket.on('give username', (socketID) => {
            if (socket.id !== socketID) {
                console.log("give username stage: " + props.myUserName);
                socket.emit('received username', {username: props.myUserName, gameID: gameid});
            }
        });

        socket.on('get opponent username', (data) => {
            if (socket.id !== data.socketID) {
                setUserName(data.username);
                didJoinGame(true);
            }
        });
    }, [gameid, props.myUserName])

    return(
        <React.Fragment>
            {
                opponentDidJoinTheGame ? (
                    <div style={{position: "relative",
                                 height: String(window.innerHeight) + "px"
                                }}>
                        <Board gameID = {gameid} 
                                isBlack = {color.didRedirect}
                                opponentUsername = {opponentUserName}
                                username = {props.myUserName}
                                />
                    </div>
                ) : gameSessionDoesNotExist ? (
                    <div>
                        <h1 style={{ textAlign: "center", marginTop: "200px" }}> Something is wrong! </h1> 
                    </div>
                ) : (
                    <div className = "inviteFriend">
                        <h1 style = {{
                            textAlign: "left",
                            marginLeft: String(window.innerWidth / 4) + "px",
                            marginTop: String(window.innerHeight / 10) + "px",
                        }}>
                            Hey <strong> {props.myUserName}</strong>, 
                            <br/><br/>
                            send the Room ID to start the game
                            <br/><br/><br/>
                            <div style = {{marginLeft: String(window.innerWidth / 10) + "px"}}> 
                                <TextField   
                                className = "roomIDTextField"       
                                id = "outlined-read-only-input"
                                label = "Room ID:"
                                defaultValue = {gameid}
                                size = "medium"
                                InputProps = {{
                                    readOnly: true,
                                }}
                                variant = "outlined"
                                ></TextField>
                            </div>
                        </h1>
                        <br/>

                        <h1 style={{textAlign: "left", marginTop: "3%", marginLeft: String(window.innerWidth / 4) + "px"}}>
                            {" "}
                            Waiting for other opponent to join the game... {" "}
                        </h1>
                    </div>
                )
            }
        </React.Fragment>
    )
}

export default Room;

