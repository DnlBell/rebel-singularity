import React, { Component } from 'react';
import { connect } from "react-redux";
import {Button, Grid} from '@material-ui/core';
import { updateLog } from '../actions/log-actions';
import { incrementTurn } from '../actions/turn-actions';
import styled from 'styled-components';

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

class ActionMenu extends Component {

    constructor(props){
        super(props)
        this.state = {
            player : this.props.player 
        };
        this.takeAction = this.takeAction.bind(this);
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
        return(
        <ButtonGrid>
            <ActionButton onClick = {() => this.takeAction("Attack")}>Attack</ActionButton>
            <ActionButton onClick = {() => this.takeAction("Spell")}>Spell</ActionButton>
            <ActionButton onClick = {() => this.takeAction("Skill")}>Skill</ActionButton>
        </ButtonGrid>
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
};
  
const mapStateToProps = state => ({
    player: state.playerCharacter.player,
    turn: state.turn
});
export default connect(mapStateToProps,mapActionsToProps)(ActionMenu)