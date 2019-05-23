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
            player : this.props.player,
            choices : ["Attack","Spell","Skill","Wait"],
            action : "",
            target : {}
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
        const choiceButtons = [];
        for (let i = 0; i < this.state.choices.length; i++) {
            let newButton = 
                <ActionButton 
                    onClick = {() => this.takeAction(this.state.choices[i])}>{this.state.choices[i]}
                </ActionButton>
            choiceButtons.push(newButton);
        }

        return(
        <ButtonGrid>
            {choiceButtons}
        </ButtonGrid>
        );   
    }

    takeAction = (type) => {
        if (type === "Attack") {
            
            this.onIncrementTurn();
            this.onUpdateLog("This is an attack on turn " + this.props.turn);
        }
        else if (type === "Skill") {
            this.onIncrementTurn();
            this.onUpdateLog("This is a skill use on turn " + this.props.turn);
        }
        else if (type === "Spell") {
            this.onIncrementTurn();
            this.onUpdateLog("This is a spell cast on " + this.props.turn);
        }
        else {
            this.onIncrementTurn();
            this.onUpdateLog("Nothing happens on turn " + this.props.turn);
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