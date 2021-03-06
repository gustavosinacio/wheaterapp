import React, { useState, useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { useEffect } from 'react';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HourItem from './HourItem';
import DayItem from './DayItem';
import LineChart from '../../components/LineChart';
import MySafeAreaView from '../../components/MySafeAreaView';
import ForecastFlatList from '../../components/ForecastFlatList';
import api from '../../services/api';
import theme from '../../assets/theme';

import {
  LargeText,
  MediumText,
  SmallText,
} from '../../components/GeneralComponents';

import {
  Container,
  PaddedContainer,
  TitleContainer,
  UpdatedAtTouchable,
  TempIconContainer,
  Image,
  Divider,
  TemperatureLabel,
  FlatListTitle,
  DateText,
} from './styles';

const CurrentWeather = () => {
  const navigation = useNavigation();
  const [loadingWeather, setLoadingWeather] = useState(true);
  const [locationInfo, setLocationInfo] = useState({});
  const [forecastInfo, setForecastInfo] = useState({
    hourly: [],
    minutely: [],
    daily: [],
  });
  const [locationTimestamp, setLocationTimestamp] = useState(new Date());
  const [weatherInfo, setWeatherInfo] = useState({
    main: {},
    weather: {},
    wind: {},
    sys: {},
  });

  const requestWeatherData = useCallback(async () => {
    setLoadingWeather(true);
    try {
      const { latitude, longitude } = locationInfo;
      const mock = { latitude: -15.65, longitude: -47.79 };

      const weatherResponse = await api.get('weather', {
        params: {
          lat: latitude || mock.latitude,
          lon: longitude || mock.longitude,
        },
      });

      setWeatherInfo(weatherResponse.data);

      const forecastResponse = await api.get('onecall', {
        params: {
          lat: latitude || mock.latitude,
          lon: longitude || mock.longitude,
        },
      });

      setForecastInfo(forecastResponse.data);
    } catch (err) {
      console.log(err.response);
    } finally {
      setLoadingWeather(false);
    }
  }, [locationInfo]);

  const onDayPress = useCallback(
    (day) => {
      navigation.navigate('ForecastedDay', { day });
    },
    [navigation],
  );

  useEffect(() => {
    setLoadingWeather(true);

    Geolocation.getCurrentPosition((info) => {
      setLocationTimestamp(new Date(info.timestamp));
      setLocationInfo(info.coords);
    });
  }, []);

  useEffect(() => {
    requestWeatherData();
  }, [requestWeatherData]);

  const forecastTimeLabels = useMemo(() => {
    let labels = [];
    forecastInfo.hourly.forEach((hour, index) => {
      const date = new Date(hour.dt * 1000);
      const formatedDate = format(date, "HH'h'", {
        locale: pt,
      });

      if (index % 5 === 0) {
        labels.push(formatedDate);
      }
    });
    return labels;
  }, [forecastInfo.hourly]);

  const forecastTempInfo = useMemo(() => {
    let temps = [];
    forecastInfo.hourly.forEach((hour, index) => {
      if (index % 5 === 0) {
        temps.push(Math.round(hour.temp));
      }
    });
    return temps;
  }, [forecastInfo.hourly]);

  const precipitationTimeLabels = useMemo(() => {
    let labels = [];
    forecastInfo.minutely.forEach((minute) => {
      const date = new Date(minute.dt * 1000);
      const formatedTime = format(date, 'HH:mm');

      if (date.getMinutes() % 10 === 0) {
        labels.push(formatedTime);
      }
    });
    return labels;
  }, [forecastInfo.minutely]);

  const precipitations = useMemo(() => {
    let precipitationValues = [];
    forecastInfo.minutely.forEach((minute) => {
      const date = new Date(minute.dt * 1000);

      if (date.getMinutes() % 10 === 0) {
        precipitationValues.push(minute.precipitation);
      }
    });
    return precipitationValues;
  }, [forecastInfo.minutely]);

  return (
    <MySafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={loadingWeather}
            onRefresh={requestWeatherData}
          />
        }>
        <Container>
          {!loadingWeather && (
            <>
              <PaddedContainer>
                <TitleContainer>
                  <DateText>
                    {format(locationTimestamp, 'EEEEE', {
                      locale: pt,
                    }).toUpperCase()}
                    {format(locationTimestamp, "EEE, d 'de' MMMM", {
                      locale: pt,
                    }).substring(1)}
                  </DateText>
                  <UpdatedAtTouchable onPress={requestWeatherData}>
                    <Icon name="update" size={25} color={theme.iconColor} />
                  </UpdatedAtTouchable>
                </TitleContainer>

                <LargeText>{weatherInfo.name}</LargeText>
                <SmallText>
                  Lat: {locationInfo.latitude}, Long: {locationInfo.longitude}
                </SmallText>
                <SmallText>
                  Atualizado em:{' '}
                  {format(locationTimestamp, 'HH:mm', {
                    locale: pt,
                  })}
                </SmallText>
                <TempIconContainer>
                  <Image
                    source={{
                      uri:
                        weatherInfo.weather[0] &&
                        `https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@4x.png`,
                    }}
                  />
                  <TemperatureLabel>
                    {Math.round(weatherInfo.main.temp || 0)}&deg;C
                  </TemperatureLabel>
                </TempIconContainer>
                <MediumText>
                  Sensação térmica: {Math.round(weatherInfo.main.feels_like)}
                  &deg;C
                </MediumText>
                <MediumText>
                  Max {Math.round(weatherInfo.main.temp_max)}&deg;C, min{' '}
                  {Math.round(weatherInfo.main.temp_min)}&deg;C
                </MediumText>
                <MediumText>Ventos {weatherInfo.wind.speed} km/h</MediumText>
                <MediumText>Umidade {weatherInfo.main.humidity}%</MediumText>
                <MediumText>
                  Sol{' '}
                  {format(new Date(weatherInfo.sys.sunrise * 1000), 'HH:mm', {
                    locale: pt,
                  })}
                  {' - '}
                  {format(new Date(weatherInfo.sys.sunset * 1000), 'HH:mm', {
                    locale: pt,
                  })}
                </MediumText>
              </PaddedContainer>

              <Divider />
              <PaddedContainer>
                <FlatListTitle>Precipitação:</FlatListTitle>
              </PaddedContainer>
              <LineChart
                x={precipitationTimeLabels}
                y={precipitations}
                yAxisSuffix=" mm/h"
              />

              <Divider />

              <PaddedContainer>
                <FlatListTitle>Previsão (48h):</FlatListTitle>
              </PaddedContainer>
              <LineChart
                x={forecastTimeLabels}
                y={forecastTempInfo}
                yAxisSuffix="&deg;C"
                yDecimalPlaces={0}
              />

              <ForecastFlatList
                data={forecastInfo.hourly}
                renderItem={({ item: hour, index }) => {
                  return <HourItem hour={hour} index={index} />;
                }}
              />

              <Divider />
              <PaddedContainer>
                <FlatListTitle>Previsão (7 dias):</FlatListTitle>
              </PaddedContainer>
              <ForecastFlatList
                data={forecastInfo.daily}
                renderItem={({ item: day, index }) => {
                  return (
                    <TouchableOpacity onPress={() => onDayPress(day)}>
                      <DayItem day={day} index={index} />
                    </TouchableOpacity>
                  );
                }}
              />
            </>
          )}
        </Container>
      </ScrollView>
    </MySafeAreaView>
  );
};

export default CurrentWeather;
