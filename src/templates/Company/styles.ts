import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const Company = styled.div`
  display: flex;

  .flights {
    strong {
      color: var(--primary);
      display: block;
      font-size: 24rem;
      font-weight: 900;
    }

    span {
      display: block;
      font-size: 4.8rem;
    }
  }

  .company {
    margin-left: 128px;

    .logo {
      width: 320px;
      margin: 0 auto 48px;
    }

    span {
      font-size: 2.4rem;

      img {
        margin-right: 16px;
      }
    }

    strong {
      color: var(--primary);
      display: block;
      font-size: 7.2rem;
      font-weight: 900;
    }

    p {
      font-size: 2.4rem;
      max-width: 240px;
      margin: 0 auto;
      width: 100%;
    }
  }
`;
