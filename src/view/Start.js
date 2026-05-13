import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import apiClient from '../api/client';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { Spinner, Alert } from 'reactstrap';
import * as playerActions from '../actions/player-actions.js';
import * as dungeonActions from '../actions/dungeon-actions.js';
import * as logActions from '../actions/log-actions.js';
import * as turnActions from '../actions/turn-actions.js';
import { connect } from 'react-redux';

const GameFrame = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: column;
  align-items: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`;

const UserInfo = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  color: #666;
  font-size: 14px;
  display: flex;
  gap: 10px;
  align-items: center;
`;

const StartView = (props) => {
  const { currentUser, logout } = useAuth();
  const [latestSave, setLatestSave] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [shouldRedirectToGame, setShouldRedirectToGame] = React.useState(false);

  React.useEffect(() => {
    const fetchLatestSave = async () => {
      if (currentUser) {
        try {
          setLoading(true);
          const save = await apiClient.getLatestSave();
          setLatestSave(save);
        } catch (err) {
          // No save found or error - that's ok
          setLatestSave(null);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchLatestSave();
  }, [currentUser]);

  const handleContinue = async () => {
    if (!latestSave) return;

    try {
      // Load the save state into Redux
      props.updatePlayer(latestSave.state.player);
      props.updateDungeon(latestSave.state.dungeon);
      
      // Clear current log and set it to the saved log
      while (props.log.length > 0) {
        props.log.pop();
      }
      props.updateLog(latestSave.state.log);
      
      // Set turn count by dispatching INCREMENT_TURN the correct number of times
      const currentTurn = props.turn;
      const targetTurn = latestSave.state.turn;
      
      if (targetTurn > currentTurn) {
        for (let i = 0; i < targetTurn - currentTurn; i++) {
          props.incrementTurn();
        }
      }
      
      // Redirect to game
      setShouldRedirectToGame(true);
    } catch (err) {
      setError('Failed to load game: ' + err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  if (shouldRedirectToGame) {
    return <Redirect to="/game/" />;
  }

  return (
    <GameFrame>
      {currentUser && (
        <UserInfo>
          <span>Logged in as: <strong>{currentUser.displayName}</strong></span>
          <Button size="small" onClick={handleLogout}>
            Logout
          </Button>
        </UserInfo>
      )}

      <h1>Rebel Singularity</h1>

      {!currentUser && (
        <>
          <p>Create an account to save your progress</p>
          <ButtonGroup>
            <Button variant="contained" color="primary" component={Link} to='/login/'>
              Sign In / Create Account
            </Button>
            <Button variant="contained" color="default" component={Link} to='/create/'>
              Play Without Account
            </Button>
          </ButtonGroup>
        </>
      )}

      {currentUser && (
        <>
          {error && <Alert color="danger">{error}</Alert>}
          
          {loading ? (
            <Spinner color="primary" />
          ) : (
            <ButtonGroup>
              {latestSave && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleContinue}
                >
                  {`Continue (Turn ${latestSave.state.turn})`}
                </Button>
              )}
              <Button
                variant="contained"
                color="default"
                component={Link}
                to='/create/'
              >
                New Game
              </Button>
            </ButtonGroup>
          )}
        </>
      )}
    </GameFrame>
  );
};

const mapStateToProps = (state) => ({
  log: state.log,
  turn: state.turn
});

const mapDispatchToProps = (dispatch) => ({
  updatePlayer: (player) => dispatch(playerActions.updatePlayer(player)),
  updateDungeon: (dungeon) => dispatch(dungeonActions.updateDungeon(dungeon)),
  updateLog: (log) => dispatch(logActions.updateLog(log)),
  incrementTurn: () => dispatch(turnActions.incrementTurn())
});

export default connect(mapStateToProps, mapDispatchToProps)(StartView);
