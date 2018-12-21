import React, { Component } from 'react';
import styled from 'styled-components';

const SatusBar = styled.div`
    display: flex;
    flex-direction: row;
`;

const StatusItem = styled.h2`
    margin: 10px;
`;

class PlayerStatus extends Component {
  render() {
    return (
      <SatusBar>
        <StatusItem>Name: Lorem Ipsum </StatusItem><StatusItem>Health: 10/10 </StatusItem><StatusItem>Mana: 5/5 </StatusItem> <StatusItem>Status: Normal</StatusItem>
      </SatusBar>
    );
  }
}

export default PlayerStatus;
