import { GetStaticProps } from 'next';

import client from 'graphql/client';

import { GET_FLIGHTS_MAP } from 'graphql/queries';
import { GetFlightsMapQuery } from 'graphql/generated/graphql';

import Content from 'components/Content';

import * as S from 'styles/numbers';

export default function Distance({ flights }: GetFlightsMapQuery) {
  const pi = 0.017453292519943295;
  const travelAroundEarthDistance = 40.075;

  let totalDistance = 0;

  const distance = (lat1 = 0, lng1 = 0, lat2 = 0, lng2 = 0) => {
    const c = Math.cos;
    const a =
      0.5 -
      c((lat2 - lat1) * pi) / 2 +
      (c(lat1 * pi) * c(lat2 * pi) * (1 - c((lng2 - lng1) * pi))) / 2;

    const distance = 12742 * Math.asin(Math.sqrt(a));

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
