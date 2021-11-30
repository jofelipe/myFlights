import styled from 'styled-components';

export const Map = styled.div`
  width: 100%;
  height: 100vh;

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
