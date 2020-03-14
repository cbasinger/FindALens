import React, { Component } from 'react';
import { GoogleMap, LoadScript, Circle, StandaloneSearchBox } from '@react-google-maps/api'
require('dotenv').config();

const mapsApiKey = process.env.REACT_APP_MAPS_API_KEY;

const mapContainerStyle = {
    height: "400px",
    width: "800px"
}

const center = {
    lat: 33.7489,
    lng: -84.3879
}

const options = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    zIndex: 1
}



export default class Map extends Component {
    render() {

        const onLoad = ref => this.searchBox = ref;

        const onPlacesChanged = () => console.log(this.searchBox.getPlaces());
        
        return (
            <LoadScript
                id="script-loader"
                googleMapsApiKey={mapsApiKey}
                libraries={["places"]}
            >
                <GoogleMap
                    id="map"
                    mapContainerStyle={mapContainerStyle}
                    zoom={9}
                    center={center}
                >
                    <StandaloneSearchBox
                        onLoad={onLoad}
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
                    <Circle
                        // optional
                        // onLoad={onLoad}
                        // optional
                        // onUnmount={onUnmount}
                        // required
                        center={center}
                        // required
                        options={options}
                    />
                </GoogleMap>
            </LoadScript>
        )
    }
}
