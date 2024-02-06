import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import {VictoryChart, VictoryAxis, VictoryCandlestick} from 'victory-native';
import Loader from '../../Loader/Loader';
import axios from 'axios';
import BackButton from '../BackButton/BackButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import TimeframeSelector from '../../Home/Topmenu/subMenu/Fund_news_chart/Charts/chartTimeframes'; // Ajusta la ruta según la ubicación de tu componente
import useEthBtcStyles from './EthBtcChartStyles';
import {AppThemeContext} from '../../../context/themeContext';

const EthBtcChart = ({loading, candlesToShow = 30}) => {
  const styles = useEthBtcStyles();
  const [chartData, setChartData] = useState([]);
  const [selectedInterval, setSelectedInterval] = useState('1d');
  const {theme} = useContext(AppThemeContext);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get(
          'https://api3.binance.com/api/v3/klines',
          {
            params: {
              symbol: 'ETHBTC',
              interval: selectedInterval.toLowerCase(),
              limit: 45,
            },
          },
        );
        const data = response.data;
        const ohlcData = data.map(entry => ({
          x: new Date(entry[0]),
          open: parseFloat(entry[1]),
          high: parseFloat(entry[2]),
          low: parseFloat(entry[3]),
          close: parseFloat(entry[4]),
        }));
        setChartData(ohlcData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchChartData();
  }, [selectedInterval]);

  if (loading || chartData.length === 0) {
    return (
      <SafeAreaView style={styles.background}>
        <BackButton />
        <Text style={styles.analysisTitle}>ETH/BTC Chart</Text>
        <View style={styles.container}>
          <Loader />
        </View>
      </SafeAreaView>
    );
  }

  const domainY = chartData.reduce(
    (acc, dataPoint) => [
      Math.min(acc[0], dataPoint.low),
      Math.max(acc[1], dataPoint.high),
    ],
    [Infinity, -Infinity],
  );

  const domainX = [chartData[0].x, chartData[chartData.length - 1].x];

  const changeInterval = newInterval => {
    setSelectedInterval(newInterval);
  };

  return (
    <>
      <SafeAreaView style={styles.background}>
        <BackButton />
        <Text style={styles.analysisTitle}>ETH/BTC Chart</Text>
        <View style={styles.timeframeContainer}>
          <TimeframeSelector
            selectedInterval={selectedInterval}
            changeInterval={changeInterval}
          />
        </View>
        <View style={styles.container}>
          <View style={styles.chart}>
            <ImageBackground
              source={require('../../../assets/logo_3.png')}
              style={styles.backgroundImage}></ImageBackground>

            <VictoryChart
              width={400}
              domain={{x: domainX, y: domainY}}
              padding={{top: 10, bottom: 60, left: 30, right: 60}}
              domainPadding={{x: 5, y: 3}}
              scale={{x: 'time', y: 'linear'}}
              height={300}>
              <VictoryAxis
                style={{
                  axis: {stroke: theme.chartsColor},
                  tickLabels: {
                    fontSize: theme.responsiveFontSize * 0.7,
                    fill: theme.titleColor,
                  },
                  grid: {stroke: theme.homeChartsGridColor},
                }}
              />
              <VictoryAxis
                dependentAxis
                style={{
                  axis: {stroke: theme.chartsColor},
                  tickLabels: {
                    fontSize: theme.responsiveFontSize * 0.825,
                    fill: theme.titleColor,
                  },
                  grid: {stroke: theme.homeChartsGridColor},
                }}
                orientation="right"
              />

              <VictoryCandlestick
                data={chartData}
                candleRatio={0.6}
                candleColors={{positive: '#3ADF00', negative: '#FF477C'}}
                style={{
                  data: {
                    strokeWidth: 0,
                  },
                }}
              />
            </VictoryChart>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default EthBtcChart;
