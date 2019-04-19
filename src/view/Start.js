import React, { Component } from 'react';
import styled from 'styled-components';

const GameFrame = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: column;
  align-items: center;
`;


class Start extends Component {
  render() {
    return (
      <GameFrame>
        <h1>Rebel Singularity</h1>
        <button>Start</button>
        <button>Login</button>            
      </GameFrame>
    );
  }
}

export default Start;
