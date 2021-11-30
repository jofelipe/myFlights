import useSWR from 'swr';
import client from 'graphql/client';

import { GetStaticProps } from 'next';
import { GET_FLIGHTS_COMPANIES } from 'graphql/queries';
import { Company, GetFlightsCompaniesQuery } from 'graphql/generated/graphql';
import { ObjectWithNumbers } from 'types';

import Content from 'components/Content';

import CompanyTemplate from 'templates/Company';

interface CompanyProps {
  data?: Company;
}

export default function CompanyFewerFlights({
  flights
}: GetFlightsCompaniesQuery) {
  const allCompanies: number[] = [];

  flights.forEach((flight) => {
    allCompanies.push(flight.company?.unique || 0);
  });

  const reduced: ObjectWithNumbers = allCompanies.reduce(
    (acc: ObjectWithNumbers, val) => ({ ...acc, [val]: (acc[val] || 0) + 1 }),
    {}
  );
  const flightsNumber = Math.min(...Object.values(reduced));
  const companyUnique = Object.keys(reduced).find(
    (el) => reduced[el] === flightsNumber
  );

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data }: CompanyProps = useSWR(
    '/api/company?' +
      new URLSearchParams({
        unique: String(companyUnique)
      }),
    fetcher
  );

  return (
    <Content title="Companhia com menos voos">
      {!data ? (
        <p>Carregando...</p>
      ) : (
        <CompanyTemplate
          companyUnique={companyUnique || 0}
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
