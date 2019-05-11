import React, { Component } from 'react';
import {Button, LinearProgress, Grid} from '@material-ui/core';
import styled from 'styled-components';
import Log from './Log';

const PlayFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const StatBox = styled.div`
  display: flex;
  flex-direction: row;
  width:95%;
  height:50px;
  justify-content:space-evenly;
`
const Stat = styled.div`
  width:45%;
  max-width:250px;

`
const ButtonGrid = styled(Grid)`
  flex-direction:row;
  justify-content:space-evenly;
  align-items:flex-start;
`
const ActionButton = styled(Button)`
  border-radius: 3px;
  border: 1;
  color: white;
  height: 48px;
  padding: 30px;
  margin:10px;
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
        <StatBox>
          <Stat>HP(100%)<LinearProgress variant="determinate" value={100}/></Stat>
          <Stat>MP(100%)<LinearProgress variant="determinate" value={100}/></Stat>
        </StatBox>
        <ButtonGrid>
          <ActionButton onClick = {() => this.takeAction("Attack")}>Attack</ActionButton>
          <ActionButton onClick = {() => this.takeAction("Spell")}>Spell</ActionButton>
          <ActionButton onClick = {() => this.takeAction("Skill")}>Skill</ActionButton>
        </ButtonGrid>
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
