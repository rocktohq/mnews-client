import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./Map.css";
import "leaflet/dist/leaflet.css";
import iconLink from "leaflet/dist/images/marker-icon.png";
import L from "leaflet";

const Map = () => {
  const state = {
    center: [23.8311, 90.4243],
    zoom: 13,
  };

  const icon = L.icon({ iconUrl: iconLink });

  return (
    <div>
      <MapContainer center={state.center} zoom={state.zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetxMap</a> contributors'
          url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        <Marker position={state.center} icon={icon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
export default Map;
