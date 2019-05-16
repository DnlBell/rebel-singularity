import React, { Component } from 'react';
import { connect } from "react-redux";
import {LinearProgress} from '@material-ui/core';
import styled from 'styled-components';

const StatFrame = styled.div`
  display: flex;
  flex-direction: row;
  width:95%;
  height:50px;
  justify-content:space-evenly;
`
const Stat = styled.div`
  width:45%;
  max-width:250px;
`

class StatBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            player: this.props.player
        }
    }

    render(){
        return(
        <StatFrame>
          <Stat>HP({this.state.player.currentHp}/{this.state.player.maxHp})
            <LinearProgress variant="determinate" value={(this.state.player.currentHp/this.state.player.maxHp)*100}/>
          </Stat>
          <Stat>MP({this.state.player.currentMp}/{this.state.player._maxMp})
            <LinearProgress variant="determinate" value={(this.state.player.currentMp/this.state.player.maxMp)*100}/>
          </Stat>
        </StatFrame>
        )
    }

}

const mapStateToProps = state => ({
    player: state.playerCharacter.player
  });

export default connect(mapStateToProps)(StatBox);