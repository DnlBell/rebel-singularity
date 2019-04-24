import React, { Component } from 'react';
import GameView from './view/GameView.js';
import Start from './view/Start.js';
import CreateCharacter from './view/CreateCharacter.js';
import { BrowserRouter as Router, Route} from "react-router-dom";
import styled from 'styled-components';

const Foreground = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  max-width:600px;
  float: center;
  background-color:white;
`;
const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items:center;
  background-color:yellow;
`;



class App extends Component {
  render() {
    return (
      <Background>
        <Foreground>
          <Router>
            <Route path = "/" exact component={Start} />
            <Route path = "/create/" component = {CreateCharacter} />
            <Route path ="/game/" component = {GameView} />
          </Router>
        </Foreground>
      </Background>        
    );
  }
}

export default App;
