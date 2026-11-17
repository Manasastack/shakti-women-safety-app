import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap
} from "react-leaflet";
import { useState, useEffect } from "react";

// ✅ Fix 1: This component re-centers the map when position changes
function RecenterMap({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position);
      map.invalidateSize(); // ✅ Fix 2: Forces tile re-render
    }
  }, [position, map]);
  return null;
}

function LiveMap() {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (location) => {
        setPosition([location.coords.latitude, location.coords.longitude]);
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  if (!position) {
    return <h2>Getting your location...</h2>;
  }

  return (
    // ✅ Fix 3: Explicit height on wrapper — "100%" needs a parent with real height
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer
        center={position}
        zoom={15}
        style={{ height: "100%", width: "100%" }}
        // ✅ Fix 4: Ensure Leaflet attribution is correct
        attributionControl={true}
      >
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {/* ✅ Fix 1: Drop RecenterMap inside MapContainer */}
        <RecenterMap position={position} />

        <Marker position={position}>
          <Popup>Your location</Popup>
        </Marker>

        <Circle center={position} radius={500} pathOptions={{ color: "red", fillOpacity: 0.1 }} />
      </MapContainer>
    </div>
  );
}

export default LiveMap;