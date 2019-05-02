import React, { Component } from 'react';
import styled from 'styled-components';
import {Button, Select, Input } from '@material-ui/core';
import {enforcerDescription, jackerDescription, initiateDescripton} from '../resouce/Text.js';
import { connect } from 'react-redux';
import { updatePlayer } from '../actions/player-actions.js';
import Player from '../models/character/player.js';
import { Redirect } from 'react-router-dom';

const InputRow = styled.div`
    display: flex;
    flex-direction:column;
    align-items: start;
    padding-top: 10px
`;

const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align:center;
`;

class CreateCharacter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            class: '',
            description: '',
            newPlayer: {},
            toPlay: false
        }
        this.onUpdatePlayer.bind(this);
        this.createEnforcer.bind(this);
        this.createJacker.bind(this);
        this.createInitiate.bind(this);
    };

    onUpdatePlayer() {
        this.props.onUpdatePlayer({player:this.state.newPlayer});
    }

    createEnforcer() {
       const enforcer = new Player(this.state.name,this.state.class);
       enforcer.str = 14;
       enforcer.con = 14;
       enforcer.dex = 12;
       enforcer.maxHp = 12;
       enforcer.currentHp = 12;
       this.state.newPlayer = enforcer;
    };

    createJacker() {
        const jacker = new Player(this.state.name,this.state.class);
        jacker.dex = 14;
        jacker.int = 12;
        jacker.con = 12;
        jacker.cha = 12;
        jacker.maxHp = 9;
        jacker.currentHp = 9;
        this.state.newPlayer = jacker;
    };

    createInitiate() {
        const initiate = new Player(this.state.name,this.state.class);
        initiate.int = 14;
        initiate.wis = 14;
        initiate.cha = 12;
        initiate.maxHp = 8;
        initiate.currentHp = 9;
        this.state.newPlayer = initiate;
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    getDescription(className) {

        if(className === "Enforcer") {
            return enforcerDescription;
        }
        else if (className === "Jacker") {
            return jackerDescription;
        }
        else if (className === "Initiate") {
            return initiateDescripton;
        }else {
            return "";
        }

    };

    handleSubmit(e,className,characterName) {
        e.preventDefault();
        if(className !== '' &&  characterName !== '' && characterName.length <= 32){
            switch(this.state.class){
                case 'Enforcer':
                    this.createEnforcer();
                    break;
                case 'Jacker':
                    this.createJacker();
                    break;
                case 'Initiate':
                    this.createInitiate();
                    break;
                default:
                    this.createEnforcer();
                    break;
            }
            this.onUpdatePlayer();
            this.setState({toPlay:true});

        }
        else {
            alert("Invalid character submission. Please complete the form.");
        }
        return false;
    }

  render() {

    if (this.state.toPlay === true) {
        return <Redirect to='/game/' />
    }

    return (
        <div>
            <InputGroup>
                <h1>Create a character</h1>
                <InputRow>
                    <label>Name</label>
                    <Input value = {this.state.name}
                        onChange={this.handleChange('name')}></Input>
                </InputRow>
                <InputRow>
                <label>Class</label>
                    <Select native
                            value={this.state.class}
                            onChange={this.handleChange('class')}>
                        <option value=""/>
                        <option value="Enforcer">Enforcer</option>
                        <option value="Jacker">Jacker</option>
                        <option value="Initiate">Initiate</option>
                    </Select>
                </InputRow>
                    <p>{this.getDescription(this.state.class)}</p>
                <Button 
                    onClick={e => this.handleSubmit(e,this.state.class,this.state.name)}>
                    Create</Button>
            </InputGroup>
        </div>
    );
  };
}

const mapStateToProps = state => ({
    player: state.player
});

const mapActionsToProps = {
    onUpdatePlayer: updatePlayer
}

export default connect(mapStateToProps, mapActionsToProps)(CreateCharacter);