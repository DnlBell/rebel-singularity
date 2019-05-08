import React, { Component } from 'react';
import styled from 'styled-components';

const LogBox = styled.div`
  height : 250px;
  width : 95%;
  overflow: auto;
  justify-content: left;
`

export default class Log extends Component {

    render(){
      return(
        <LogBox>
          {this.props.children}
          <div style={{ float:"left", clear: "both" }}
                  ref={(el) => { this.messagesEnd = el; }}>
          </div>
        </LogBox>
      )
    }
  
    scrollToBottom = () => {
      this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
    
    componentDidMount() {
      this.scrollToBottom();
    }
    
    componentDidUpdate() {
      this.scrollToBottom();
    }
}