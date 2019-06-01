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
            targetMenuToggle : false
        };
        this.takeAction = this.takeAction.bind(this);
        this.resolveAction = this.resolveAction.bind(this);
        this.onUpdateLog.bind(this);
        this.onIncrementTurn.bind(this);
        this.checkAvalibleChoices.bind(this);
        this.checkAvalibleInspectables.bind(this);
        this.checkAvalibleSearchable.bind(this);
        this.checkAvalibleEnemies.bind(this);
        this.checkAvalibleSkills.bind(this);
        this.checkAvalibleOpenable.bind(this);
        this.checkAvalibleTakeable.bind(this);
        this.checkAvalibleInspectables.bind(this);
        this.checkAvalibleAthleticable.bind(this);
        this.checkIfStealthable.bind(this);
        this.checkForUnlockable.bind(this);
        this.checkForTalkable.bind(this);
        this.checkAvalibleSpells.bind(this);
        this.getRoomDescription.bind(this);
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
            if(this.checkAvalibleTakeable().length > 0){
                currentChoices.push("Take");
            }
        return currentChoices;
    }

    checkAvalibleEnemies() {
        let avalibleTargets = [];
        const characters = this.props.dungeon.map[this.props.dungeon.currentPosition].characters;

        for(let i = 0; i<characters.length;i++){
            if (characters[i].isHostile){
                avalibleTargets.push(new target(i,characters[i].name,"CHARACTER","ATTACK"));
            }
        }
        return avalibleTargets;
    }

    checkAvalibleSkills() {
        let avalibleSkills = [];

        if(this.checkForUnlockable().length>0){
            avalibleSkills.push({name:"Unlock"});
        }
        if(this.checkForTalkable().length>0){
            avalibleSkills.push({name:"Talk"});
        }
        if(this.checkAvalibleInspectables().length>0){
            avalibleSkills.push({name:"Inspect"})
        }

        return avalibleSkills;
    }

    checkAvalibleOpenable() {
        let avalibleTargets = [];
        const room = this.props.dungeon.map[this.props.dungeon.currentPosition];
        const doors = room.doors;
        const containers = room.containers;

        for(let i = 0; i < doors.length; i++){
            if (!doors[i].locked && !doors[i].hidden){
                avalibleTargets.push(new target(i,doors[i].name,"DOOR","OPEN"))
            }
        }
        for(let i = 0; i < containers.length; i++){
            if (!containers[i].locked && !containers[i].hidden){
                avalibleTargets.push(new target(i,containers[i].name,"CONTAINER","OPEN"))
            }
        }

        return avalibleTargets;        
    }

    checkAvalibleTakeable() {
        let avalibleTargets = [];
        const room = this.props.dungeon.map[this.props.dungeon.currentPosition];
        const containers = room.containers;
  
        for(let i = 0; i < containers.length; i++){
            if(!containers[i].locked && !containers[i].hidden && containers[i].open){
                avalibleTargets.push(new target(i,containers[i].name,"CONTAINER","TAKE"));
            }
        }

        return avalibleTargets;
    }

    checkAvalibleInspectables() {
        let avalibleTargets = [];
        const room = this.props.dungeon.map[this.props.dungeon.currentPosition];
        const doors = room.doors;
        const containers = room.containers;
        const characters = room.characters;

        for(let i = 0; i < doors.length; i++){
            if (!doors[i].locked && !doors[i].hidden){
                avalibleTargets.push(new target(i,doors[i].name,"DOOR","INSPECT"))
            }
        }
        for(let i = 0; i < containers.length; i++){
            if (!containers[i].locked && !containers[i].hidden){
                avalibleTargets.push(new target(i,containers[i].name,"CONTAINER","INSPECT"))
            }
        }
        for(let i = 0; i < characters.length; i++){
            if (!characters[i].hidden){
                avalibleTargets.push(new target(i,characters[i].name,"CHARACTER","INSPECT"))
            }
        }

        return avalibleTargets;     
    }
    checkAvalibleSearchable() {

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
            if (doors[i].locked && !doors[i].hidden){
                avalibleTargets.push(new target(i,doors[i].name,"DOOR","UNLOCK"))
            }
        }

        for(let i = 0; i < containers.length; i++){
            if (containers[i].locked && !containers[i].hidden){
                avalibleTargets.push(new target(i,containers[i].name,"CONTAINER","UNLOCK"))
            }
        }

        return avalibleTargets; 

    }

    checkForTalkable() {

        let avalibleTargets = [];
        const characters = this.props.dungeon.map[this.props.dungeon.currentPosition].characters;

        for(let i = 0; i<characters.length;i++){
            if (!characters[i].isHostile){
                avalibleTargets.push(new target(i,characters[i].name,"CHARACTER","TALK"));
            }
        }

       return avalibleTargets;
    }

    checkAvalibleSpells() {



    }

    getRoomDescription() {

        const describableDoors = [];
        const describableContainers = [];
        const describableCharacters = [];
        const room = this.props.dungeon.map[this.props.dungeon.currentPosition];
        const doors = room.doors;
        const containers = room.containers;
        const characters = room.characters;

        let roomDescription = "The room you are in is " + room.generalDescription;

        for(let i = 0; i < doors.length; i++){
            if (!doors[i].hidden){
                describableDoors.push(new target(i,doors[i].name,"DOOR","DESCRIBE"));
            }
        }

        for(let i = 0; i < containers.length; i++){
            if (!containers[i].hidden){
                describableContainers.push(new target(i,containers[i].name,"CONTAINER","DESCRIBE"));
            }
        }

        for(let i = 0; i < characters.length; i++){
            if (!characters[i].hidden){
                describableCharacters.push(new target(i,characters[i].name,"CHARACTER","DESCRIBE"));
            }
        }

        if (describableDoors.length < 1){
            roomDescription += " There are no doors. ";
        } else if (describableDoors.length === 1) {
            roomDescription += " On 1 of the walls there is a " + describableDoors[0].name + ".";
        } else {
            roomDescription += " There are " + describableDoors.length + " doors. ";
            for(let i = 0; i < describableDoors.length; ++i ) {
                if (i === 0){
                    roomDescription += "A " + describableDoors[i].name;
                } else if ( i === describableDoors.length-1){
                    roomDescription += " and a " + describableDoors[i].name;
                } else {
                    roomDescription += ", a " + describableDoors[i].name;
                }
                roomDescription += ".";
            }
        }

        if (describableContainers.length === 1) {
            roomDescription += " You see a " + describableContainers[0].name + ". " ;
        } else {
            roomDescription += " There are " + describableContainers.length + " containers that you see. ";
            for(let i = 0; i < describableContainers.length; ++i ) {
                if (i === 0){
                    roomDescription += "A " + describableContainers[i].name;
                } else if ( i === describableContainers.length-1){
                    roomDescription += " and a " + describableContainers[i].name;
                } else {
                    roomDescription += ", a " + describableContainers[i].name;
                }
                roomDescription += ".";
            }
        }

        if (describableCharacters.length === 1) {
            roomDescription += " You see a " + describableCharacters[0].name + ". " ;
        } else {
            roomDescription += " There are " + describableCharacters.length + " characters that you see. ";
            for(let i = 0; i < describableCharacters.length; ++i ) {
                if (i === 0){
                    roomDescription += "A " + describableCharacters[i].name;
                } else if ( i === describableCharacters.length-1){
                    roomDescription += " and a " + describableCharacters[i].name;
                } else {
                    roomDescription += ", a " + describableCharacters[i].name;
                }
            }
            roomDescription += ".";
        }

        
        return(roomDescription);
    }

    onUpdateLog(action) {
        this.props.onUpdateLog(action);
    }
    
    onIncrementTurn() {
        this.props.onIncrementTurn();
    }

    render() {

        const choiceButtons = [];
        const thisTurn = this.props.turn;
        if (thisTurn === 0){
            this.onUpdateLog(this.getRoomDescription());
            this.onIncrementTurn();
        }
      
        if(!this.state.targetMenuToggle){
            for (let i = 0; i < this.state.choices.length; i++) {
                let newButton = 
                    <ActionButton onClick = {() => this.takeAction(this.state.choices[i])}> 
                        {this.state.choices[i]}
                    </ActionButton>
                choiceButtons.push(newButton);
            }
        } else {
            for (let i = 0; i < this.state.targets.length; i++) {
                let newButton = 
                    <ActionButton onClick = {() => this.takeAction(this.state.targets[i])}> 
                        {this.state.targets[i].name}
                    </ActionButton>
                choiceButtons.push(newButton);
            }
            choiceButtons.push(<ActionButton onClick={() => this.setState({targetMenuToggle : false})}>Back</ActionButton>)
        }

        return(
        <ButtonGrid>
            {choiceButtons}
        </ButtonGrid>
        );   
    }

    takeAction = (select) => {
        if (select === "Attack") {
            this.setState({
                targets : this.checkAvalibleEnemies(),
                targetMenuToggle : true
             })
        }
        else if (select === "Skill") {
            this.setState({
                targets : this.checkAvalibleSkills(),
                targetMenuToggle : true
            })
        }
        else if (select === "Open") {
             this.setState({
                targets : this.checkAvalibleOpenable(),
                targetMenuToggle : true
             })
        }
        else if (select === "Take") {
            this.setState({
               targets : this.checkAvalibleTakeable(),
               targetMenuToggle : true
            })
       }
       else if (select === "Inspect") {
            this.setState({
                targets : this.checkAvalibleInspectables(),
                targetMenuToggle : true
            })
        }
        else if (select === "Unlock") {
            this.setState({
                targets : this.checkForUnlockable(),
                targetMenuToggle : true
            })
        }
        else if (select === "Talk") {
            this.setState({
                targets : this.checkForTalkable(),
                targetMenuToggle : true
            })
        }
        else {
            this.resolveAction(select);
        }
    }

    resolveAction = (target) =>{

        switch(target.choice){
            case "ATTACK":
                this.onIncrementTurn();
                this.onUpdateLog("You Attack " + target.name + " on turn " + this.props.turn + ".");
                this.setState({targetMenuToggle: false});
                break;
            case "OPEN":
                this.onIncrementTurn();
                this.onUpdateLog("You open " + target.name + " on turn " + this.props.turn + ".");
                this.setState({targetMenuToggle: false});
                break;
            case "TAKE":
                this.onIncrementTurn();
                this.onUpdateLog("You take " + target.name + " on turn " + this.props.turn + ".");
                this.setState({targetMenuToggle: false});
                break;
            case "INSPECT":
                this.onIncrementTurn();
                this.onUpdateLog("You inspect " + target.name + " on turn " + this.props.turn + ".");
                this.setState({targetMenuToggle: false});
                break;
            case "UNLOCK":
                this.onIncrementTurn();
                this.onUpdateLog("You unlock " + target.name + " on turn " + this.props.turn + ".");
                this.setState({targetMenuToggle: false});
                break;
            case "TALK":
                this.onIncrementTurn();
                this.onUpdateLog("You say hello to " + target.name + " on turn " + this.props.turn + ".");
                this.setState({targetMenuToggle: false});
                break;
            case "DESCRIBE":
                break;
            default:

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
    dungeon: state.dungeon,
    log: state.log
});
export default connect(mapStateToProps,mapActionsToProps)(ActionMenu)

class target {

    constructor(id,name,type,choice){
        this.id = id;
        this.name = name;
        this.type = type;
        this.choice = choice;
    }
}