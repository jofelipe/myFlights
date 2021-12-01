import useSWR from 'swr';
import client from 'graphql/client';

import { GetStaticProps } from 'next';
import { GET_FLIGHTS_AIRPLANES } from 'graphql/queries';
import { Airplane, GetFlightsAirplanesQuery } from 'graphql/generated/graphql';
import { ObjectWithNumbers } from 'types';

import Content from 'components/Content';

import AirplaneTemplate from 'templates/Airplane';

interface AirplaneProps {
  data?: Airplane;
}

export default function AirplaneFewerFlights({
  flights
}: GetFlightsAirplanesQuery) {
  const allAirplanes: number[] = [];

  flights.forEach((flight) => {
    allAirplanes.push(flight.airplane?.unique || 0);
  });

  const reduced: ObjectWithNumbers = allAirplanes.reduce(
    (acc: ObjectWithNumbers, val) => ({ ...acc, [val]: (acc[val] || 0) + 1 }),
    {}
  );
  const flightsNumber = Math.min(...Object.values(reduced));
  const airplaneUnique = Object.keys(reduced).find(
    (el) => reduced[el] === flightsNumber
  );

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data }: AirplaneProps = useSWR(
    '/api/airplane?' +
      new URLSearchParams({
        unique: String(airplaneUnique)
      }),
    fetcher
  );

  return (
    <Content title="Avião com menos voos">
      {!data ? (
        <p>Carregando...</p>
      ) : (
        <AirplaneTemplate
          airplaneUnique={airplaneUnique || 0}
          data={data}
          flightsNumber={flightsNumber}
        />
      )}
    </Content>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { flights } = await client.request<GetFlightsAirplanesQuery>(
    GET_FLIGHTS_AIRPLANES
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
