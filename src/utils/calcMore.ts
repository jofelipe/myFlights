const calcMore = (array: number[]) => {
  let flightsNumber = 1;
  let m = 0;
  let unique;

  for (let i = 0; i < array.length; i++) {
    for (let j = i; j < array.length; j++) {
      if (array[i] == array[j]) m++;
      if (flightsNumber < m) {
        flightsNumber = m;
        unique = array[i];
      }
    }
    m = 0;
  }

  return {
    flightsNumber,
    unique: String(unique)
  };
};

export default calcMore;
