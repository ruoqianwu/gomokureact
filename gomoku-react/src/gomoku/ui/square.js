import React from 'react'
import './square.css'

class Square extends React.Component {

    render() {
        let style = {position: `absolute`,
                     top: `${this.props.y}px`,
                     left: `${this.props.x}px`}
        return (
            <button className={this.props.color} style={style} onClick={() => this.props.onClick()}>
            </button>
        )
    }
}

export default Square