import React, { Component } from 'react';
import styled from 'styled-components';

const Portrait = styled.div`
  width: 150px;
  height: 150px;
  background-color: blue;
  flex:1;
`;

const ItemPic = styled.div`
  width: 75px;
  height: 75px;
  background-color: blue;
  flex:1;
  margin:8px;
`;

const PortraitFrame = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

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

const Wrapper = styled.div`
  padding: 8px;
`;

class Inventory extends Component {
  render() {
    return (
      <Wrapper>
        <h2>Weapon</h2>
        <Block>
        <PortraitFrame>
          <Portrait/>
        </PortraitFrame>
        <Summary>
          <p>Weapon Name</p>
          <p>Damage Die</p>
          <p>Damage Type</p>
        </Summary>
        </Block>
        <h2>Armor</h2>
        <Block>
        <PortraitFrame>
          <Portrait/>
        </PortraitFrame>
        <Summary>
          <p>Armor Name</p>
          <p>Armor Bonus</p>
          <p>Armor Type</p>
        </Summary>
        </Block>
        <h2>Inventory</h2>
        <Block>
          <PortraitFrame>
            <ItemPic/>
          </PortraitFrame>
          <PortraitFrame>
            <ItemPic/>
          </PortraitFrame>
          <PortraitFrame>
            <ItemPic/>
          </PortraitFrame>
          <PortraitFrame>
            <ItemPic/>
          </PortraitFrame>
        </Block>
      </Wrapper>
    );
  }
}

export default Inventory;
