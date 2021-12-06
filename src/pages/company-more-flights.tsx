import useSWR from 'swr';
import client from 'graphql/client';
import calcMore from 'utils/calcMore';

import { GetStaticProps } from 'next';
import { Company, GetFlightsCompaniesQuery } from 'graphql/generated/graphql';
import { GET_FLIGHTS_COMPANIES } from 'graphql/queries';
import { fetcher } from 'utils/swr';
import { useEffect } from 'react';
import { useRedirect } from 'hooks/redirect';

import Content from 'components/Content';

import CompanyTemplate from 'templates/Company';

interface CompanyProps {
  data?: Company;
}

export default function CompanyMoreFlights({
  flights
}: GetFlightsCompaniesQuery) {
  const { redirect } = useRedirect();

  const allCompanies: number[] = [];

  flights.forEach((flight) => {
    allCompanies.push(flight.company?.unique || 0);
  });

  const { flightsNumber, unique } = calcMore(allCompanies);

  const { data }: CompanyProps = useSWR(
    '/api/company?' +
      new URLSearchParams({
        unique
      }),
    fetcher
  );

  useEffect(() => {
    redirect();
  }, [redirect]);

  return (
    <Content title="Companhia com mais voos">
      {!data ? (
        <p>Carregando...</p>
      ) : (
        <CompanyTemplate
          companyUnique={unique}
          data={data}
          flightsNumber={flightsNumber}
        />
      )}
    </Content>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { flights } = await client.request<GetFlightsCompaniesQuery>(
    GET_FLIGHTS_COMPANIES
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
