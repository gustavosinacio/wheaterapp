import styled from 'styled-components/native';
import theme from '../assets/theme';

export const LargeText = styled.Text`
  color: ${theme.textColor};
  font-size: 28px;
  text-align-vertical: bottom;
`;

export const MediumText = styled.Text`
  color: ${theme.textColor};
  font-size: 22px;
  text-align-vertical: bottom;
`;

export const SmallText = styled.Text`
  color: ${theme.textColor};
  font-size: 18px;
  text-align-vertical: bottom;
`;

export const RowContainer = styled.View`
  flex-direction: row;
`;
