import React from 'react'
import { Redirect } from 'react-router-dom'
import { socket } from '../../connection/socket'
import { ColorContext } from '../context/colorcontext' 
import './stylesheets/onboard.css'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

/**
 *  Onboard is when first player creates a game
 */

class CreateGameroom extends React.Component {
    state = {
        DidGetUsername: false,
        inputName: '',
        gameID: ''
    }

    constructor(props){
        super(props);
        this.textArea = React.createRef();
    }

    typingUsername = () => {
        const input = this.textArea.current.value;
        this.setState({inputName: input});
    }

    send = () => {
        const gameID = Math.floor(Math.random() * 100000);
        this.setState({gameID: gameID})
        socket.emit('createNewGame', gameID)
    }

    render(){
        return(
            <React.Fragment>
                {this.state.DidGetUsername?
                    <Redirect to = {"/game/" + this.state.gameID}><button>start game</button></Redirect> 
                    : 
                    <div className = {'onboard-container'}>
                        <div className = {'onboard'}>
                            <h1>Enter your username: </h1>
                            <div style = {{width: '18%'}}>
                                <TextField 
                                inputRef = {this.textArea} 
                                onChange = {this.typingUsername}
                                id = "standard-password-input"
                                label = "Username"
                                type = "text"
                                variant = "standard"
                                size = 'medium'
                                fullWidth = {true}
                                />
                            </div>
                            <Button disabled = {!(this.state.inputName.length> 0)} 
                                    onClick= {() => {
                                        this.props.didRedirect()
                                        this.props.setUsername(this.state.inputName)
                                        this.setState({
                                            DidGetUsername: true
                                        })
                                        this.send()
                                    }} 
                                    size = 'large'>
                                    continue
                            </Button>
                        </div>
                    </div>
                }   
            </React.Fragment>
        )
        
    }
}

const Onboard = (props) => {
    const color = React.useContext(ColorContext)

    return <CreateGameroom didRedirect = {color.playerDidRedirect} setUsername = {props.setUsername}></CreateGameroom>
}
export default Onboard; 