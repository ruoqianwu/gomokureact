import React from 'react'
import Room from '../ui/room';
import StartGame from './startgame'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import './stylesheets/joinroom.css'

class JoinRoom extends React.Component {
    state = {
        didGetUsername: false,
        inputText: ''
    };

    constructor(props) {
        super(props);
        this.textArea = React.createRef();
    }

    typeUsername = () => {
        const typedText = this.textArea.current.value;

        this.setState({
            inputText: typedText
        })
    }

    render() {
        return (
            <React.Fragment>
                {
                    this.state.didGetUsername ?
                        <React.Fragment>
                            <StartGame username = {this.state.inputText} isCreator = {false} ></StartGame>
                            <Room myUserName = {this.state.inputText}></Room>
                        </React.Fragment>
                        :
                        <div className = "joinroom" style = {{backgroundColor: 'rgba(255,255,255, 0.65)'}}>
                            <h1>Enter your username: </h1>
                            <div style = {{width: '18%'}}>
                                <TextField 
                                    inputRef = {this.textArea} 
                                    onChange = {this.typeUsername}
                                    id = "standard-password-input"
                                    label = "Username"
                                    type = "text"
                                    variant = "standard"
                                    size = 'medium'
                                    fullWidth = {true}
                                />
                                <Button disabled = {!(this.state.inputText.length> 0)} 
                                        onClick= {() => {
                                            this.setState({
                                                didGetUsername: true
                                            })}} 
                                        fullWidth = {true}
                                        size = 'large' 
                                        >continue
                                </Button>
                            </div>
                        </div>
                }
            </React.Fragment>
        )
    }
}

export default JoinRoom;