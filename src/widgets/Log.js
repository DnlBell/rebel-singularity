import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

const LogBox = styled.div`
  height : 400px;
  width : 95%;
  overflow: auto;
  justify-content: left;
`

class Log extends Component {

    render(){
      return(
        <LogBox>
          {this.props.log.map(txt => <div>{txt}</div>)}
          <div style={{ float:"left", clear: "both" }}
                  ref={(el) => { this.messagesEnd = el; }}>
          </div>
        </LogBox>
      )
    }
  
    scrollToBottom = () => {
      this.messagesEnd.scrollIntoView({ behavior: "smooth", block: 'nearest', inline: 'start' });
    }
    
    componentDidMount() {
      this.scrollToBottom();
    }
    
    componentDidUpdate() {
      this.scrollToBottom();
    }
}

const mapStateToProps = state => ({
  log: state.log
});

export default connect(mapStateToProps)(Log)