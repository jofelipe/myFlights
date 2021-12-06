import client from 'graphql/client';

import { GetStaticProps } from 'next';
import { GetFlightsDurationQuery } from 'graphql/generated/graphql';
import { GET_FLIGHTS_DURATION } from 'graphql/queries';
import { useEffect } from 'react';
import { useRedirect } from 'hooks/redirect';

import Content from 'components/Content';

import * as S from 'styles/numbers';

export default function Time({ flights }: GetFlightsDurationQuery) {
  const { redirect } = useRedirect();

  const durations = flights.map((flight) => flight.duration);

  const toSeconds = (str: string) => {
    const duration = str.split(':');
    return +duration[0] * 60 + +duration[1];
  };

  const toHours = (seconds: number) => {
    const minutes = parseInt(String(seconds / 60));
    seconds = seconds - minutes * 60;
    return minutes + ':' + seconds;
  };

  const totalDuration = durations.reduce((r, elem) => r + toSeconds(elem), 0);

  const totalTime = toHours(totalDuration);

  const totalDays = parseInt(toHours(totalDuration)) / 24;

  useEffect(() => {
    redirect();
  }, [redirect]);

  return (
    <Content title="Tempo total">
      <S.NumberInfo>
        <div>
          <strong className="small">{totalTime}</strong>
          <span>Horas</span>
        </div>

        <div>
          <strong className="small">{totalDays.toLocaleString('pt-BR')}</strong>
          <span>Dias</span>
        </div>
      </S.NumberInfo>
    </Content>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { flights } = await client.request<GetFlightsDurationQuery>(
    GET_FLIGHTS_DURATION
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
