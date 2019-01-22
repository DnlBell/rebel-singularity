import React, { Component } from 'react';
import styled from 'styled-components';

const Frame = styled.div`
  display: flex;
  justify-content: center;
  width: 50%;
`

const BlackBox = styled.div`
  border: 1px solid black;
  width: 80%;
  padding-top: 60%;
`

class RenderWindow extends Component {
  render() {
    return (
      <Frame>
        <BlackBox />
      </Frame>
    );
  }
}

export default RenderWindow;
