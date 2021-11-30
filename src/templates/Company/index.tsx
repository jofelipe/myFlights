import Image from 'next/image';

import { Company } from 'graphql/generated/graphql';

import Country from 'components/Country';

import * as S from './styles';

type CompanyProps = {
  data: Company;
  flightsNumber: number;
  companyUnique: string | number;
};

const CompanyTemplate: React.FC<CompanyProps> = ({
  flightsNumber,
  companyUnique,
  data
}) => {
  return (
    <S.Wrapper>
      <S.Company>
        <div className="flights">
          <strong>{flightsNumber}</strong>
          <span>Voo(s)</span>
        </div>
        <div className="company">
          <div className="logo">
            <Image
              src={`/img/companies/${companyUnique}.png`}
              width={320}
              height={160}
              layout="fixed"
              quality={90}
            />
          </div>

          <span>
            <Country code={data.country} size={36} />
            <Country code={data.country} text />
          </span>
          <strong>{data.code}</strong>
          <p>{data.name}</p>
        </div>
      </S.Company>
    </S.Wrapper>
  );
};

export default CompanyTemplate;
