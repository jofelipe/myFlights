import styled, { css } from 'styled-components';

type WrapperProps = {
  size?: number;
};

export const Wrapper = styled.div<WrapperProps>`
  position: relative;

  ${(props) =>
    props.size
      ? css`
          width: ${props.size}px;
          height: ${props.size}px;
        `
      : css`
          width: 16px;
          height: 16px;
        `}

  transform: translate(-50%, -100%);
`;
