import client from 'graphql/client';
import calcDistance from 'utils/calcDistance';

import { GetStaticProps } from 'next';
import { GetFlightsQuery } from 'graphql/generated/graphql';
import { GET_FLIGHTS } from 'graphql/queries';
import { useEffect } from 'react';
import { useRedirect } from 'hooks/redirect';

import Content from 'components/Content';
import Country from 'components/Country';

import { MdFlight, MdFlag } from 'react-icons/md';

import * as S from 'styles/flight-distance';

export default function LongestFlight({ flights }: GetFlightsQuery) {
  const { redirect } = useRedirect();

  const { departureAirport, arrivalAirport, airplane, company, duration } =
    flights.reduce((prev, current) =>
      prev.duration > current.duration ? prev : current
    );

  useEffect(() => {
    redirect();
  }, [redirect]);

  if (
    !departureAirport ||
    !arrivalAirport ||
    !airplane ||
    !company ||
    !company.country
  ) {
    return;
  }

  const distance = calcDistance(
    departureAirport.location.latitude,
    departureAirport.location.longitude,
    arrivalAirport.location.latitude,
    arrivalAirport.location.longitude
  );

  return (
    <Content title="Voo mais demorado">
      <S.Stats>
        <div className="airport">
          <span>
            <Country code={departureAirport.country} size={36} />
            <Country code={departureAirport.country} text />
          </span>
          <strong>{departureAirport.code}</strong>
          <p>{departureAirport.name}</p>
        </div>
        <div className="line">
          <span>-</span>
        </div>
        <div className="duration">
          <strong>{duration}</strong>
          <p>Horas</p>
          <span>
            {distance.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}km
          </span>
        </div>
        <div className="line">
          <span>-</span>
        </div>
        <div className="airport">
          <span>
            <Country code={arrivalAirport.country} size={36} />
            <Country code={arrivalAirport.country} text />
          </span>
          <strong>{arrivalAirport.code}</strong>
          <p>{arrivalAirport.name}</p>
        </div>
      </S.Stats>

      <S.Info>
        <div className="item">
          <MdFlight size={96} />
          <div>
            <strong>{airplane.manufacturer?.name}</strong>
            <span>{airplane.name}</span>
          </div>
        </div>
        <div className="item">
          <MdFlag size={96} />
          <div>
            <strong>
              {company.code} <Country code={company.country} size={24} />
            </strong>
            <span className="small">{company.name}</span>
          </div>
        </div>
      </S.Info>
    </Content>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { flights } = await client.request<GetFlightsQuery>(GET_FLIGHTS);

  if (!flights) {
    return { notFound: true };
  }

  return {
    props: {
      flights
    }
  };
};
