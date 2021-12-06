import useSWR from 'swr';
import client from 'graphql/client';
import calcMore from 'utils/calcMore';

import { GetStaticProps } from 'next';
import { Airport, GetFlightsAirportsQuery } from 'graphql/generated/graphql';
import { GET_FLIGHTS_AIRPORTS } from 'graphql/queries';
import { fetcher } from 'utils/swr';
import { useEffect } from 'react';
import { useRedirect } from 'hooks/redirect';

import Content from 'components/Content';

import AirportTemplate from 'templates/Airport';

interface AirportProps {
  data?: Airport;
}

export default function AirportMoreFlights({
  flights
}: GetFlightsAirportsQuery) {
  const { redirect } = useRedirect();

  const allAirports: number[] = [];

  flights.forEach((flight) => {
    allAirports.push(flight.departureAirport?.unique || 0);
    allAirports.push(flight.arrivalAirport?.unique || 0);
  });

  const { flightsNumber, unique } = calcMore(allAirports);

  const { data }: AirportProps = useSWR(
    '/api/airport?' +
      new URLSearchParams({
        unique
      }),
    fetcher
  );

  useEffect(() => {
    redirect();
  }, [redirect]);

  return (
    <Content title="Aeroporto mais frequentado">
      {!data ? (
        <p>Carregando...</p>
      ) : (
        <AirportTemplate data={data} flightsNumber={flightsNumber} />
      )}
    </Content>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { flights } = await client.request<GetFlightsAirportsQuery>(
    GET_FLIGHTS_AIRPORTS
  );

  if (!flights) {
    return { notFound: true };
  }

  return {
    props: {
      flights
    }
  };
};
