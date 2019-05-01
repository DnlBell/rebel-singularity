import React, { Component } from 'react';
import styled from 'styled-components';
import LinearProgress from '@material-ui/core/LinearProgress';
import Player from '../models/character/player.js';
import { connect } from 'react-redux'

const player = new Player("Bob","Enforcer");

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
const SkillBlock =styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`
const Skill = styled.div`
  display: flex;
  width: 50%;
  flex: 1;
  min-width:110px;
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
  render() {
    return (
      <Wrapper>
        <h2>{player.name}</h2><p>Lvl {player.level} {player.className}</p>
        <Block>
        <PortraitFrame>
          <Portrait/>
        </PortraitFrame>
          <Summary>
              <p>HP<LinearProgress variant="determinate" value={(player.currentHp/player.maxhp)*100}/></p>
              <p>MP<LinearProgress variant="determinate" value={(player.currentMp/player.maxMp)*100} /></p>
              <p>XP<LinearProgress variant="determinate" value={player.exp} /></p>
              <p>Armor: {player.ac}</p>
          </Summary>
        </Block>
        <h3>Stats</h3>
        <Block>
          <StatChunk>
            <p>Str: {player.str} (+{(player.str - 10)/2})</p>
            <p>Int: {player.int} (+{(player.int - 10)/2})</p>
            <p>Dex: {player.dex} (+{(player.dex - 10)/2})</p>
          </StatChunk>
          <StatChunk>
            <p>Wis: {player.wis} (+{(player.wis - 10)/2})</p>
            <p>Con: {player.con} (+{(player.con - 10)/2})</p>
            <p>Cha: {player.cha} (+{(player.cha - 10)/2})</p>
          </StatChunk>
        </Block>
        <h3>Skills</h3>
          <SkillBlock>
            <Skill><p>Perception: {player.perception}</p></Skill>
            <Skill><p>Knowledge: {player.knowledge}</p></Skill>
            <Skill><p>Athletics: {player.athletics}</p></Skill>
            <Skill><p>Stealth: {player.stealth}</p></Skill>
            <Skill><p>Cunning: {player.cunning}</p></Skill>
            <Skill><p>Diplomacy: {player.diplomacy}</p></Skill>
          </SkillBlock>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  playerCharacter: state.playerCharacter,
});

export default connect(mapStateToProps)(Character);
