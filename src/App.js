import React, { Component } from 'react';
import GameView from './view/GameView.js';
import Start from './view/Start.js';
import CreateCharacter from './view/CreateCharacter.js';
import { BrowserRouter as Router, Route} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <Route path = "/" exact component={Start} />
        <Route path = "/create/" component = {CreateCharacter} />
        <Route path ="/game/" component = {GameView} />
      </Router>        
    );
  }
}

export default App;
