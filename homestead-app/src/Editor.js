import React, { Component, state } from 'react';
import MapImage from './MapImage.js';

export default class Editor extends React.Component {

    state = {
        lat: 0,
        lng: 0,
        zoom: 0
    }
    render(){
        
        this.state = this.props.location.state

        return <div>
           <MapImage data = {this} />
           {this.state.lat}
           {this.state.lng}
        </div>
    }
}