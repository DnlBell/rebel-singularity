/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import GameView from './view/GameView.js';
import Start from './view/Start.js';
import CreateCharacter from './view/CreateCharacter.js';
import { BrowserRouter as Router, Route} from "react-router-dom";
import styled from 'styled-components';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';

import playerReducer from './reducers/playerReducer.js';
import dungeonReducer from './reducers/dungeonReducer.js';
import logReducer from './reducers/logReducer.js';
import turnReducer from './reducers/turnReducer.js';
import {gameStartText} from './resouce/Text.js';
import {testDungeon} from './resouce/dungeonTemplate';

//Style elements
const Foreground = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  max-width:600px;
  min-height:95%; 
  background-color:white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 5px;
  position: absolute;
  left: 50%
  transform: translate(-50%)
`;
const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items:center;
`;

//App State

const allReducers = combineReducers({
  player: playerReducer,
  dungeon: dungeonReducer,
  log: logReducer,
  turn: turnReducer
})

const store = createStore(
  allReducers,  
  {
    player:'empty',
    dungeon: testDungeon(),
    log: [gameStartText],
    turn: 0
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

console.log(store.getState());

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Background>
          <Foreground>
            <Router >
              <Route path = "/" exact component={Start} />
              <Route path = "/create/" component = {CreateCharacter} />
              <Route path ="/game/" component = {GameView} />
            </Router>
          </Foreground>
        </Background>
      </Provider>        
    );
  }
}

export default App;
