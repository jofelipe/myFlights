import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const Airplane = styled.div`
  display: flex;
`;

export const Image = styled.div`
  width: 700px;
  height: 440px;
`;

export const Info = styled.div`
  margin-left: 64px;

  .flights {
    margin-bottom: 48px;

    strong {
      color: var(--primary);
      display: block;
      font-size: 24rem;
      line-height: 24rem;
      font-weight: 900;
    }

    span {
      display: block;
      font-size: 4.8rem;
    }
  }

  .airplane {
    span {
      font-size: 2.4rem;
    }

    strong {
      color: var(--primary);
      display: block;
      font-size: 7.2rem;
      font-weight: 900;
    }

    p {
      font-size: 1.8rem;
    }
  }
`;
