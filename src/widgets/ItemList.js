import React, { Component } from 'react';
import connect from 'react-redux';

class ItemList extends Component {
    
    render(){
        return(<div/>)
    }
}

const mapStateToProps = state => ({
    inventory: state.playerCharacter.player.inventory
  });
  
  export default connect(mapStateToProps)(ItemList);