import React from 'react';
import { Dimensions } from 'react-native';
import { format } from 'date-fns';
import { LineChart as Chart } from 'react-native-chart-kit';

import { ChartView } from './styles';
import theme from '../../assets/theme';

const screenWidth = Dimensions.get('window').width;

const LineChart = ({ x, y, yAxisSuffix }) => {
  return (
    <ChartView>
      <Chart
        data={{
          labels: x,
          datasets: [
            {
              data: y,
              color: () => theme.textColor,
            },
          ],
        }}
        width={screenWidth}
        height={220}
        bezier
        fromZero
        withDots={false}
        withHorizontalLines={false}
        horizontalLabelRotation={-40}
        verticalLabelRotation={-40}
        yAxisSuffix={yAxisSuffix}
        withShadow={false}
        chartConfig={{
          backgroundGradientFromOpacity: 0,
          backgroundGradientToOpacity: 0,
          decimalPlaces: 2,
          color: () => `${theme.textColor}`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
      />
    </ChartView>
  );
};

export default LineChart;
