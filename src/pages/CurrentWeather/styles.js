import styled from 'styled-components/native';
import theme from '../../assets/theme';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${theme.mainColor};
  padding: 25px;
  /* margin-top: auto; */
  /* border-top-right-radius: 35px; */
  /* border-top-left-radius: 35px; */
`;

export const DateLabel = styled.Text`
  color: ${theme.accentTextColor};
  font-size: 24px;
  /* align-self: center; */
`;

export const InfoLabel = styled.Text`
  color: ${theme.accentTextColor};
  font-size: 18px;
`;

export const TempIconContainer = styled.View`
  flex-direction: row;
`;

export const Image = styled.Image`
  height: 110px;
  width: 110px;
`;

export const TemperatureLabel = styled.Text`
  color: ${theme.accentTextColor};
  font-size: 90px;
`;

export const Divider = styled.View`
  height: 2px;
  margin-top: 25px;
  background-color: ${theme.dividerColor};
`;

export const FlatListTitle = styled.Text`
  margin-top: 25px;
  font-size: 22px;
  color: ${theme.accentTextColor};
`;
export const Flatlist = styled.FlatList`
  margin-top: 10px;
`;

export const ForecastItem = styled.View`
  border-radius: 10px;
  padding: 12px;
  background-color: #0003;
  margin-right: 10px;
  margin-bottom: 10px;
`;

export const ForecastRowContainer = styled.View`
  flex-direction: row;
`;

export const ForecastIcon = styled.Image`
  height: 60px;
  width: 60px;
`;

export const ForecastLargTextLabel = styled.Text`
  color: ${theme.accentTextColor};
  font-size: 22px;
`;
