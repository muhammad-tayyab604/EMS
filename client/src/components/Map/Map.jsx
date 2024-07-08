import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Map = ({ lat, long, venue }) => {
  return (
    <MapContainer
      style={{ height: "100%", width: "100%" }}
      center={[lat, long]}
      className="rounded"
      zoom={7}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, long]}>
        <Popup>{venue}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
