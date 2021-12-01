import useSWR from 'swr';
import client from 'graphql/client';

import { GetStaticProps } from 'next';
import { GET_FLIGHTS_AIRPLANES } from 'graphql/queries';
import { Airplane, GetFlightsAirplanesQuery } from 'graphql/generated/graphql';

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

  let flightsNumber = 1;
  let m = 0;
  let airplaneUnique;

  for (let i = 0; i < allAirplanes.length; i++) {
    for (let j = i; j < allAirplanes.length; j++) {
      if (allAirplanes[i] == allAirplanes[j]) m++;
      if (flightsNumber < m) {
        flightsNumber = m;
        airplaneUnique = allAirplanes[i];
      }
    }
    m = 0;
  }

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data }: AirplaneProps = useSWR(
    '/api/airplane?' +
      new URLSearchParams({
        unique: String(airplaneUnique)
      }),
    fetcher
  );

  return (
    <Content title="Avião com mais voos">
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
