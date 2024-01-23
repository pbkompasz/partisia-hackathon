import { Marker, Popup } from "react-leaflet";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { useMapEvents } from "react-leaflet/hooks";
import { Polygon, Circle, Polyline, Rectangle } from "react-leaflet";

// This is probably overkill
// Add possibility to mark an area

const Vector = ({ vector }) => {
  const {
    type = "polygon",
    center,
    radius,
    corners = [],
    color = "black",
  } = vector;
  if (type === "circle") {
    return <Circle center={center} pathOptions={{ color }} radius={radius} />;
  } else if (type === "line") {
    return <Polyline pathOptions={{ color }} positions={corners} />;
  } else if (type === "polygon") {
    return <Polygon pathOptions={{ color }} positions={corners} />;
  } else if (type === "rectangle") {
    return <Rectangle bounds={corners} pathOptions={{ color }} />;
  }
  return <></>;
};

const Route = ({ coordinates }) => {
  let coordA = coordinates[0];
  const polygons = [];
  for (let i = 1; i < coordinates.length; i++) {
    const coordB = coordinates[i];
    polygons.push(
      <Vector
        vector={{
          type: "polygon",
          corners: [coordA, coordB],
        }}
      ></Vector>
    );
    coordA = coordB;
  }
  console.log(polygons);
  return polygons;
};

const Map = ({
  height = "400px",
  width = "400px",
  markers = [],
  temporaryMarkers = [],
  vectors = [
    // {
    //   id: 1,
    //   corners: [
    //     [51.49, -0.08],
    //     [51.5, -0.06],
    //   ],
    //   color: "red",
    //   type: "rectangle",
    // },
  ],
  routes = [
    // {
    //   id: 1,
    //   coordinates: [
    //     [51.56764, 0.018659],
    //     [51.568065, 0.018478],
    //     [51.568748, 0.018176],
    //     [51.569449, 0.017866],
    //     [51.570003, 0.01762],
    //     [51.570025, 0.017624],
    //     [51.570049, 0.017637],
    //   ],
    // },
  ],
  center = [51.505, -0.09],
  zoom = 13,
  onClick,
}) => {
  const LocationFinderDummy = () => {
    useMapEvents({
      click(e) {
        onClick(e.latlng);
      },
    });
    return null;
  };

  return (
    <MapContainer center={center} zoom={zoom} style={{ height, width }}>
      <LocationFinderDummy />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((marker) => (
        <Marker key={marker.id} position={marker.location}>
          <Popup>{marker.name}</Popup>
        </Marker>
      ))}
      {temporaryMarkers.map((marker) => (
        <Marker key={marker.id} position={marker.location}>
          <Popup>{marker.name}</Popup>
        </Marker>
      ))}
      {vectors.map((vector) => (
        <Vector key={vector.id} vector={vector}></Vector>
      ))}
      {routes.map((route) => (
        <Route key={route.id} coordinates={route.coordinates}></Route>
      ))}
    </MapContainer>
  );
};

export default Map;
