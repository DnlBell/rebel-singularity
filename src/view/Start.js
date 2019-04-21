import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import styled from 'styled-components';

const GameFrame = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: column;
  align-items: start;
`;


class Start extends Component {

  render() {
    return (
      <GameFrame>
        <h1>Rebel Singularity</h1>
        <Button component={Link} to='/create/'>Start</Button>
      </GameFrame>
    );
  }
}

export default Start;
