import client from 'graphql/client';

import { GetStaticProps } from 'next';
import { GetFlightsMapQuery } from 'graphql/generated/graphql';
import { GET_FLIGHTS_MAP } from 'graphql/queries';
import { useEffect } from 'react';
import { useRedirect } from 'hooks/redirect';

import Map from 'components/FlightsMap';

import * as S from 'styles/index';

export default function Home({ flights }: GetFlightsMapQuery) {
  const { redirect } = useRedirect();

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

  useEffect(() => {
    redirect();
  }, [redirect]);

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
