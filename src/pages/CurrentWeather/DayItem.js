import React from 'react';
import { addDays, format } from 'date-fns';
import { pt } from 'date-fns/locale';

import {
  ForecastItem,
  LargeText,
  SmallText,
  MaxTempForecast,
  MinTempForecast,
  RowContainer,
  ForecastIcon,
} from './styles';

const CurrentWeather = ({ day, index }) => {
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
                day.weather[0] &&
                `https://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png`,
            }}
          />
          <MaxTempForecast>{Math.round(day.temp.max)}&deg;</MaxTempForecast>
          <MinTempForecast>{Math.round(day.temp.min)}&deg;</MinTempForecast>
        </RowContainer>

        <SmallText>{description}</SmallText>
        <SmallText>Umidade: {day.humidity}%</SmallText>
        <SmallText>Ventos: {day.wind_speed} km/h</SmallText>
        <SmallText>Direção dos ventos: {day.wind_deg}&deg;</SmallText>
        <SmallText>UV: {day.uvi}</SmallText>
      </ForecastItem>
    )
  );
};

export default CurrentWeather;
