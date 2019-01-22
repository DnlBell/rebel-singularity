import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
color: black;
font-size: 1em;
margin: 1em;
padding: 0.25em 1em;
border: 2px solid black;
border-radius: 3px;
`;

class ActionButton extends Component {
  render() {
    return (
      <Container>
        Button
      </Container>
    );
  }
}

export default ActionButton;
