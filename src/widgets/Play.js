import React, { Component } from 'react';
import {Button, LinearProgress, Grid} from '@material-ui/core';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { updateLog } from '../actions/log-actions';
import { incrementTurn } from '../actions/turn-actions';
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
      player: this.props.player,
    }
    this.onUpdateLog.bind(this);
    this.onIncrementTurn.bind(this);
  }

  onUpdateLog(action) {
    this.props.onUpdateLog(action);
  }

  onIncrementTurn() {
    this.props.onIncrementTurn();
  }

  render() {  
    return (
      <PlayFrame>
        <Log/>
        <StatBox>
          <Stat>HP({this.state.player.currentHp}/{this.state.player.maxHp})
            <LinearProgress variant="determinate" value={(this.state.player.currentHp/this.state.player.maxHp)*100}/>
          </Stat>
          <Stat>MP({this.state.player.currentMp}/{this.state.player._maxMp})
            <LinearProgress variant="determinate" value={(this.state.player.currentMp/this.state.player.maxMp)*100}/>
          </Stat>
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
    if (type === "Attack") {
      this.onUpdateLog("This is an attack on turn " + this.props.turn);
      this.onIncrementTurn();
    }
    else if (type === "Skill") {
      this.onUpdateLog("This is a skill use on turn " + this.props.turn);
      this.onIncrementTurn();
    }
    else if (type === "Spell") {
      this.onUpdateLog("This is a spell cast on " + this.props.turn);
      this.onIncrementTurn();
    }
    else {
      this.onUpdateLog("Nothing happens on turn " + this.props.turn);
      this.onIncrementTurn();
    }
  } 
}

const mapActionsToProps = {
  onUpdateLog : updateLog,
  onIncrementTurn: incrementTurn
}

const mapStateToProps = state => ({
  player: state.playerCharacter.player,
  turn: state.turn
});

export default connect(mapStateToProps,mapActionsToProps)(Play);



