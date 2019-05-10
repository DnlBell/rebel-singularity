import React, { Component } from 'react';
import {Button} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
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
    this.takeAction = this.takeAction.bind(this);
    this.state = {
      turn: 0,
      actions: []
    }
  }

  render() {
    
    return (
      <PlayFrame>
        <Log children = {this.state.actions} />
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
          <Button onClick = {() => this.takeAction("Attack")}>Attack</Button>
          <Button onClick = {() => this.takeAction("Spell")}>Spell</Button>
          <Button onClick = {() => this.takeAction("Skill")}>Skill</Button>
        </Grid>
      </PlayFrame>
    );
  }

  takeAction = (type) => {

    let action = null;

    if (type === "Attack") {
      action = <Attack key={this.state.turn} turn={this.state.turn}/>;
    }
    else if (type === "Skill") {
      action = <Skill key={this.state.turn} turn={this.state.turn}/>;
    }
    else if (type === "Spell") {
      action = <Spell key={this.state.turn} turn={this.state.turn}/>;
    }
    else {
      action = <Action key={this.state.turn} turn={this.state.turn}/>;
    }

    this.setState({
      turn: this.state.turn + 1,
      actions:[...this.state.actions,action]
    });
  } 
}


const Action = props => <div>{"This is the action for turn " + props.turn}</div>
const Attack = props => <div>{"This is an attack on turn " + props.turn}</div>
const Skill = props => <div>{"This is a skill use on turn " + props.turn}</div>
const Spell = props => <div>{"This is a spell cast on turn " + props.turn}</div>

export default Play;
