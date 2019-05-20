import React, { Component } from 'react';
import styled from 'styled-components';

const IconImage = styled.div`
    min-width: 75px;
    max-width: 75px;
    height: 75px;
    background-color: blue;
    flex:1;
    margin:5%;
    display: flex;
    justify-content: start;
    align-items: start;
    display:inline-block;`

class ItemIcon extends Component {

    render(){
        return(<IconImage>Item Name</IconImage>)
    }
}

export default ItemIcon;