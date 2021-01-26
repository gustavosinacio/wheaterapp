import React, { useState, useCallback } from 'react';
// import {  } from 'react-native';
import { useEffect } from 'react';
import { addDays, addHours, format } from 'date-fns';
import { pt } from 'date-fns/locale';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import api from '../../services/api';
import MySafeAreaView from '../../components/MySafeAreaView';
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
  Flatlist,
  ForecastItem,
  RowContainer,
  ForecastIcon,
  DateText,
  LargeText,
  MediumText,
  SmallText,
  MaxTempForecast,
  MinTempForecast,
} from './styles';
import { ScrollView } from 'react-native-gesture-handler';
import theme from '../../assets/theme';
import { RefreshControl } from 'react-native';

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

  useEffect(() => {
    console.log(2231, locationTimestamp);
  }, [locationTimestamp]);
  useEffect(() => {
    console.log(2232, locationInfo);
  }, [locationInfo]);
  useEffect(() => {
    console.log(2233, weatherInfo);
  }, [weatherInfo]);
  useEffect(() => {
    console.log(2234, forecastInfo);
  }, [forecastInfo]);

  return (
    <MySafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={loadingWeather}
            onRefresh={requestWeatherData}
            tintColor={theme.iconColor}
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
              <Flatlist
                horizontal
                showsHorizontalScrollIndicator={false}
                data={forecastInfo.hourly}
                keyExtractor={(hour) => `${hour.dt}`}
                renderItem={({ item: hour, index }) => {
                  const formatedDate = format(
                    addHours(new Date(), index),
                    "HH':00'",
                    {
                      locale: pt,
                    },
                  );

                  const description = `${hour.weather[0].description
                    .substring(0, 1)
                    .toUpperCase()}${hour.weather[0].description.substring(1)}`;

                  return (
                    index > 0 && (
                      <ForecastItem>
                        <MediumText>{formatedDate}</MediumText>
                        <RowContainer>
                          <ForecastIcon
                            source={{
                              uri:
                                weatherInfo.weather[0] &&
                                `https://openweathermap.org/img/wn/${hour.weather[0].icon}@4x.png`,
                            }}
                          />
                        </RowContainer>
                        <MediumText>{Math.round(hour.temp)}&deg;C</MediumText>
                        <SmallText>{description}</SmallText>
                      </ForecastItem>
                    )
                  );
                }}
              />

              <Divider />
              <PaddedContainer>
                <FlatListTitle>Próximos dias:</FlatListTitle>
              </PaddedContainer>
              <Flatlist
                horizontal
                showsHorizontalScrollIndicator={false}
                data={forecastInfo.daily}
                keyExtractor={(day) => `${day.dt}`}
                renderItem={({ item: day, index }) => {
                  const date = addDays(new Date(), index);
                  const weekDay = `${format(date, 'EEEEE', {
                    locale: pt,
                  }).toUpperCase()}${format(date, 'EEE', {
                    locale: pt,
                  }).substring(1)}`;
                  const description = `${day.weather[0].description
                    .substring(0, 1)
                    .toUpperCase()}${day.weather[0].description.substring(1)}`;

                  return (
                    index > 0 && (
                      <ForecastItem>
                        <LargeText>{weekDay}</LargeText>
                        <RowContainer>
                          <ForecastIcon
                            source={{
                              uri:
                                weatherInfo.weather[0] &&
                                `https://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png`,
                            }}
                          />
                          <MaxTempForecast>
                            {Math.round(day.temp.max)}&deg;
                          </MaxTempForecast>
                          <MinTempForecast>
                            {Math.round(day.temp.min)}&deg;
                          </MinTempForecast>
                        </RowContainer>

                        <SmallText>{description}</SmallText>
                        <SmallText>Umidade: {day.humidity}%</SmallText>
                        <SmallText>Ventos: {day.wind_speed} km/h</SmallText>
                        <SmallText>
                          Direção dos ventos: {day.wind_deg}&deg;
                        </SmallText>
                        <SmallText>UV: {day.uvi}</SmallText>
                      </ForecastItem>
                    )
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
