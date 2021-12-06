import ReactCountryFlag from 'react-country-flag';
import countries from 'i18n-iso-countries';
import pt from 'i18n-iso-countries/langs/pt.json';

import { useEffect, useState } from 'react';

type FlagProps = {
  code: string;
  size?: number;
  text?: boolean;
};

const Flag: React.FC<FlagProps> = ({ code, size, text }) => {
  const [countryName, setCountryName] = useState('');

  useEffect(() => {
    countries.registerLocale(pt);
    setCountryName(countries.getName(code, 'pt'));
  }, [countryName, code]);

  return (
    <>
      {text ? (
        <>{countryName}</>
      ) : (
        <ReactCountryFlag
          countryCode={code}
          style={{
            fontSize: size ? size + 'px' : '24px'
          }}
          aria-label={countryName}
          title={countryName}
          svg
        />
      )}
    </>
  );
};

export default Flag;
