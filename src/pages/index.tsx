import { GetStaticProps } from 'next';

import client from 'graphql/client';

import Map from 'components/FlightsMap';

import { GET_FLIGHTS_MAP } from 'graphql/queries';
import { GetFlightsMapQuery } from 'graphql/generated/graphql';

import * as S from 'styles/index';

export default function Home({ flights }: GetFlightsMapQuery) {
  const formattedFlights = flights.map((flight) => ({
    departure: flight.departureAirport?.name || '',
    arrival: flight.arrivalAirport?.name || '',
    markers: [
      {
        lat: flight.departureAirport?.location.latitude || 0,
        lng: flight.departureAirport?.location.longitude || 0
      },
      {
        lat: flight.arrivalAirport?.location.latitude || 0,
        lng: flight.arrivalAirport?.location.longitude || 0
      }
    ]
  }));

  return (
    <S.Map>
      <Map flights={formattedFlights} />
    </S.Map>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { flights } = await client.request<GetFlightsMapQuery>(GET_FLIGHTS_MAP);

  if (!flights) {
    return { notFound: true };
  }

  return {
    props: {
      flights
    }
  };
};
