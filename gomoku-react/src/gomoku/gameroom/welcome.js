import React from 'react'
import { Link } from 'react-router-dom'
import './stylesheets/welcome.css'
import Button from '@material-ui/core/Button'

const Welcome = () => {
    return (
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
                    <Link to = {"/aigame"} className="welcome-link">AI game</Link>
                </Button>
            </div>
        </div>
    )
}

export default Welcome