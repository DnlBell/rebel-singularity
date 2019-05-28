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
            choices : this.checkAvalibleChoices(),
            targets : [],
            skills : [],
            targetMenuToggle : false
        };
        this.takeAction = this.takeAction.bind(this);
        this.onUpdateLog.bind(this);
        this.onIncrementTurn.bind(this);
        this.checkAvalibleChoices.bind(this);
        this.checkAvalibleEnemies.bind(this);
        this.checkAvalibleSkills.bind(this);
        this.checkAvalibleOpenable.bind(this);
        this.checkAvalibleAthleticable.bind(this);
        this.checkIfStealthable.bind(this);
        this.checkForUnlockable.bind(this);
        this.checkForTalkable.bind(this);
        this.checkAvalibleSpells.bind(this);
    }

    checkAvalibleChoices() {

        let currentChoices = [];
            if(this.checkAvalibleEnemies().length > 0){
                currentChoices.push("Attack");
            }
            if(this.checkAvalibleOpenable().length > 0){
                currentChoices.push("Open");
            }
            if(this.checkAvalibleSkills().length > 0){
                currentChoices.push("Skill");
            }
        return currentChoices;
    }

    checkAvalibleEnemies() {
        let avalibleTargets = [];
        const characters = this.props.dungeon.map[this.props.dungeon.currentPosition].characters;

        for(let i = 0; i<characters.length;i++){
            if (characters[i].isHostile){
                avalibleTargets.push(new target(i,characters[i].name,"CHARACTER"));
            }
        }

        return avalibleTargets;
    }

    checkAvalibleSkills() {
        let avalibleSkills = [];

        if (this.checkForUnlockable().length>0){
            avalibleSkills.push("Cunning");
        }

        return avalibleSkills;
    }

    checkAvalibleOpenable() {
        let avalibleTargets = [];
        const room = this.props.dungeon.map[this.props.dungeon.currentPosition];
        const doors = room.doors;
        const containers = room.containers;

        for(let i = 0; i < doors.length; i++){
            if (!doors[i].locked){
                avalibleTargets.push(new target(i,doors[i].name,"DOOR"))
            }
        }

        for(let i = 0; i < containers.length; i++){
            if (!containers[i].locked){
                avalibleTargets.push(new target(i,containers[i].name,"CONTAINER"))
            }
        }

        return avalibleTargets;        
    }

    checkAvalibleKnowable() {

    }

    checkAvalibleAthleticable() {

    }

    checkIfStealthable() {

    }

    checkForUnlockable() {

        let avalibleTargets = [];
        const room = this.props.dungeon.map[this.props.dungeon.currentPosition];
        const doors = room.doors;
        const containers = room.containers;

        for(let i = 0; i < doors.length; i++){
            if (doors[i].locked){
                avalibleTargets.push(new target(i,doors[i].name,"DOOR"))
            }
        }

        for(let i = 0; i < containers.length; i++){
            if (containers[i].locked){
                avalibleTargets.push(new target(i,containers[i].name,"CONTAINER"))
            }
        }

        return avalibleTargets; 

    }

    checkForTalkable() {

        let avalibleTargets = [];
        const characters = this.props.dungeon.map[this.props.dungeon.currentPosition].characters;

        for(let i = 0; i<characters.length;i++){
            if (!characters[i].isHostile){
                avalibleTargets.push(new target(i,characters[i].name,"CHARACTER"));
            }
        }

       return avalibleTargets;
    }

    checkAvalibleSpells() {

    }

    onUpdateLog(action) {
        this.props.onUpdateLog(action);
    }
    
    onIncrementTurn() {
        this.props.onIncrementTurn();
    }

    render() {

        const choiceButtons = [];

      
        if(!this.state.targetMenuToggle && !this.state.skillMenuToggle){
            for (let i = 0; i < this.state.choices.length; i++) {
                let newButton = 
                    <ActionButton 
                            onClick = {() => this.takeAction(this.state.choices[i])}> 
                        {this.state.choices[i]}
                    </ActionButton>
                choiceButtons.push(newButton);
            }
        } else if(this.state.targetMenuToggle) {
            for (let i = 0; i < this.state.targets.length; i++) {
                let newButton = 
                    <ActionButton> 
                        {this.state.targets[i].name}
                    </ActionButton>
                choiceButtons.push(newButton);
            }
        } else if(this.state.skillMenuToggle) {
            for (let i = 0; i < this.state.skills.length; i++) {
                let newButton = 
                    <ActionButton> 
                        {this.state.skills[i]}
                    </ActionButton>
                choiceButtons.push(newButton);
            }
        }

        return(
        <ButtonGrid>
            {choiceButtons}
        </ButtonGrid>
        );   
    }

    takeAction = (type) => {
        if (type === "Attack") {
            this.setState({
                targets : this.checkAvalibleEnemies(),
                targetMenuToggle : true
             })
        }
        else if (type === "Skill") {
            this.setState({
                skills : this.checkAvalibleSkills(),
                skillMenuToggle : true
            })
        }
        else if (type === "Spell") {
            this.onIncrementTurn();
            this.onUpdateLog("This is a spell cast on " + this.props.turn);
        }
        else if (type === "Open") {
             this.setState({
                targets : this.checkAvalibleOpenable(),
                targetMenuToggle : true
             })
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
    player: state.player,
    turn: state.turn,
    dungeon: state.dungeon
});
export default connect(mapStateToProps,mapActionsToProps)(ActionMenu)

class target {

    constructor(id,name,type){
        this.id = id;
        this.name = name;
        this.type = type;
    }
}