import React, { Component } from 'react';
import styled from 'styled-components';
import { Switch, Route, Link } from "react-router-dom";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Play from '../widgets/Play.js';
import Inventory from '../widgets/Inventory.js';
import Character from '../widgets/Character.js';

const GameFrame = styled.div`
  display: flex;
  flex-direction: column;

`

class GameView extends Component {

  render() {

    const { path } = this.props.match;

    return (
      <GameFrame>
          <Tabs
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab component={Link} to={`${path}`} label='Game'/>
            <Tab component={Link} to={`${path}inventory/`}label='Inventory'/>
            <Tab component={Link} to={`${path}character/`}label='Character'/>
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
