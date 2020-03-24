import React from 'react'
import { Marker } from '@react-google-maps/api'

const CustomMarker = (props) => {

    const onMarkerClick = (e) => {

        props.onMarkerClick(e, props)

    }

    return (

        <Marker onClick={onMarkerClick} {...props}/>

    )

}

export default CustomMarker
