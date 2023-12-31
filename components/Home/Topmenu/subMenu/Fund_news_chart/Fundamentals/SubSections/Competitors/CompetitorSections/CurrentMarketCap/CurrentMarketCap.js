import {Text, View} from 'react-native';
import React, {useContext} from 'react';
import {
  VictoryChart,
  VictoryBar,
  VictoryTooltip,
  VictoryAxis,
} from 'victory-native';
import useChartStyles from './ChartStyles';
import {AppThemeContext} from '../../../../../../../../../../context/themeContext';

const CurrentMarketCap = ({cryptos}) => {
  const {theme} = useContext(AppThemeContext);
  const styles = useChartStyles();
  return (
    <View style={styles.chartContainer}>
      <VictoryChart>
        <VictoryAxis
          style={{
            axis: {stroke: theme.chartsColor},
            tickLabels: {
              fontSize: theme.responsiveFontSize * 0.825,
              fill: theme.titleColor,
            },
          }}
        />
        <VictoryAxis
          dependentAxis
          style={{
            axis: {stroke: theme.chartsColor},
            tickLabels: {
              fontSize: theme.responsiveFontSize * 0.825,
              fill: theme.chartsColor,
            },
            grid: {stroke: theme.chartsColor},
          }}
        />
        <VictoryBar
          style={{
            data: {
              fill: ({datum}) => datum.color,
            },
          }}
          alignment={'middle'}
          domain={{x: [0, 5], y: [0, 260]}}
          domainPadding={{x: 1, y: 20}}
          data={cryptos.map(crypto => ({
            x: crypto.symbol,
            y: crypto.marketCap[0],
            label: ` $${crypto.marketCap[1]} `,
            color: crypto.color,
          }))}
          labels={({datum}) => datum.label}
          labelComponent={<VictoryTooltip renderInPortal={false} />}
        />
      </VictoryChart>
    </View>
  );
};

export default CurrentMarketCap;
