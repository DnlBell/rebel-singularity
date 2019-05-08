import React, { Component } from 'react';
import {Button} from '@material-ui/core';
import styled from 'styled-components';
import Log from './Log';


const PlayFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

class Play extends Component {

  state = {
    turn: 0
  }

  render() {
    const actions = [];

    for (var i = 0; i < this.state.turn; i += 1) {
      actions.push(<Action key={i} turn={i} />)
    }
    return (
      <PlayFrame>
        <Log children = {actions} />
        <Button onClick = {this.takeAction}>press me</Button>
      </PlayFrame>
    );
  }

  takeAction = () => {
    this.setState({
      turn: this.state.turn + 1
    });
  } 
}


const Action = props => <div>{"This is the action for turn" + props.turn}</div>

export default Play;
