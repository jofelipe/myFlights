import useSWR from 'swr';
import client from 'graphql/client';

import { GetStaticProps } from 'next';
import { GET_FLIGHTS_COMPANIES } from 'graphql/queries';
import { Company, GetFlightsCompaniesQuery } from 'graphql/generated/graphql';

import Content from 'components/Content';

import CompanyTemplate from 'templates/Company';

interface CompanyProps {
  data?: Company;
}

export default function CompanyMoreFlights({
  flights
}: GetFlightsCompaniesQuery) {
  const allCompanies: number[] = [];

  flights.forEach((flight) => {
    allCompanies.push(flight.company?.unique || 0);
  });

  let flightsNumber = 1;
  let m = 0;
  let companyUnique;

  for (let i = 0; i < allCompanies.length; i++) {
    for (let j = i; j < allCompanies.length; j++) {
      if (allCompanies[i] == allCompanies[j]) m++;
      if (flightsNumber < m) {
        flightsNumber = m;
        companyUnique = allCompanies[i];
      }
    }
    m = 0;
  }

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data }: CompanyProps = useSWR(
    '/api/company?' +
      new URLSearchParams({
        unique: String(companyUnique)
      }),
    fetcher
  );

  return (
    <Content title="Companhia com mais voos">
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
