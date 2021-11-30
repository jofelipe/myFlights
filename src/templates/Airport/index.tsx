import { Airport } from 'graphql/generated/graphql';

import Country from 'components/Country';
import MapView from 'components/Map';

import * as S from './styles';

type AirportProps = {
  data: Airport;
  flightsNumber: number;
};

const AirportTemplate: React.FC<AirportProps> = ({ data, flightsNumber }) => {
  return (
    <S.Wrapper>
      <S.Map>
        <MapView
          name={data.name}
          lat={data.location.latitude}
          lng={data.location.longitude}
          zoom={10}
        />
      </S.Map>
      <S.Airport>
        <div className="flights">
          <strong>{flightsNumber}</strong>
          <span>Voo(s)</span>
        </div>
        <div className="airport">
          <span>
            <Country code={data.country} size={36} />
            <Country code={data.country} text />
          </span>
          <strong>{data.code}</strong>
          <p>{data.name}</p>
        </div>
      </S.Airport>
    </S.Wrapper>
  );
};

export default AirportTemplate;
