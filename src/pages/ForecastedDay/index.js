import React from 'react';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';

import SafeAreaView from '../../components/MySafeAreaView';
import {
  LargeText,
  MediumText,
  RowContainer,
  SmallText,
} from '../../components/GeneralComponents';
import {
  Container,
  Image,
  DateText,
  DayNightIcon,
  Divider,
  DayNightContainer,
  CenteredContainer,
} from './styles';

const ForecastedDay = ({ route }) => {
  const {
    params: { day },
  } = route;
  const date = new Date(day.dt * 1000);
  const weekDay = `${format(date, 'EEEEE', {
    locale: pt,
  }).toUpperCase()}${format(date, 'EEE', {
    locale: pt,
  }).substring(1)}`;
  const description = `${day.weather[0].description
    .substring(0, 1)
    .toUpperCase()}${day.weather[0].description.substring(1)}`;
  return (
    <SafeAreaView>
      <Container>
        <DateText>
          {`${weekDay}, `}
          {format(date, "d 'de' MMMM", {
            locale: pt,
          }).substring(1)}
        </DateText>
        <MediumText />
        <SmallText>{description}</SmallText>
        <SmallText>
          Sol{' '}
          {format(new Date(day.sunrise * 1000), 'HH:mm', {
            locale: pt,
          })}
          {' - '}
          {format(new Date(day.sunset * 1000), 'HH:mm', {
            locale: pt,
          })}
        </SmallText>
        <CenteredContainer>
          <Image
            source={{
              uri: `https://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png`,
            }}
          />
          <RowContainer>
            <DayNightContainer>
              <DayNightIcon
                source={{
                  uri: 'https://openweathermap.org/img/wn/01d@4x.png',
                }}
              />
              <MediumText>{Math.round(day.temp.morn)}&deg;C</MediumText>
            </DayNightContainer>
            <Divider />
            <DayNightContainer>
              <DayNightIcon
                source={{
                  uri: 'https://openweathermap.org/img/wn/01n@4x.png',
                }}
              />
              <MediumText>{Math.round(day.temp.night)}&deg;C</MediumText>
            </DayNightContainer>
          </RowContainer>
        </CenteredContainer>
        <LargeText>
          Max {Math.round(day.temp.max)}&deg;C, min {Math.round(day.temp.min)}
          &deg;C
        </LargeText>
        <LargeText>Umidade {day.humidity}%</LargeText>
        <LargeText>UV: {day.uvi}</LargeText>
        <LargeText>Ventos {day.wind_speed} km/h</LargeText>
        <LargeText>Direção dos ventos: {day.wind_deg}&deg;</LargeText>
      </Container>
    </SafeAreaView>
  );
};

export default ForecastedDay;
