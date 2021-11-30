import * as S from './styles';

type ContentProps = {
  title: string;
};

const Content: React.FC<ContentProps> = ({ title, children }) => {
  return (
    <S.Wrapper>
      <div>
        <h1>{title}</h1>
        {children}
      </div>
    </S.Wrapper>
  );
};

export default Content;
