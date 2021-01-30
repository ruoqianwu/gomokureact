import React from 'react';
import { Redirect } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import './stylesheets/opponentonboard.css'


class OpponentOnboard extends React.Component {
    state = {
        gameID: '',
        didGetGameID: false,
    }

    constructor(props){
        super(props);
        this.textArea = React.createRef();
    }

    typingGameid = () => {
        const input = this.textArea.current.value;
        this.setState({gameID: input});
    }
    render() {
        return (
            this.state.didGetGameID ? 
                <Redirect to = {"/game/" + this.state.gameID}><button>join game</button></Redirect> 
                : 
                <div className = {'opponentonboard'}  style = {{backgroundColor: 'rgba(255,255,255, 0.65)'}}>
                    <h1>Insert Room ID below</h1>
                    <div>
                        <TextField 
                            inputRef = {this.textArea} 
                            onChange = {this.typingGameid} 
                            fullWidth = {true}
                            id = "standard-password-input"
                            label = "Room ID"
                            type = "text"
                            variant = "standard"
                            size = 'medium'
                        />
                        <Button disabled = {!(this.state.gameID.length> 0)} 
                                onClick= {() => {
                                    this.setState({
                                        didGetGameID: true
                                    })
                                }}
                                fullWidth = {true}
                                size = 'large' 
                                >Enter the game room
                        </Button>
                    </div>
                </div>
        )
    }
}

export default OpponentOnboard;



