import styled from 'styled-components';

export const NumberInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 1280px;

  & > div {
    flex: 1 0 50%;
    width: 50%;
  }

  strong {
    color: var(--primary);
    display: block;
    font-size: 24rem;
    line-height: 24rem;
    font-weight: 900;

    &.small {
      font-size: 14rem;
      line-height: 14rem;
    }
  }

  span {
    font-size: 4.8rem;
  }
`;
