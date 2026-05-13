import React, { Component } from 'react';
import styled from 'styled-components';
import { Switch, Route, Link } from "react-router-dom";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import Play from '../widgets/Play.js';
import Inventory from '../widgets/Inventory.js';
import Character from '../widgets/CharacterSheet';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const GameFrame = styled.div`
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  background-color: #f5f5f5;
`;

const UserSection = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: 14px;
`;

const GameViewContent = (props) => {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const { path } = props.match;
  const { player } = props;

  if(player === "empty"){
    return <Redirect to='/create/' />    
  }

  return (
    <GameFrame>
      <Header>
        <div>
          <h3 style={{ margin: 0 }}>Rebel Singularity</h3>
        </div>
        {currentUser && (
          <UserSection>
            <span>Playing as: <strong>{currentUser.displayName}</strong></span>
            <Button size="small" onClick={handleLogout}>
              Logout
            </Button>
          </UserSection>
        )}
      </Header>

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

const mapStateToProps = state => ({
  player: state.player
});

export default connect(mapStateToProps)(GameViewContent);
