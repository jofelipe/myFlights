import styled from 'styled-components';

export const Stats = styled.div`
  display: flex;
  text-align: center;
  margin-bottom: 128px;

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

  .line {
    display: flex;
    align-items: center;

    span {
      background: var(--text);
      display: block;
      width: 240px;
      height: 8px;
      text-indent: --9999px;
    }
  }

  .duration {
    padding: 0 32px;

    strong {
      font-size: 7.2rem;
      font-weight: 700;
    }

    p {
      font-size: 3.6rem;
      margin-bottom: 16px;
    }

    span {
      color: var(--primary);
      font-size: 2.4rem;
    }
  }
`;

export const Info = styled.div`
  display: flex;
  justify-content: center;
  text-align: left;

  .item {
    display: flex;
    align-items: center;
    font-size: 3.6rem;

    svg {
      margin-right: 16px;
    }

    strong {
      display: flex;
      align-items: center;
      font-weight: 700;
      text-transform: uppercase;

      img {
        margin-left: 8px;
      }
    }

    span {
      .small {
        font-size: 2.4rem;
      }
    }

    &:last-child {
      margin-left: 128px;
    }
  }
`;
