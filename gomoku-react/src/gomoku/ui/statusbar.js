import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        minWidth: 200,
        height: 790,
        position: 'relative',
        backgroundColor: '#895300',
    },
    opponent: {
        position: 'absolute',
        top: '15px',
        fontSize: '20px',
        color: '#ffe6aa'
    },
    turnIndicator: {
        position: 'absolute',
        top: '50%',
        transform: 'translate(0, -50%)',
        fontSize: '18px',
        color: '#ffe6aa'
    },
    player: {
        position: 'absolute',
        bottom: '15px',
        fontSize: '20px',
        color: '#ffe6aa'

    }
})


const StatusBar = (props) => {
    const classes = useStyles();
    
    return (
        <div style = {{display: 'inline-block',
                        position: 'absolute',
                        left: String(window.innerWidth / 5 + 794) + "px",
                        height: '790px',
                        }}>
            <Card className = {classes.root}>
                <CardContent>
                    <Typography className = {classes.opponent} variant="h5" component="h2">
                        Opponent: {props.opponentUsername} 
                        <br/>
                        Colour: {!props.isBlack ? "BLACK" : "WHITE"}
                    </Typography>
                    <Typography className = {classes.turnIndicator} variant="h5" component="h2">
                       <strong>{props.currentIsBlack ? "BLACK" : "WHITE"}</strong>  player's turn!
                    </Typography>
                    <Typography  className = {classes.player} variant="h5" component="h2">
                        You: {props.username}
                        <br/>
                        Colour: {props.isBlack ? "BLACK" : "WHITE"}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )

}

export default StatusBar