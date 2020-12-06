import './App.css';
import GoogleMap from './GoogleMap';
import MapImage from './MapImage';
import React, { Component, state } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Editor from './Editor.js';
import Routes from './routes.js';


export default class App extends React.Component {

  render(){

  return (
    <div className="App">
      <head>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
      </link>
    </head>
      <Routes/>
    </div>
  );
  }
};


