import React, { Component } from 'react';
import connect from 'react-redux';

class ItemList extends Component {
    
    render(){
        return(<div/>)
    }
}

const mapStateToProps = state => ({
    inventory: state.player.inventory
  });
  
  export default connect(mapStateToProps)(ItemList);