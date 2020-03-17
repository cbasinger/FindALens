import React, { Component } from 'react';
import firebase, { firestore } from '../../firebase/firebase.utils';
import { GoogleMap, LoadScript, Marker, Circle, StandaloneSearchBox } from '@react-google-maps/api';
import * as geofirex from 'geofirex';

/*
const geo = geofirex.init(firebase);
const position = geo.point(-84.37, 33.84);
firestore.collection('users').add({ displayName: 'Jorge', position });
*/

const mapsApiKey = process.env.REACT_APP_MAPS_API_KEY;

const mapContainerStyle = {
    height: "600px",
    width: "100vw"
}

const mapCenter = {
    lat: 37.09024,
    lng: -95.712891
}

const options = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 1,
    fillColor: '#00FFFF',
    fillOpacity: 0.2,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 40000,
    zIndex: 1
}

const placesLib = ["places"]

export default class Map extends Component {

    constructor() {

        super();

        this.state = {
            
            mapCenter: mapCenter,
            shootPosition: null,
            circleCenter: null,
            mapZoom: 4,

        }

    }
    
    render() {

        let { mapCenter, shootPosition, circleCenter, mapZoom } = this.state;

        const onLoadSearchBox = ref => this.searchBox = ref;

        const onLoadMarker = marker => {
            console.log('marker: ', marker.position)
        }

        const onPlacesChanged = () => {
            
            const targetLat = this.searchBox.getPlaces()[0].geometry.location.lat();
            const targetLng = this.searchBox.getPlaces()[0].geometry.location.lng();
            
            this.setState({

                mapCenter: { lat: targetLat, lng: targetLng },
                shootPosition: { lat: targetLat, lng: targetLng },
                circleCenter: { lat: targetLat, lng: targetLng },
                mapZoom: 10

            });
            
        }

        return (
            <LoadScript
                id="script-loader"
                googleMapsApiKey={mapsApiKey}
                libraries={placesLib}
            >
                <GoogleMap
                    id="map"
                    mapContainerStyle={mapContainerStyle}
                    zoom={mapZoom}
                    center={mapCenter}
                >
                    <StandaloneSearchBox
                        onLoad={onLoadSearchBox}
                        onPlacesChanged={onPlacesChanged}
                    >
                        <input
                            type="text"
                            placeholder="Customized your placeholder"
                            style={{
                                boxSizing: `border-box`,
                                border: `1px solid transparent`,
                                width: `240px`,
                                height: `32px`,
                                padding: `0 12px`,
                                borderRadius: `3px`,
                                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                                fontSize: `14px`,
                                outline: `none`,
                                textOverflow: `ellipses`,
                                position: "absolute",
                                left: "50%",
                                marginLeft: "-120px"
                            }}
                        />
                    </StandaloneSearchBox>
                    <Marker
                        onLoad={onLoadMarker}
                        position={shootPosition}
                    />
                    <Circle
                        // optional
                        // onLoad={onLoad}
                        // optional
                        // onUnmount={onUnmount}
                        // required
                        center={circleCenter}
                        // required
                        options={options}
                    />
                </GoogleMap>
            </LoadScript>
        )
    }
}
