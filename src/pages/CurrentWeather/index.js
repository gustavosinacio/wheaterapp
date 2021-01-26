import React, { useState } from 'react';
import { ActivityIndicator, Text } from 'react-native';
import { useEffect } from 'react';
import Geolocation from 'react-native-geolocation-service';
import { addDays, addHours, format } from 'date-fns';
import { pt } from 'date-fns/locale';

import api from '../../services/api';
import MySafeAreaView from '../../components/MySafeAreaView';
import {
  Container,
  DateLabel,
  InfoLabel,
  TempIconContainer,
  Image,
  Divider,
  TemperatureLabel,
  FlatListTitle,
  Flatlist,
  ForecastItem,
  ForecastRowContainer,
  ForecastIcon,
  ForecastLargTextLabel,
} from './styles';
import { ScrollView } from 'react-native-gesture-handler';

const CurrentWeather = () => {
  const [loadingWeather, setLoadingWeather] = useState(true);
  const [locationInfo, setLocationInfo] = useState({});
  const [forecastInfo, setForecastInfo] = useState({});
  const [locationTimestamp, setLocationTimestamp] = useState(new Date());
  const [weatherInfo, setWeatherInfo] = useState({
    main: {},
    weather: {},
    wind: {},
  });

  useEffect(() => {
    setLoadingWeather(true);
    Geolocation.getCurrentPosition((info) => {
      setLocationTimestamp(new Date(info.timestamp));
      setLocationInfo(info.coords);
    });
  }, []);

  useEffect(() => {
    async function getWeather() {
      try {
        const { latitude, longitude } = locationInfo;

        if (latitude && longitude) {
          const weatherResponse = await api.get('weather', {
            params: {
              lat: latitude,
              lon: longitude,
            },
          });

          setWeatherInfo(weatherResponse.data);
        }

        const forecastResponse = await api.get('onecall', {
          params: {
            lat: latitude,
            lon: longitude,
          },
        });

        setForecastInfo(forecastResponse.data);
      } catch (err) {
        console.log(err.response);
      } finally {
        setLoadingWeather(false);
      }
    }

    getWeather();
  }, [locationInfo]);

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
      <ScrollView>
        <Container>
          {loadingWeather ? (
            <ActivityIndicator size="large" color={'#fff'} />
          ) : (
            <>
              <DateLabel>
                {format(locationTimestamp, 'EEEEE', {
                  locale: pt,
                }).toUpperCase()}
                {format(locationTimestamp, "EEE, d 'de' MMMM", {
                  locale: pt,
                }).substring(1)}
              </DateLabel>
              <DateLabel>
                {format(locationTimestamp, 'HH:mm', {
                  locale: pt,
                })}
              </DateLabel>
              {/* <InfoLabel>
              Coords: {locationInfo.latitude}, {locationInfo.longitude}
            </InfoLabel> */}
              <InfoLabel>{weatherInfo.name}</InfoLabel>
              <TempIconContainer>
                <Image
                  source={{
                    uri:
                      weatherInfo.weather[0] &&
                      `https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@4x.png`,
                  }}
                />
                <TemperatureLabel>
                  {Math.round(weatherInfo.main.temp || 0)}&deg;
                </TemperatureLabel>
              </TempIconContainer>
              <InfoLabel>Ventos: {weatherInfo.wind.speed} km/h</InfoLabel>
              <InfoLabel>Umidade: {weatherInfo.main.humidity}%</InfoLabel>
            </>
          )}
          <Divider />
          <FlatListTitle>Hora em hora:</FlatListTitle>
          <Flatlist
            horizontal
            data={forecastInfo.hourly}
            keyExtractor={(hour) => `${hour.dt}`}
            renderItem={({ item: hour, index }) => {
              return (
                <ForecastItem>
                  <ForecastLargTextLabel>
                    {format(addHours(new Date(), index), "HH'h", {
                      locale: pt,
                    })}
                  </ForecastLargTextLabel>
                  <InfoLabel>{Math.round(hour.temp)}&deg;</InfoLabel>
                </ForecastItem>
              );
            }}
          />
          <FlatListTitle>Próximos dias:</FlatListTitle>
          <Flatlist
            horizontal
            data={forecastInfo.daily}
            keyExtractor={(day) => `${day.dt}`}
            renderItem={({ item: day, index }) => {
              return (
                <ForecastItem>
                  <ForecastLargTextLabel>
                    {format(addDays(new Date(), index), 'MMM dd', {
                      locale: pt,
                    })}
                  </ForecastLargTextLabel>
                  <ForecastRowContainer>
                    <ForecastIcon
                      source={{
                        uri:
                          weatherInfo.weather[0] &&
                          `https://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png`,
                      }}
                    />
                    <InfoLabel>{Math.round(day.temp.day)}&deg;</InfoLabel>
                  </ForecastRowContainer>
                  <InfoLabel>
                    {day.weather[0].description.substring(0, 1).toUpperCase()}
                    {day.weather[0].description.substring(1)}
                  </InfoLabel>
                  <InfoLabel>Umidade: {day.humidity}%</InfoLabel>
                  <InfoLabel>Ventos: {day.wind_speed} km/h</InfoLabel>
                </ForecastItem>
              );
            }}
          />
        </Container>
      </ScrollView>
    </MySafeAreaView>
  );
};

export default CurrentWeather;
