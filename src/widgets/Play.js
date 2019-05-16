import React, { Component } from 'react';
import styled from 'styled-components';
import ActionMenu from './ActionMenu.js';
import Log from './Log.js';
import StatBox from './StatBox';

const PlayFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

class Play extends Component {

  render() {  
    return (
      <PlayFrame>
        <Log/>
        <StatBox/>
        <ActionMenu/>
      </PlayFrame>
    );
  }

}

export default Play;



