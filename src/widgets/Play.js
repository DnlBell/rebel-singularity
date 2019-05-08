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

  constructor(props) {
    super(props);
    this.state = {
      turn: 0,
      actions: []
    }
  }

  render() {
    
    return (
      <PlayFrame>
        <Log children = {this.state.actions} />
        <Button onClick = {this.takeAction}>press me</Button>
      </PlayFrame>
    );
  }

  takeAction = () => {
    this.setState({
      turn: this.state.turn + 1,
      actions:[...this.state.actions,<Action key={this.state.turn} turn={this.state.turn}/>]
    });
  } 
}


const Action = props => <div>{"This is the action for turn" + props.turn}</div>

export default Play;
