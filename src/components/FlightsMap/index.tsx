import GoogleMapReact from 'google-map-react';

import { useState } from 'react';
import { colors, mapStyle } from 'constants/colors';

import Marker from 'components/Marker';

type Marker = {
  lat: number;
  lng: number;
};

type FlightProps = {
  departure: string;
  arrival: string;
  markers: Marker[];
};

type MapProps = {
  flights: FlightProps[];
};

const Map = ({ flights }: MapProps) => {
  const [mapOptions] = useState({
    center: {
      lat: 0,
      lng: 0
    },
    zoom: 0
  });

  const googleMapApiOptions = {
    disableDefaultUI: false,
    styles: mapStyle,
    restriction: {
      latLngBounds: { north: 83.8, south: -57, west: -180, east: 180 }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderRoutes = (map: any, maps: any) => {
    flights.forEach((flight) => {
      const geodesicPolyline = new maps.Polyline({
        path: flight.markers,
        geodesic: true,
        strokeColor: colors.text,
        strokeOpacity: 1.0,
        strokeWeight: 2
      });
      geodesicPolyline.setMap(map);
    });

    fitBounds(map, maps);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fitBounds = (map: any, maps: any) => {
    const bounds = new maps.LatLngBounds();

    flights.forEach((flight) => {
      flight.markers.forEach((marker) => {
        bounds.extend(new maps.LatLng(marker.lat, marker.lng));
      });
    });

    map.fitBounds(bounds);
    map.setZoom(map.getZoom() - 15);
  };

  return (
    <GoogleMapReact
      bootstrapURLKeys={{
        key: String(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API),
        language: 'pt-BR'
      }}
      defaultCenter={mapOptions.center}
      defaultZoom={mapOptions.zoom}
      zoom={mapOptions.zoom}
      options={googleMapApiOptions}
      yesIWantToUseGoogleMapApiInternals
      onGoogleApiLoaded={({ map, maps }) => renderRoutes(map, maps)}
    >
      {flights?.map(({ departure, arrival, markers }) =>
        markers.map((marker, i) => (
          <Marker
            key={i}
            title={i === 0 ? departure : arrival}
            lat={marker.lat}
            lng={marker.lng}
          />
        ))
      )}
    </GoogleMapReact>
  );
};

export default Map;
