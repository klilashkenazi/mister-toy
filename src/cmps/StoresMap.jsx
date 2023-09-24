import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';
import { ApiKey } from "../services/api-key";

const AnyReactComponent = ({ text }) => <div style={{ fontSize: '20px' }}>{text}</div>;

export function StoresMap() {

    const [coordinates, setCoordinates] = useState({ lat: 32.0853, lng: 34.7818 })
    const zoom = 9


    function handleClick( lat, lng ) {
        console.log(lat, lng)
        setCoordinates({ lat, lng })
    }

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '400px', width: '70%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: ApiKey() }}
                center={coordinates}
                defaultZoom={zoom}

            >
                <AnyReactComponent
                    lat={32.085300}
                    lng={34.781769}
                    text="🚩"
                />
                <AnyReactComponent
                    lat={32.437408}
                    lng={34.925621}
                    text="🚩"
                />
                <AnyReactComponent
                    lat={32.016499}
                    lng={34.750278}
                    text="🚩"
                />
            </GoogleMapReact>
            <section className="stores">
                <h3 onClick={() => {handleClick(32.085300, 34.781769)}}>Tel Aviv</h3>
                <h3 onClick={() => {handleClick(32.437408, 34.925621)}}>Hadera</h3>
                <h3 onClick={() => {handleClick(32.016499, 34.750278)}}>Bat Yam</h3>
            </section>
        </div>
    );
}