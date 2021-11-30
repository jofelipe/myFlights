import { NextApiRequest, NextApiResponse } from 'next';

import { GetAirportByUniqueQuery } from 'graphql/generated/graphql';
import { GET_AIRPORT_BY_UNIQUE } from 'graphql/queries';

import client from 'graphql/client';

const fetchAirportByUnique = async (unique: number) => {
  const { airport } = await client.request<GetAirportByUniqueQuery>(
    GET_AIRPORT_BY_UNIQUE,
    {
      unique
    }
  );

  return airport;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { unique } = req.query;
  const response = await fetchAirportByUnique(Number(unique));

  return res.status(200).json(response);
};
