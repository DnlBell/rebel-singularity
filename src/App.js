import React, { Component } from 'react';
import styled from 'styled-components';
import './App.css';
import PlayerStatus from './components/PlayerStatus';

const GameFrame = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
`;

class App extends Component {
  render() {
    return (
      <div className="App">
        <GameFrame>
          <PlayerStatus />
        </GameFrame>
      </div>
    );
  }
}

export default App;
