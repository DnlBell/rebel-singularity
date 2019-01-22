import React, { Component } from 'react';
import styled from 'styled-components';
import PlayerStatus from '../components/PlayerStatus.js'
import ActionBar from '../components/ActionBar.js';
import RenderWindow from '../components/RenderWindow.js';

const GameFrame = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: column;
  align-items: center;

`;


class GameView extends Component {
  render() {
    return (
      <GameFrame>
          <RenderWindow />
          <PlayerStatus />
          <ActionBar />
      </GameFrame>
    );
  }
}

export default GameView;
