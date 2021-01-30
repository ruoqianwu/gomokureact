import React from 'react'
import { useParams } from 'react-router-dom'
import { socket } from '../../connection/socket'

const StartGame = (props) => {
    const { gameid } = useParams();
    const idData = {
        gameID : gameid,
        username: props.username,
        isCreator: props.isCreator
    }
    socket.emit('playerJoinGame', idData);

    return (
        <div style = {{display: 'flex', flexWrap: 'wrap', height: "5%"}}>
            <h3 style = {{color: '#757575', marginLeft: '1%', backgroundColor: 'rgba(255,255,255, 0.65)', padding: '5px 5px'}}>Made by Raymond &#38; Grace</h3>
        </div>
    )
}

export default StartGame