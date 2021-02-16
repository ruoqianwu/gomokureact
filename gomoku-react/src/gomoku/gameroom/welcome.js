import React from 'react'
import { Link } from 'react-router-dom'
import './stylesheets/welcome.css'
import Button from '@material-ui/core/Button'

const Welcome = () => {
    return (
        <React.Fragment> 
            <div style = {{display: 'flex', flexWrap: 'wrap', height: "5%"}}>
                <h3 style = {{color: '#757575', marginLeft: '1%', backgroundColor: 'rgba(255,255,255, 0.65)', padding: '5px 5px'}}>Made by Raymond &#38; Grace</h3>
            </div>
            <div style = {{backgroundColor: 'rgba(255,255,255, 0.65)'}}>
            
            <div className = {'welcome'}>
                <h1 style = {{fontSize: "4vw"}}>Welcome to the gomoku game!</h1>
            </div>
            <div className = {'link'}>
                <Button className = {'welcome-button'} size = 'large'>
                    <Link to = {"/onboard"} className="welcome-link">create new game</Link>
                </Button>
                <Button className = {'welcome-button'} size = 'large'>
                    <Link to = {"/opponentonboard"} className="welcome-link">join game</Link>
                </Button>
                <Button className = {'welcome-button'} size = 'large'>
                    <Link to = {"/aigame"} className="welcome-link">Play with AI</Link>
                </Button>
            </div>
        </div>
        </React.Fragment>

    )
}

export default Welcome