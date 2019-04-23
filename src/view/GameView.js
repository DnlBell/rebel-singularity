import React, { Component } from 'react';
import styled from 'styled-components';
import { Switch, Route, Link } from "react-router-dom";
import Play from '../widgets/Play.js';
import Inventory from '../widgets/Inventory.js';
import Character from '../widgets/Character.js';


const GameFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;


class GameView extends Component {

  render() {

    const { path } = this.props.match;

    return (
      <div>
        <div>
          <Link to={`${path}`} className="link">Game</Link>
          <Link to={`${path}inventory/`} className="link">Inventory</Link>
          <Link to={`${path}character/`} className="link">Character</Link>
        </div>
        <div className="tabs">
          <Switch>
            <Route path={`${path}`} exact component={Play} />
            <Route path={`${path}inventory/`} component={Inventory} />
            <Route path={`${path}character/`} component={Character} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default GameView;
