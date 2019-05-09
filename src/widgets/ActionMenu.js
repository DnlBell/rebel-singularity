import React, { Component } from 'react';
import { connect } from "react-redux";

class ActionMenu extends Component {

    constructor(props){
        super(props)
        this.state = {
            player : this.props.player 
        };
    }

    render() {
        return(<div></div>)
    }

}

const mapStateToProps = state => ({
    player: state.playerCharacter.player
});

export default connect(mapStateToProps)(ActionMenu)