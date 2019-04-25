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
  margin-top:8px;
  margin-bottom:8px;
  background-color:white;
  min-height: 800px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 5px;
`;
const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items:center;

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
