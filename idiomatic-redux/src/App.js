import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './components/Main'
import configureStore from './configureStore'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Todo App</h2>
        </div>
        <div className="Main">
            <Main store={configureStore()}/>
        </div>
      </div>
    );
  }
}

export default App;
