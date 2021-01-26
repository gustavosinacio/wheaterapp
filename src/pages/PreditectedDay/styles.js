import styled from 'styled-components/native';
import theme from '../../assets/theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.backgroundColor};
  padding: 25px;
  padding-top: 40px;
  align-items: center;
`;

export const CenteredContainer = styled.View`
  margin-bottom: 50px;
  align-items: center;
`;

export const DateText = styled.Text`
  color: ${theme.textColor};
  font-size: 44px;
  text-align-vertical: bottom;
`;

export const Image = styled.Image`
  height: 180px;
  width: 180px;
`;

export const DayNightIcon = styled.Image`
  height: 60px;
  width: 60px;
`;

export const DayNightContainer = styled.View`
  padding: 10px;
  align-items: center;
`;

export const Divider = styled.View`
  background-color: ${theme.dividerColor};
  width: 2px;
  margin-top: 10px;
  margin-bottom: 10px;
`;
