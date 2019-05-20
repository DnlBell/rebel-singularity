import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import ItemIcon from './ItemIcon';

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

  constructor(props) {
    super(props);
    this.state = {
      player : this.props.player
    }
  }

  render() {
    return (
      <Wrapper>
        <h2>Weapon</h2>
        <Block>
        <PortraitFrame>
          <Portrait>{this.state.player.weapon.name}</Portrait>
        </PortraitFrame>
        <Summary>
          <p>{this.state.player.weapon.name}</p>
          <p>Damage: {this.state.player.weapon.dieAmmount}d{this.state.player.weapon.damageDie}</p>
        </Summary>
        </Block>
        <h2>Armor</h2>
        <Block>
        <PortraitFrame>
          <Portrait>{this.state.player.armor.name}</Portrait>
        </PortraitFrame>
        <Summary>
          <p>{this.state.player.armor.name}</p>
          <p>ArmorClass: +{this.state.player.armor.armorClass}</p>
        </Summary>
        </Block>
        <h2>Inventory</h2>
        <Block>
          <ItemIcon/>
          <ItemIcon/>
          <ItemIcon/>
          <ItemIcon/>
          <ItemIcon/>
        </Block>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  player: state.playerCharacter.player
});

export default connect(mapStateToProps)(Inventory);
