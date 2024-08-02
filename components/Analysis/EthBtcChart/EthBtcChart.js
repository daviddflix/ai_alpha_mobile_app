import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  ImageBackground,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {
  VictoryChart,
  VictoryAxis,
  VictoryCandlestick,
  VictoryZoomContainer,
  VictoryLine,
} from 'victory-native';
import axios from 'axios';
import BackButton from '../BackButton/BackButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import TimeframeSelector from '../../Home/Topmenu/subMenu/Fund_news_chart/Charts/chartTimeframes';
import useEthBtcStyles from './EthBtcChartStyles';
import {AppThemeContext} from '../../../context/themeContext';
import LinearGradient from 'react-native-linear-gradient';
import SkeletonLoader from '../../Loader/SkeletonLoader';
import {useNavigation} from '@react-navigation/core';
import {useScreenOrientation} from '../../../hooks/useScreenOrientation';
import DataRenderer from '../../Home/Topmenu/subMenu/Fund_news_chart/Charts/clickOnCandleDetails';

// This component generates a chart with ETH/BTC pairing data coming from the binance API

const EthBtcChart = ({candlesToShow = 30}) => {
  const styles = useEthBtcStyles();
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInterval, setSelectedInterval] = useState('1D');
  const {isDarkMode, theme} = useContext(AppThemeContext);
  const navigation = useNavigation();
  const {isLandscape, isHorizontal, handleScreenOrientationChange} =
    useScreenOrientation();
  const [selectedCandle, setSelectedCandle] = useState(null);

  // Use Effect that gets the chart data from the Binance API, mapping it to the Victory Chart necessary format
  async function fetchChartData() {
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
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const intervalId = setInterval(() => fetchChartData(), 2000);
    return () => clearInterval(intervalId);
  }, [selectedInterval]);

  // Function to handle candle click events
  const handleCandleClick = (event, data) => {
    const linesColor = data.close > data.open ? '#09C283' : '#E93334';
    setSelectedCandle({...data, linesColor});
  };

  const handleCandlePressOut = () => {
    setSelectedCandle(null); // Clear the selected candle state
  };

  const calculateCandleMiddle = candle => {
    return (candle.open + candle.close) / 2;
  };

  // If the chart data is loading, then display a loader
  if (loading || chartData.length === 0) {
    return (
      <LinearGradient
        useAngle={true}
        angle={45}
        colors={isDarkMode ? ['#0F0F0F', '#171717'] : ['#F5F5F5', '#E5E5E5']}
        locations={[0.22, 0.97]}
        style={{flex: 1}}>
        <SafeAreaView style={styles.background}>
          <View style={styles.backButtonWrapper}>
            <BackButton />
          </View>
          <Text style={styles.analysisTitle}>ETH/BTC Chart</Text>
          <Text style={styles.sectionDescription}>
            The strength of ETH against BTC helps us understand how strong
            Ethereum and its ecosystem projects are while also telling us how
            strong the entire altcoin market is too.
          </Text>
          <View
            style={[styles.container, {width: '95%', marginHorizontal: 10}]}>
            <SkeletonLoader type="timeframe" quantity={2} />
            <SkeletonLoader
              type="chart"
              style={{marginVertical: 0, paddingTop: 24, paddingVertical: 16}}
            />
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }
  // Function that generates the Y-Axis domain with the charts data
  const domainY = chartData.reduce(
    (acc, dataPoint) => [
      Math.min(acc[0], dataPoint.low),
      Math.max(acc[1], dataPoint.high),
    ],
    [Infinity, -Infinity],
  );
  // Function that generates the X-Axis domain with the charts data

  const domainX = [chartData[0].x, chartData[chartData.length - 1].x];

  // Function to change the time interval of the chart
  const changeInterval = async newInterval => {
    setLoading(true);
    try {
      setSelectedInterval(newInterval);
      setChartData([]);
    } catch (error) {
      console.error(`Failed to change interval: ${error}`);
    }
  };

  // Function to handle the X button interaction on the horizontal chart

  const handleBackInteraction = () => {
    if (isLandscape || isHorizontal) {
      handleScreenOrientationChange('PORTRAIT');
      navigation.canGoBack(false);
    }
  };

  // Extracting low and high values from candlestick data
  const lows = chartData.map(d => d.low);
  const highs = chartData.map(d => d.high);

  // Calculate Fibonacci retracement levels
  const low = Math.min(...lows);
  const high = Math.max(...highs);

  const {height, width} = Dimensions.get('window');
  const chartWidth = width > 500 ? 860 : 400;
  const chartHeight = 300;

  return (
    <LinearGradient
      useAngle={true}
      angle={45}
      colors={isDarkMode ? ['#0F0F0F', '#171717'] : ['#F5F5F5', '#E5E5E5']}
      locations={[0.22, 0.97]}
      style={{flex: 1}}>
      <SafeAreaView
        style={[
          styles.background,
          isLandscape && isHorizontal && {width: '100%'},
        ]}>
        <ScrollView
          style={[{flex: 1}]}
          showsVerticalScrollIndicator={false}
          bounces={false}>
          <View style={styles.backButtonWrapper}>
            <BackButton />
          </View>
          <Text style={styles.analysisTitle}>ETH/BTC Chart</Text>
          <Text style={styles.sectionDescription}>
            The strength of ETH against BTC helps us understand how strong
            Ethereum and its ecosystem projects are while also telling us how
            strong the entire altcoin market is too.
          </Text>
          <View style={styles.timeframeContainer}>
            <TimeframeSelector
              selectedPairing={'null'}
              selectedInterval={selectedInterval}
              changeInterval={changeInterval}
              disabled={loading}
            />
          </View>
          <View style={styles.container}>
            <View style={styles.chart}>
              <ImageBackground
                source={require('../../../assets/images/chart_alpha_logo.png')}
                style={styles.chartBackgroundImage}
                resizeMode="contain"
              />
              <VictoryChart
                width={isLandscape && isHorizontal ? 700 : chartWidth}
                domain={{x: domainX, y: domainY}}
                events={[
                  {
                    target: 'parent',
                    eventHandlers: {
                      onPressOut: () => {
                        handleCandlePressOut();
                        return [];
                      },
                    },
                  },
                ]}
                padding={{top: 10, bottom: 40, left: 20, right: 70}}
                domainPadding={{x: 2.5, y: 3}}
                scale={{x: 'time', y: 'linear'}}
                height={chartHeight}
                containerComponent={<VictoryZoomContainer />}>
                <VictoryAxis
                  fixLabelOverlap
                  style={{
                    axis: {stroke: theme.chartsAxisColor, strokeWidth: 2.5},
                    tickLabels: {
                      fontSize: theme.responsiveFontSize * 0.7,
                      fill: theme.titleColor,
                      fontFamily: theme.font,
                    },
                    grid: {stroke: theme.chartsGridColor},
                  }}
                  tickCount={6}
                  tickFormat={t => {
                    const year = t.getFullYear();
                    const month = (t.getMonth() + 1)
                      .toString()
                      .padStart(2, '0');
                    const day = t.getDate().toString().padStart(2, '0');
                    const hour = t.getHours().toString().padStart(2, '0');
                    const minute = t.getMinutes().toString().padStart(2, '0');
                    return `${year}-${day}-${month}`;
                  }}
                />
                <VictoryAxis
                  dependentAxis
                  style={{
                    axis: {stroke: theme.chartsAxisColor},
                    tickLabels: {
                      fontSize: theme.responsiveFontSize * 0.725,
                      fill: theme.titleColor,
                      fontFamily: theme.font,
                    },
                    grid: {stroke: theme.chartsGridColor},
                  }}
                  orientation="right"
                  tickCount={8}
                  tickFormat={t => `$${t}`}
                />

                <DataRenderer
                  domainX={domainX}
                  yPoint={
                    selectedCandle && calculateCandleMiddle(selectedCandle)
                  }
                  domainY={domainY}
                  chartWidth={chartWidth}
                  screenWidth={width}
                  chartHeight={chartHeight}
                  data={selectedCandle && selectedCandle}
                />

                {/* HORIZONTAL LINE */}
                {selectedCandle && (
                  <VictoryLine
                    data={[
                      {
                        x: domainX[0],
                        y: (selectedCandle.open + selectedCandle.close) / 2,
                      },
                      {
                        x: domainX[1],
                        y: (selectedCandle.open + selectedCandle.close) / 2,
                      },
                    ]}
                    style={{
                      data: {
                        stroke: selectedCandle
                          ? selectedCandle.linesColor
                          : '#E93334',
                        strokeWidth: 1,
                        strokeDasharray: [4, 4],
                      },
                    }}
                  />
                )}

                {/* VERTICAL LINE */}
                {selectedCandle && (
                  <VictoryLine
                    data={[
                      {x: new Date(selectedCandle.x), y: high},
                      {x: new Date(selectedCandle.x), y: low},
                    ]}
                    style={{
                      data: {
                        stroke: selectedCandle
                          ? selectedCandle.linesColor
                          : '#E93334',
                        strokeWidth: 1,
                        strokeDasharray: [4, 4],
                      },
                    }}
                  />
                )}

                <VictoryCandlestick
                  data={chartData}
                  events={[
                    {
                      target: 'data',
                      eventHandlers: {
                        onPressIn: (event, props) => {
                          handleCandleClick(event, props.datum);
                          return []; // Return an empty array to avoid any state mutation on the chart itself
                        },
                      },
                    },
                  ]}
                  candleRatio={0.6}
                  candleColors={{positive: '#09C283', negative: '#E93334'}}
                  style={{
                    data: {
                      strokeWidth: 0.75,
                      stroke: datum =>
                        datum.close < datum.open ? '#09C283' : '#E93334',
                    },
                  }}
                />
              </VictoryChart>
            </View>
            <TouchableOpacity
              onPress={
                isLandscape
                  ? () => {
                      handleBackInteraction();
                    }
                  : () => {
                      navigation.canGoBack(false);
                      handleScreenOrientationChange('LANDSCAPE');
                    }
              }>
              <Image
                style={styles.chartsHorizontalButton}
                resizeMode="contain"
                source={
                  isLandscape && isHorizontal
                    ? require('../../../assets/images/home/charts/deactivate-horizontal.png')
                    : require('../../../assets/images/home/charts/activate-horizontal.png')
                }
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleBackInteraction()}>
              <Image
                style={
                  isLandscape && isHorizontal
                    ? styles.chartBackButton
                    : {display: 'none'}
                }
                resizeMode="contain"
                source={require('../../../assets/images/home/charts/back.png')}
              />
            </TouchableOpacity>
            <Image
              style={styles.chartsZoomIndicator}
              resizeMode="contain"
              source={require('../../../assets/images/home/charts/zoom-expand.png')}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default EthBtcChart;
