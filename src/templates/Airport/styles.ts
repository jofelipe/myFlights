import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: -48px;
`;

export const Map = styled.div`
  width: 700px;
  height: 440px;

  .gm-style iframe + div {
    border: 0 !important;
  }

  .gmnoprint,
  .gm-style-cc {
    display: none;
  }

  a[href^='https://maps.google.com/maps?ll=']
  {
    display: none !important;
  }
`;

export const Airport = styled.div`
  margin-left: 64px;

  .flights {
    strong {
      color: var(--primary);
      display: block;
      font-size: 14rem;
      line-height: 14rem;
      font-weight: 900;
    }

    span {
      display: block;
      font-size: 4.8rem;
      margin-bottom: 48px;
    }
  }

  .airport {
    max-width: 240px;

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
    }
  }
`;
