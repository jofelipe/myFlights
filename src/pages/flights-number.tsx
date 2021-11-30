import { GetStaticProps } from 'next';

import client from 'graphql/client';

import { GET_FLIGHTS_NUMBER } from 'graphql/queries';
import { GetFlightsNumberQuery } from 'graphql/generated/graphql';

import Content from 'components/Content';

import * as S from 'styles/numbers';

export default function Home({ flights }: GetFlightsNumberQuery) {
  const domesticFlights = flights.filter(
    (flight) =>
      flight.arrivalAirport?.country === flight.departureAirport?.country
  );

  const internationalFlights = flights.filter(
    (flight) =>
      flight.arrivalAirport?.country !== flight.departureAirport?.country
  );

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
