import React, { Component } from 'react';
import styled from 'styled-components';
import { Switch, Route, Link } from "react-router-dom";
import Play from '../widgets/Play.js';
import Inventory from '../widgets/Inventory.js';
import Character from '../widgets/Character.js';
import Button from '@material-ui/core/Button';


const Tab = styled.div`
  display: flex;
  flex: 1
`;

const Tabs = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`
const GameFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

class GameView extends Component {

  render() {

    const { path } = this.props.match;

    return (
      <GameFrame>
          <Tabs>
            <Tab><Button component={Link} to={`${path}`}>Game</Button></Tab>
            <Tab><Button component={Link} to={`${path}inventory/`}>Inventory</Button></Tab>
            <Tab><Button component={Link} to={`${path}character/`}>Character</Button></Tab>
          </Tabs>
        <div>
          <Switch>
            <Route path={`${path}`} exact component={Play} />
            <Route path={`${path}inventory/`} component={Inventory} />
            <Route path={`${path}character/`} component={Character} />
          </Switch>
        </div>
      </GameFrame>
    );
  }
}

export default GameView;
