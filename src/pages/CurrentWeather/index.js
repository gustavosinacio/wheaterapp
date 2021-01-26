import React, { useState, useCallback } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { useEffect } from 'react';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import api from '../../services/api';
import theme from '../../assets/theme';
import HourItem from './HourItem';
import DayItem from './DayItem';
import MySafeAreaView from '../../components/MySafeAreaView';
import ForecastFlatList from '../../components/ForecastFlatList';
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
  LargeText,
  MediumText,
  SmallText,
} from './styles';

const CurrentWeather = () => {
  const [loadingWeather, setLoadingWeather] = useState(true);
  const [locationInfo, setLocationInfo] = useState({});
  const [forecastInfo, setForecastInfo] = useState({ hourly: [] });
  const [locationTimestamp, setLocationTimestamp] = useState(new Date());
  const [weatherInfo, setWeatherInfo] = useState({
    main: {},
    weather: {},
    wind: {},
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

  useEffect(() => {
    setLoadingWeather(true);

    Geolocation.getCurrentPosition((info) => {
      console.log(2230, info);
      setLocationTimestamp(new Date(info.timestamp));
      setLocationInfo(info.coords);
    });
  }, []);

  useEffect(() => {
    requestWeatherData();
  }, [requestWeatherData]);

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
                <MediumText>Ventos: {weatherInfo.wind.speed} km/h</MediumText>
                <MediumText>Umidade: {weatherInfo.main.humidity}%</MediumText>
              </PaddedContainer>

              <Divider />
              <PaddedContainer>
                <FlatListTitle>Hora em hora:</FlatListTitle>
              </PaddedContainer>
              <ForecastFlatList
                data={forecastInfo.hourly}
                renderItem={({ item: hour, index }) => {
                  return <HourItem hour={hour} index={index} />;
                }}
              />

              <Divider />
              <PaddedContainer>
                <FlatListTitle>Próximos dias:</FlatListTitle>
              </PaddedContainer>
              <ForecastFlatList
                data={forecastInfo.daily}
                renderItem={({ item: day, index }) => {
                  return <DayItem day={day} index={index} />;
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
