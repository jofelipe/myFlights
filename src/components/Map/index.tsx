import GoogleMapReact from 'google-map-react';
import { useState } from 'react';
import { mapStyle } from 'constants/colors';

import Marker from 'components/Marker';

type MapProps = {
  name: string;
  lat: number;
  lng: number;
  zoom: number;
};

const Map = ({ name, lat, lng, zoom }: MapProps) => {
  const [mapOptions] = useState({
    center: {
      lat,
      lng
    },
    zoom
  });

  const googleMapApiOptions = {
    disableDefaultUI: true,
    styles: mapStyle,
    restriction: {
      latLngBounds: { north: 83.8, south: -57, west: -180, east: 180 }
    }
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
    >
      <Marker title={name} lat={lat} lng={lng} size={64} />
    </GoogleMapReact>
  );
};

export default Map;
