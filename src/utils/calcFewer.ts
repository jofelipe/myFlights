import { ObjectWithNumbers } from 'types';

const calcFewer = (array: number[]) => {
  const reduced: ObjectWithNumbers = array.reduce(
    (acc: ObjectWithNumbers, val) => ({ ...acc, [val]: (acc[val] || 0) + 1 }),
    {}
  );
  const flightsNumber = Math.min(...Object.values(reduced));
  const unique = Object.keys(reduced).find(
    (el) => reduced[el] === flightsNumber
  );

  return {
    flightsNumber,
    unique: String(unique)
  };
};

export default calcFewer;
