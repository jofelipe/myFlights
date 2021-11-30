import { GetStaticProps } from 'next';
import useSWR from 'swr';

import client from 'graphql/client';

import { GET_FLIGHTS_AIRPORTS } from 'graphql/queries';
import { Airport, GetFlightsAirportsQuery } from 'graphql/generated/graphql';
import { ObjectWithNumbers } from 'types';

import Content from 'components/Content';

import AirportTemplate from 'templates/Airport';

type AirportProps = {
  data?: Airport;
};

export default function AirportFewerFlights({
  flights
}: GetFlightsAirportsQuery) {
  const allAirports: number[] = [];

  flights.forEach((flight) => {
    allAirports.push(flight.departureAirport?.unique || 0);
    allAirports.push(flight.arrivalAirport?.unique || 0);
  });

  const reduced: ObjectWithNumbers = allAirports.reduce(
    (acc: ObjectWithNumbers, val) => ({ ...acc, [val]: (acc[val] || 0) + 1 }),
    {}
  );
  const flightsNumber = Math.min(...Object.values(reduced));
  const airportUnique = Object.keys(reduced).find(
    (el) => reduced[el] === flightsNumber
  );

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data }: AirportProps = useSWR(
    '/api/airport?' +
      new URLSearchParams({
        unique: String(airportUnique)
      }),
    fetcher
  );

  return (
    <Content title="Aeroporto com menos voos">
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
