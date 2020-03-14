import React, { Component } from 'react';
require('dotenv').config();

//try @react-google-maps/api instead

const loadGoogleMapsApi = require('load-google-maps-api');

loadGoogleMapsApi({ key: `${process.env.REACT_APP_MAPS_API_KEY}` }).then((googleMaps) => {
    new googleMaps.Map(document.querySelector('.map'), {
        center: {
            lat: 40.7484405,
            lng: -73.9944191
        },
        zoom: 12
    })
}).catch((e) => {
    console.error(e)
})

export default class Map extends Component {
    render() {
        return (
            <div className="map" style={{height: "50vh", width: "100vw"}}/>

        )
    }
}
