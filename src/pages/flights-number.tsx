import client from 'graphql/client';

import { GetStaticProps } from 'next';
import { GetFlightsNumberQuery } from 'graphql/generated/graphql';
import { GET_FLIGHTS_NUMBER } from 'graphql/queries';
import { useEffect } from 'react';
import { useRedirect } from 'hooks/redirect';

import Content from 'components/Content';

import * as S from 'styles/numbers';

export default function Home({ flights }: GetFlightsNumberQuery) {
  const { redirect } = useRedirect();

  const domesticFlights = flights.filter(
    (flight) =>
      flight.arrivalAirport?.country === flight.departureAirport?.country
  );

  const internationalFlights = flights.filter(
    (flight) =>
      flight.arrivalAirport?.country !== flight.departureAirport?.country
  );

  useEffect(() => {
    redirect();
  }, [redirect]);

  return (
    <Content title="Número de voos">
      <S.NumberInfo>
        <div>
          <strong>{domesticFlights.length}</strong>
          <span>Voos domésticos</span>
        </div>

        <div>
          <strong>{internationalFlights.length}</strong>
          <span>Voos internacionais</span>
        </div>
      </S.NumberInfo>
    </Content>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { flights } = await client.request<GetFlightsNumberQuery>(
    GET_FLIGHTS_NUMBER
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
