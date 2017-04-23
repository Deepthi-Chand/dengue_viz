import React, { Component } from 'react';
import './App.css';
import {DengueMap} from "./map.js";

class App extends Component {

  App() {
    console.log("Constructor!");
  }

  componentWillMount(){
    this.state = {
      selectedYear : "2010",
      selectedIndicator : "cases"
    };
  }

  yearSelectOnChange(e) {
    this.setState({selectedYear: e.target.value});
  }

  indicatorOnChange(e) {
    this.setState({selectedIndicator: e.target.value});
  }

  render() {
    return (
      <div id="map_container">
        <div id='year_select'>
          <input type="range" min="2010" max="2016" step="1" value={this.state.selectedYear}
           onChange={this.yearSelectOnChange.bind(this)} /><br/>
          <label>Selected Year <em>{this.state.selectedYear}</em></label>
        </div>
        <div id="indicatorSelect">
          <div>
            <input type="radio" name="cases"
             value="cases"
             checked={this.state.selectedIndicator === "cases"}
             onChange={this.indicatorOnChange.bind(this)} /> <label>Number of cases</label>
          </div>
          <div>
            <input type="radio" name="deaths"
              value="deaths"
              checked={this.state.selectedIndicator === "deaths"}
              onChange={this.indicatorOnChange.bind(this)} /> <label>Number of deaths</label>
          </div>
        </div>
        <DengueMap
          selectedYear={this.state.selectedYear}
          selectedIndicator={this.state.selectedIndicator} />
      </div>

    );

  }
}

export default App;
