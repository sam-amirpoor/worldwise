import { useNavigate } from "react-router-dom";
import { useGeolocation } from "../../hooks/useGeolocation";
import { useUrlPosition } from "../../hooks/useUrlPosition";

import styles from "./Map.module.css";

import {
  MapContainer,
  TileLayer,
  Popup,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../../contexts/CitiesContext";
import Button from "../Button/Button";

function Map() {
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const { cities } = useCities();
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  const [mapLat, mapLng] = useUrlPosition();

  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  useEffect(
    function () {
      if (geolocationPosition)
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    },
    [geolocationPosition]
  );

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button
          type="position"
          onClick={getPosition}
        >
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </Button>
      )}
      <MapContainer
        center={[mapLat, mapLng]}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => {
          return (
            <Marker
              position={[city.position.lat, city.position.lng]}
              key={city.id}
            >
              <Popup>{city.cityName}</Popup>
            </Marker>
          );
        })}
        <ChangeCenter position={mapPosition}></ChangeCenter>
        <DetectClick></DetectClick>
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position, 6);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

export default Map;
