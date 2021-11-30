import { colors } from 'constants/colors';

import * as S from './styles';

type MarkerProps = {
  title: string;
  lat: number;
  lng: number;
  size?: number;
};

const Marker = ({ title, size }: MarkerProps) => {
  return (
    <S.Wrapper title={title} size={size}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58 58">
        <line
          x1="29"
          y1="28"
          x2="29"
          y2="57"
          stroke={colors.primary}
          strokeWidth={2}
        />
        <circle cx="29" cy="14" r="14" fill={colors.primary} />
        <circle cx="24" cy="10" r="3" fill="#fff" />
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
      </svg>
    </S.Wrapper>
  );
};

export default Marker;
