import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import theme from '../../assets/theme';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${theme.mainColor};
  margin-top: 25px;
`;

export const ActivityIndicator = styled.ActivityIndicator`
  align-self: center;
`;

export const PaddedContainer = styled.View`
  padding-left: 25px;
  padding-right: 0px;
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-right: 25px;
`;

export const UpdatedAtTouchable = styled(TouchableOpacity)`
  align-items: center;
  justify-content: center;
  background-color: #0003;
  padding: 10px;
  border-radius: 10px;
`;

export const TempIconContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Image = styled.Image`
  height: 150px;
  width: 150px;
`;

export const TemperatureLabel = styled.Text`
  color: ${theme.textColor};
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
  color: ${theme.textColor};
`;

export const ForecastItem = styled.View`
  border-radius: 10px;
  padding: 10px;
  background-color: #0003;
  margin-left: 10px;
  margin-bottom: 10px;
`;

export const ForecastIcon = styled.Image`
  height: 60px;
  width: 60px;
`;

export const DateText = styled.Text`
  color: ${theme.textColor};
  font-size: 32px;
`;

export const MaxTempForecast = styled.Text`
  font-size: 22px;
  color: ${theme.textColor};
`;
export const MinTempForecast = styled.Text`
  padding-top: 10px;
  font-size: 22px;
  color: ${theme.lightTextColor};
`;
