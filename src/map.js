import React, { Component } from 'react';
import 'leaflet/dist/leaflet.css';
import { Map, TileLayer, GeoJSON } from 'react-leaflet';
import state_json from "./india_telengana.geojson";
import  {axios} from "./http_api.js";

class DengueMap extends Component {

  componentWillMount() {
    this.state = {state_json: {}};
    axios.get(state_json).then(function(response) {
      console.log(response.data);
      this.setState({state_json: response.data});
    }.bind(this)).catch(function(error) {
      console.log(error);
    });

    var container = document.getElementById("root");
    if(container) {
      var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      container.style.height = h + "px";
    }

  }

  render() {
    var url = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
    var attribution = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
    const mapCenter = [20.5937, 78.9629];
    const zoomLevel = 4.5;
    var props = this.props;

    var mapStyle = function(feature) {
      return {
        fillColor: "#FD8D3C",
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
      };
    };

    var component = this;

    var onEachFeature = function(feature, layer) {

    }


    return(
      <Map id="state-map"
        center={mapCenter}
        zoom={zoomLevel}
        zoomControl={true}
        dragging={true}
        scrollWheelZoom={true}
        doubleClickZoom={true}
        boxZoom={true} >
        <TileLayer
          attribution={attribution}
          url={url} />
        <GeoJSON
          data={this.state.state_json}
          style={mapStyle}
          onEachFeature={onEachFeature}
          ref="geojson" />

      </Map>
    );
  }
}


export {DengueMap};
