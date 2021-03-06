import React, { Component } from 'react';
import firebase from '../../firebase/firebase.utils';
import { GoogleMap, LoadScript, Marker, Circle, StandaloneSearchBox, InfoWindow } from '@react-google-maps/api';
import CustomMarker from './CustomMarker'
/* import ViewProfile from '../view-profile/viewprofile.component'; */
import * as geofirex from 'geofirex';

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

import { LinkContainer } from 'react-router-bootstrap';


const geo = geofirex.init(firebase);

const mapsApiKey = process.env.REACT_APP_MAPS_API_KEY;

const cameraIcon = "camera.svg"

const mapContainerStyle = {
    height: "600px",
    width: "100vw"
}

const mapCenter = {
    lat: 37.09024,
    lng: -95.712891
}

const circleOptions = {
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

// Profile should go here: to={`/user/${this.state.infoWindow.userId}`}

export default class Map extends Component {

    constructor() {

        super();

        this.state = {

            mapCenter: mapCenter,
            shootPosition: null,
            circleCenter: null,
            mapZoom: 4,
            users: [],
            showInfoWindow: false,
            infoWindow: {

                position: {},
                title: "",
                userId: "",

            }

        }

        this.handleMarkerClick = this.handleMarkerClick.bind(this)
        this.closeInfoWindow = this.closeInfoWindow.bind(this)

    }

    handleMarkerClick(e, props) {

        this.setState({

            showInfoWindow: true,

            infoWindow: {

                position: props.position,
                title: props.user.displayName,
                userId: props.user.id,
                profile_pic: props.user.profile_pic,
                img_url: props.user.img_url,

            }

        })

    };

    closeInfoWindow() {

        this.setState({

            showInfoWindow: false

        })

    }

    render() {

        let { mapCenter, shootPosition, circleCenter, mapZoom } = this.state;

        const onLoadSearchBox = ref => this.searchBox = ref;

        const onPlacesChanged = () => {

            const targetLat = this.searchBox.getPlaces()[0].geometry.location.lat();
            const targetLng = this.searchBox.getPlaces()[0].geometry.location.lng();

            onMarkerPosChanged(targetLat, targetLng);

            this.setState({

                mapCenter: { lat: targetLat, lng: targetLng },
                shootPosition: { lat: targetLat, lng: targetLng },
                circleCenter: { lat: targetLat, lng: targetLng },
                mapZoom: 10,

            });

        }

        const onMarkerPosChanged = (lat, lng) => {

            if (!lat) {
                lat = mapCenter.lat;
            }

            if (!lng) {
                lng = mapCenter.lng;
            }

            const center = geo.point(lat, lng);
            const radius = 40;
            const field = 'position';
            const users = firebase.firestore().collection('users');
            const usersWithinArea = geo.query(users).within(center, radius, field);

            usersWithinArea.subscribe((snapshot) => {

                this.setState({

                    showInfoWindow: false,
                    users: snapshot,

                })

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
                        position={shootPosition}
                        onPositionChanged={onMarkerPosChanged}
                    />
                    {
                        this.state.users.map(user => {

                            const userId = user.id;

                            const lat = user.position.geopoint.O;
                            const lng = user.position.geopoint.F;
                            const geocode = { lat: lat, lng: lng };

                            const geohash = user.position.geohash;

                            return <CustomMarker user={user} key={userId} position={geocode} icon={cameraIcon} options={{ userId, geocode, geohash, }} onMarkerClick={this.handleMarkerClick} />

                        })
                    }
                    {
                        this.state.showInfoWindow &&


                        <InfoWindow position={this.state.infoWindow.position} onCloseClick={this.closeInfoWindow} options={{ pixelOffset: { width: 0, height: -40, widthUnit: "px", heightUnit: "px" } }}>
                            <Card style={{ width: "175px" }}>
                                <Card.Img variant="top" src={this.state.infoWindow.img_url} />
                                <Card.Body>
                                    <Card.Title>{this.state.infoWindow.title}</Card.Title>
                                    <Card.Text>
                                        Check out my work!
                                    </Card.Text>
                                    <LinkContainer to={`/user/${this.state.infoWindow.userId}`}>
                                        <Button variant="info">Profile</Button>
                                    </LinkContainer>
                                </Card.Body>
                            </Card>

                        </InfoWindow>
                    }
                    <Circle
                        center={circleCenter}
                        options={circleOptions}
                    />
                </GoogleMap>
            </LoadScript>
        )
    }
}
