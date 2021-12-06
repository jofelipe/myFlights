import useSWR from 'swr';
import client from 'graphql/client';
import calcFewer from 'utils/calcFewer';

import { GetStaticProps } from 'next';
import { Airplane, GetFlightsAirplanesQuery } from 'graphql/generated/graphql';
import { GET_FLIGHTS_AIRPLANES } from 'graphql/queries';
import { fetcher } from 'utils/swr';
import { useEffect } from 'react';
import { useRedirect } from 'hooks/redirect';

import Content from 'components/Content';

import AirplaneTemplate from 'templates/Airplane';

interface AirplaneProps {
  data?: Airplane;
}

export default function AirplaneFewerFlights({
  flights
}: GetFlightsAirplanesQuery) {
  const { redirect } = useRedirect();

  const allAirplanes: number[] = [];

  flights.forEach((flight) => {
    allAirplanes.push(flight.airplane?.unique || 0);
  });

  const { flightsNumber, unique } = calcFewer(allAirplanes);

  const { data }: AirplaneProps = useSWR(
    '/api/airplane?' +
      new URLSearchParams({
        unique
      }),
    fetcher
  );

  useEffect(() => {
    redirect();
  }, [redirect]);

  return (
    <Content title="Avião com menos voos">
      {!data ? (
        <p>Carregando...</p>
      ) : (
        <AirplaneTemplate
          airplaneUnique={unique}
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
