import React, { Component } from 'react';
import {axios} from './http_api.js';
import './App.css';
import  govtData from "./govtData.csv";
import {DengueMap} from "./map.js";

class App extends Component {

  App() {
    console.log("Constructor!");
  }

  componentWillMount(){
    this.state = {};
  }


  render() {
    var data = this.state.csv || {};
    return (
      <div id="map_container">
        <DengueMap />
      </div>

    );

  }
}

export default App;
