import React from 'react';

import { FlatList } from './styles';

const ForecastFlatList = ({ data, renderItem }) => {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => `${item.dt}`}
      data={data}
      renderItem={renderItem}
    />
  );
};

export default ForecastFlatList;
