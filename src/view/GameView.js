import React, { Component } from 'react';
import styled from 'styled-components';

const GameFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;


class GameView extends Component {


  render() {
    return (
      <GameFrame>
        game
      </GameFrame>
    );
  }
}

export default GameView;
