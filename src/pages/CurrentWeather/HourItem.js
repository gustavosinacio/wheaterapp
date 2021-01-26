import React from 'react';
import { addHours, format } from 'date-fns';
import { pt } from 'date-fns/locale';
import {
  MediumText,
  SmallText,
  RowContainer,
} from '../../components/GeneralComponents';
import { ForecastItem, ForecastIcon } from './styles';

const HourItem = ({ hour, index }) => {
  const formatedDate = format(addHours(new Date(), index), "HH':00'", {
    locale: pt,
  });

  const description =
    hour.weather &&
    `${hour.weather[0].description
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
                hour.weather[0] &&
                `https://openweathermap.org/img/wn/${hour.weather[0].icon}@4x.png`,
            }}
          />
        </RowContainer>
        <MediumText>{Math.round(hour.temp)}&deg;C</MediumText>
        <SmallText>{description}</SmallText>
      </ForecastItem>
    )
  );
};

export default HourItem;
