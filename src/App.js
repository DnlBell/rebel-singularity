import React, { Component } from 'react';
import styled from 'styled-components';
import GameView from './view/GameView.js';


const GameFrame = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
`;

class App extends Component {
  render() {
    return (
        <GameView/>
    );
  }
}

export default App;
