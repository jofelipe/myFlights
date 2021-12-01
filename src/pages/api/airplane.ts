import { NextApiRequest, NextApiResponse } from 'next';

import { GetAirplaneByUniqueQuery } from 'graphql/generated/graphql';
import { GET_AIRPLANE_BY_UNIQUE } from 'graphql/queries';

import client from 'graphql/client';

const fetchCompanyByUnique = async (unique: number) => {
  const { airplane } = await client.request<GetAirplaneByUniqueQuery>(
    GET_AIRPLANE_BY_UNIQUE,
    {
      unique
    }
  );

  return airplane;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { unique } = req.query;
  const response = await fetchCompanyByUnique(Number(unique));

  return res.status(200).json(response);
};
