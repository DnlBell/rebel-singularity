import React, { Component } from 'react';
import styled from 'styled-components';
import {Button, Select, Input } from '@material-ui/core';
import {enforcerDescription, jackerDescription, initiateDescripton} from '../resouce/Text.js';
import { Link } from 'react-router-dom';


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
            description: ''
        }
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


  render() {
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
                <Button component={Link} to='/game/'>Create</Button>
            </InputGroup>
        </div>
    );
  };
}


export default CreateCharacter;