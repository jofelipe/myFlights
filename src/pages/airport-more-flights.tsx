import { GetStaticProps } from 'next';
import useSWR from 'swr';

import client from 'graphql/client';

import { GET_FLIGHTS_AIRPORTS } from 'graphql/queries';
import { Airport, GetFlightsAirportsQuery } from 'graphql/generated/graphql';

import Content from 'components/Content';

import AirportTemplate from 'templates/Airport';

interface AirportProps {
  data?: Airport;
}

export default function AirportMoreFlights({
  flights
}: GetFlightsAirportsQuery) {
  const allAirports: number[] = [];

  flights.forEach((flight) => {
    allAirports.push(flight.departureAirport?.unique || 0);
    allAirports.push(flight.arrivalAirport?.unique || 0);
  });

  let flightsNumber = 1;
  let m = 0;
  let unique;

  for (let i = 0; i < allAirports.length; i++) {
    for (let j = i; j < allAirports.length; j++) {
      if (allAirports[i] == allAirports[j]) m++;
      if (flightsNumber < m) {
        flightsNumber = m;
        unique = allAirports[i];
      }
    }
    m = 0;
  }

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data }: AirportProps = useSWR(
    '/api/airport?' +
      new URLSearchParams({
        unique: String(unique)
      }),
    fetcher
  );

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
