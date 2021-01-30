import './App.css';
import React from 'react'
import { ColorContext } from './gomoku/context/colorcontext'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Onboard from './gomoku/gameroom/onboard';
import StartGame from './gomoku/gameroom/startgame';
import Room from './gomoku/ui/room';
import JoinRoom from './gomoku/gameroom/joinroom';
import OpponentOnboard from './gomoku/gameroom/opponentonboard';
import Welcome from './gomoku/gameroom/welcome'


function App() {

const [didRedirect, setDidRedirect] = React.useState(false);

const playerDidRedirect = React.useCallback(() => {
  setDidRedirect(true);
}, []);

const playerDidNotRedirect = React.useCallback(() => {
  setDidRedirect(false);
}, []);

const [username, setUsername] = React.useState('');

  return (
    <ColorContext.Provider value={{didRedirect: didRedirect, playerDidRedirect: playerDidRedirect, playerDidNotRedirect: playerDidNotRedirect}}>
      <Router>
        <Switch>
          {/* when game room is not created yet */}
          <Route path = '/' exact>
            <Welcome></Welcome>
          </Route>
          <Route path ='/onboard' exact>
            <Onboard setUsername = {setUsername}></Onboard>
          </Route>
          <Route path='/opponentonboard' exact>
            <OpponentOnboard></OpponentOnboard>
          </Route>
          <Route path = '/game/:gameid' exact>
            {didRedirect ?
              <React.Fragment>
                <StartGame username = {username} isCreator = {true}></StartGame>
                <Room myUserName = {username}></Room>
              </React.Fragment>
              :
              <JoinRoom></JoinRoom>
            }
          </Route>
          <Redirect to = "/" />
        </Switch>
      </Router>
    </ColorContext.Provider>
  );
}

export default App;
