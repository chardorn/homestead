import './App.css';
import GoogleMap from './GoogleMap';
import MapImage from './MapImage';
import React, { Component, state} from 'react';
import {Link } from "react-router-dom";
import Editor from './Editor.js';
import Sidebar from './Sidebar.js';
import Information from './Information.js';
import {Col, Row, Container} from 'react-bootstrap';
import ScriptTag from 'react-script-tag';




export default class Map extends React.Component {
  state = {
    lat: 35.9132,
    lng: -79.046761,
    zipcode: 0,
    area: 0,
    zoom: 8,
    satellite: false, 
    mode: null,
    points: {
      boundary_points: [],
      boundary: undefined,
      solar: [],
      goat_points: [],
      chicken_coop: [], //per six chickens!!
      cow_horse_points: [],
      wire_points: []
    }
  }

  render(){
  return (
    <div className="App">
      <ScriptTag type="text/javascript" src = "./Zipcodes.js" />
      <header className="App-header">
      <link rel="stylesheet" type="text/css" href="./index.css" />
      
      <Container>
      <Row>
        <Col>
        sidebar
          <Sidebar data={this}/>
        </Col>
        <Col>
        map
          <GoogleMap data={this} />
        </Col>
        <Col>
        info
          <Information data={this}/>
        </Col>
      </Row>
      </Container>
      </header>
    </div>
  );
  }
};


// Add this is wanting to use seperate editor page:
      {/* <Link to={{ 
          pathname: "/editor", 
          state: this.state
          }}>
          Editor
      </Link> */}