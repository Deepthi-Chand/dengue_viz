import React, { Component } from 'react';
import {axios} from './http_api.js';
import './App.css';
import  govtData from "./govtData.csv";

class App extends Component {

  App() {
    console.log("Constructor!");

  }

  componentWillMount(){

    this.state = {};
    axios.get(govtData).then(function(response) {
      console.log(response.data);
      this.setState({"csv": response.data});
    }.bind(this)).catch(function(error) {
      console.log(error);
    });
  }


  render() {
    var data = this.state.csv || {};
    return (
      <div className="App">
        <p>{data.toString()}</p>
      </div>
    );

  }
}

export default App;
