import client from 'graphql/client';
import calcDistance from 'utils/calcDistance';

import { GetStaticProps } from 'next';
import { GetFlightsMapQuery } from 'graphql/generated/graphql';
import { GET_FLIGHTS_MAP } from 'graphql/queries';
import { useEffect } from 'react';
import { useRedirect } from 'hooks/redirect';

import Content from 'components/Content';

import * as S from 'styles/numbers';

export default function Distance({ flights }: GetFlightsMapQuery) {
  const { redirect } = useRedirect();

  const travelAroundEarthDistance = 40.075;

  let totalDistance = 0;

  const distance = (lat1 = 0, lng1 = 0, lat2 = 0, lng2 = 0) => {
    const distance = calcDistance(lat1, lng1, lat2, lng2);

    totalDistance = totalDistance + distance;
  };

  flights.forEach(({ arrivalAirport, departureAirport }) => {
    distance(
      arrivalAirport?.location.latitude,
      arrivalAirport?.location.longitude,
      departureAirport?.location.latitude,
      departureAirport?.location.longitude
    );
  });

  useEffect(() => {
    redirect();
  }, [redirect]);

  return (
    <Content title="Distância total">
      <S.NumberInfo>
        <div>
          <strong className="small">
            {totalDistance.toLocaleString('pt-BR', {
              maximumFractionDigits: 0
            })}
          </strong>
          <span>Quilômetros</span>
        </div>

        <div>
          <strong className="small">
            {`${(totalDistance / travelAroundEarthDistance).toLocaleString(
              'pt-BR',
              { maximumFractionDigits: 0 }
            )}x`}
          </strong>
          <span>Voltas na Terra</span>
        </div>
      </S.NumberInfo>
    </Content>
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
