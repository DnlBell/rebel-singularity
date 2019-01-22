import React, { Component } from 'react';
import ActionButton from './ActionButton.js';
import styled from 'styled-components';

const Frame = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  border: 1px solid black;
`


class ActionBar extends Component {
  render() {
    return (
      <Frame>
        <ActionButton />
        <ActionButton />
        <ActionButton />
        <ActionButton />
      </Frame>
    );
  }
}

export default ActionBar;
