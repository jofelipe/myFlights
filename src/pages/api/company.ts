import { NextApiRequest, NextApiResponse } from 'next';

import { GetCompanyByUniqueQuery } from 'graphql/generated/graphql';
import { GET_COMPANY_BY_UNIQUE } from 'graphql/queries';

import client from 'graphql/client';

const fetchCompanyByUnique = async (unique: number) => {
  const { company } = await client.request<GetCompanyByUniqueQuery>(
    GET_COMPANY_BY_UNIQUE,
    {
      unique
    }
  );

  return company;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { unique } = req.query;
  const response = await fetchCompanyByUnique(Number(unique));

  return res.status(200).json(response);
};
