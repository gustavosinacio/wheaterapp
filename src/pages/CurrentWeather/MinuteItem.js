import React from 'react';
import { addMinutes, format } from 'date-fns';
import { pt } from 'date-fns/locale';
import {
  RowContainer,
  MediumText,
  SmallText,
} from '../../components/GeneralComponents';
import { ForecastItem } from './styles';

const HourItem = ({ minute, index }) => {
  const formatedDate = format(addMinutes(new Date(), index), "HH'h':mm", {
    locale: pt,
  });

  return (
    <ForecastItem>
      <SmallText>{formatedDate}</SmallText>
      <RowContainer>
        <MediumText>{minute.precipitation}</MediumText>
        <SmallText> mm/h</SmallText>
      </RowContainer>
    </ForecastItem>
  );
};

export default HourItem;
