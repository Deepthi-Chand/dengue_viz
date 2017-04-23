import React, { Component } from 'react';
import 'leaflet/dist/leaflet.css';
import { Map, TileLayer, GeoJSON } from 'react-leaflet';
import stateJson from "./india_telengana.json";
import dengueData from "./data.json";

class DengueMap extends Component {

  componentWillMount() {
    var container = document.getElementById("root");
    if(container) {
      var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      container.style.height = h + "px";
    }
  }

  render() {
    const url = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
    const attribution = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
    const mapCenter = [20.5937, 78.9629];
    const zoomLevel = 4.5;

    const getColor = function(d, selectedIndicator) {
      if(d === "NA") {
        return "#ff0";
      }
      return d > 1000 ? '#800026' :
           d > 500  ? '#BD0026' :
           d > 200  ? '#E31A1C' :
           d > 100  ? '#FC4E2A' :
           d > 50   ? '#FD8D3C' :
           d > 20   ? '#FEB24C' :
           d > 10   ? '#FED976' :
                      '#FFEDA0';
    }

    var selectedIndicator = this.props.selectedIndicator;
    var selectedYear = this.props.selectedYear;
    const mapStyle = function(feature) {
      const state = feature.properties.NAME_1;

      var d = "NA";
      if(dengueData !== undefined && dengueData[state] !== undefined) {
        if(selectedIndicator === "cases") {
          d = dengueData[state][selectedYear].C;
        } else {
          d = dengueData[state][selectedYear].D;
        }
      } else {
        console.log(state + " doesn't seem to have any data");
      }

      return {
        fillColor: getColor(d, selectedIndicator),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
      };
    };

    const onEachFeature = function(feature, layer) {
      const getMessage = function() {
        const state = feature.properties.NAME_1;
        if(dengueData !== undefined && dengueData[state] !== undefined) {
          return "State: " + state + " : " + dengueData[state][selectedYear].C +
           " Cases and " + dengueData[state][selectedYear].D + " deaths";
        } else {
          return "No data available";
        }
      }
      layer.bindPopup(getMessage);
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
          data={stateJson}
          style={mapStyle}
          onEachFeature={onEachFeature}
          ref="geojson" />

      </Map>
    );
  }
}


export {DengueMap};
