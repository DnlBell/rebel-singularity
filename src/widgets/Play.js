import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import ActionMenu from './ActionMenu.js';
import Log from './Log.js';
import StatBox from './StatBox';

const PlayFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

class Play extends Component {

  constructor(props) {
    super(props);
    this.state = {
      player: this.props.player,
    }
  }

  render() {  
    return (
      <PlayFrame>
        <Log/>
        <StatBox/>
        <ActionMenu/>
      </PlayFrame>
    );
  }

}

const mapStateToProps = state => ({
  player: state.playerCharacter.player
});

export default connect(mapStateToProps)(Play);



