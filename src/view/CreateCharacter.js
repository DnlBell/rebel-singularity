import React, { Component } from 'react';
import styled from 'styled-components';

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

    handleChange = e => {
        const {name, value} = e.target;

        this.setState(() => ({
            [name]: value
        }))
    }

    handleSubmit = e => {
        e.preventDefault();
    }

  render() {
    return (
        <GameFrame>
            <form>
                <label>
                    <h2>Name your Character</h2>
                    <input onChange={this.handleChange} name='name'/>
                </label>
                <h2>Select a class</h2>
                <select onChange={this.handleChange} name='class'>
                    <option value="">Pick A class</option>
                    <option value="Enforcer">Enforcer</option>
                    <option value="Jacker">Jacker</option>
                    <option value="Initiate">Initiate</option>
                </select>
                <input type="submit" value="Submit" />
            </form>
            You are creating {this.state.name} the {this.state.class}.
        </GameFrame>
        
    );
  }
}

export default CreateCharacter;
