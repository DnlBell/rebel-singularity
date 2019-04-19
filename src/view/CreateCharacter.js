import React, { Component } from 'react';
import styled from 'styled-components';
import {Button, Select, Input } from '@material-ui/core';

const GameFrame = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: column;
  align-items: center;
`;

class CreateCharacter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            class: ''
        }
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };


  render() {
    return (
        <GameFrame>

            <h2>Name your Character</h2>
            <Input value = {this.state.name}
                   onChange={this.handleChange('name')}></Input>
            <h2>Select a class</h2>
            <Select native
                    value={this.state.class}
                    onChange={this.handleChange('class')}>
                <option value=""/>
                <option value="Enforcer">Enforcer</option>
                <option value="Jacker">Jacker</option>
                <option value="Initiate">Initiate</option>
            </Select>      
            <p>You are creating {this.state.name} the {this.state.class}.</p>
        </GameFrame>
        
    );
  }
}

export default CreateCharacter;