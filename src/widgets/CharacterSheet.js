import React, { Component } from 'react';
import styled from 'styled-components';
import LinearProgress from '@material-ui/core/LinearProgress';
import { connect } from 'react-redux';

const Block = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  flex-wrap: wrap;
  justify-content: space-around;
`;
const Summary = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 45%;
  min-width: 150px;
  padding: 8px;
  flex:1;
`;
const StatChunk = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 50%;
  min-width: 150px;
  flex: 1;
  padding: 8px;
`;
const Portrait = styled.div`
  width: 150px;
  height: 150px;
  background-color: blue;
  flex:1;
`;
const PortraitFrame = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Wrapper = styled.div`
  padding: 8px;
`;

class Character extends Component {

  constructor(props) {
    super(props);
    this.state = {
      player : this.props.player
    }
  }

  render() {
    return (
      <Wrapper>
        <h2>{this.state.player.name}</h2><p>Lvl {this.state.player.level} {this.state.player.className}</p>
        <Block>
        <PortraitFrame>
          <Portrait> Character Portrait </Portrait>
        </PortraitFrame>
          <Summary>
              <p>HP<LinearProgress variant="determinate" value={(this.state.player.currentHp/this.state.player.maxhp)*100}/></p>
              <p>MP<LinearProgress variant="determinate" value={(this.state.player.currentMp/this.state.player.maxMp)*100}/></p>
              <p>XP<LinearProgress variant="determinate" value={this.state.player.exp} /></p>
              <p>Armor: {10 + ((this.state.player.dex - 10)/2) + this.state.player.armor.armorClass}</p>
          </Summary>
        </Block>
        <h3>Stats</h3>
        <Block>
          <StatChunk>
            <p>Str: {this.state.player.str} (+{(this.state.player.str - 10)/2})</p>
            <p>Int: {this.state.player.int} (+{(this.state.player.int - 10)/2})</p>
            <p>Dex: {this.state.player.dex} (+{(this.state.player.dex - 10)/2})</p>
          </StatChunk>
          <StatChunk>
            <p>Wis: {this.state.player.wis} (+{(this.state.player.wis - 10)/2})</p>
            <p>Con: {this.state.player.con} (+{(this.state.player.con - 10)/2})</p>
            <p>Cha: {this.state.player.cha} (+{(this.state.player.cha - 10)/2})</p>
          </StatChunk>
        </Block>
        <h3>Skills</h3>
          <Block>
            <StatChunk>
              <p>Perception: {this.state.player.perception + ((this.state.player.wis - 10)/2)}</p>
              <p>Knowledge: {this.state.player.knowledge + ((this.state.player.int - 10)/2)}</p>
              <p>Athletics: {this.state.player.athletics + ((this.state.player.str - 10)/2)}</p>
            </StatChunk>
            <StatChunk>
              <p>Stealth: {this.state.player.stealth + ((this.state.player.dex - 10)/2)}</p>
              <p>Cunning: {this.state.player.cunning + ((this.state.player.dex - 10)/2)}</p>
              <p>Diplomacy: {this.state.player.diplomacy + ((this.state.player.cha - 10)/2)}</p>
            </StatChunk>
            </Block>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  player: state.playerCharacter.player
});

export default connect(mapStateToProps)(Character);
