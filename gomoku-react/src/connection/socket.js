import io from 'socket.io-client'

const URL = 'https://react-gomoku-backend.herokuapp.com/'
const socket = io(URL)

var mySocketID

socket.on('createNewGame', statusUpdate => {
    console.log('created new game');
    mySocketID = statusUpdate.mySocketID
})

export{socket, mySocketID}