import Image from 'next/image';

import { Airplane } from 'graphql/generated/graphql';

import * as S from './styles';

type AirplaneProps = {
  data: Airplane;
  flightsNumber: number;
  airplaneUnique: string | number;
};

const AirplaneTemplate: React.FC<AirplaneProps> = ({
  flightsNumber,
  airplaneUnique,
  data
}) => {
  return (
    <S.Wrapper>
      <S.Airplane>
        <S.Image>
          <Image
            src={`/img/airplanes/${airplaneUnique}.jpg`}
            width={700}
            height={440}
            layout="fixed"
            quality={90}
          />
        </S.Image>
        <S.Info>
          <div className="flights">
            <strong>{flightsNumber}</strong>
            <span>Voo(s)</span>
          </div>
          <div className="airplane">
            <span>{data.manufacturer?.name}</span>
            <strong>{data.name}</strong>
          </div>
        </S.Info>
      </S.Airplane>
    </S.Wrapper>
  );
};

export default AirplaneTemplate;
