import React, { Component } from 'react';
import styled from 'styled-components';
import { Switch, Route, Link } from "react-router-dom";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Play from '../widgets/Play.js';
import Inventory from '../widgets/Inventory.js';
import Character from '../widgets/CharacterSheet';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';

const GameFrame = styled.div`
  display: flex;
  flex-direction: column;

`

class GameView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      player : this.props.player
    }
  }

  render() {

    const { path } = this.props.match;

    if(this.state.player === "empty"){
          return <Redirect to='/create/' />    
    }

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

const mapStateToProps = state => ({
  player: state.playerCharacter.player
});

export default connect(mapStateToProps)(GameView);
