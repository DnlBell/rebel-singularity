import React, { Component } from 'react';
import styled from 'styled-components';
import LinearProgress from '@material-ui/core/LinearProgress';

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
        <Block>
        <PortraitFrame>
          <Portrait/>
        </PortraitFrame>
          <Summary>
            <h2>Name</h2>
              <p>Lvl 1 ClassName</p>
              <p>XP<LinearProgress variant="determinate" value='50' /></p>
              <p>HP<LinearProgress variant="determinate" value='50'/></p>
              <p>MP<LinearProgress variant="determinate" value='50' /></p>
          </Summary>
        </Block>
        <h3>Stats</h3>
        <Block>
          <StatChunk>
            <p>Str: 10 (+0)</p>
            <p>Int: 10 (+0)</p>
            <p>Dex: 10 (+0)</p>
          </StatChunk>
          <StatChunk>
            <p>Wis: 10 (+0)</p>
            <p>Con: 10 (+0)</p>
            <p>Cha: 10 (+0)</p>
          </StatChunk>
        </Block>
        <h3>Skills</h3>
          <Block>
            <Skill><p>Perception: 1</p></Skill>
            <Skill><p>Athletics: 1</p></Skill>
          </Block>
      </Wrapper>
    );
  }
}

export default Character;
