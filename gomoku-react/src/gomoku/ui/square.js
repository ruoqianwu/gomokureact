import React from 'react'
import './stylesheets/square.css'

class Square extends React.Component {

    render() {
        let style = {position: `absolute`,
                     top: `${this.props.y}px`,
                     left: `${this.props.x}px`}
        return (
            <button className = {`square ${this.props.color}`}
                    style = {style} 
                    onClick = {() => this.props.onClick()}
                    disabled = {!this.props.isMyTurn}>
            </button>
        )
    }
}

export default Square