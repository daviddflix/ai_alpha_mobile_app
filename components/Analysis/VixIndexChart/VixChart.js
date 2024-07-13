import React, {useContext, useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BackButton from '../BackButton/BackButton';
import LinearGradient from 'react-native-linear-gradient';
import {AppThemeContext} from '../../../context/themeContext';
import {VictoryAxis, VictoryCandlestick, VictoryChart} from 'victory-native';
import TwelveDataService from '../../../services/TwelveDataServices';
import useChartSectionStyles from '../ChartSection/ChartSectionStyles';
import SkeletonLoader from '../../Loader/SkeletonLoader';
import {useScreenOrientation} from '../../../hooks/useScreenOrientation';
import {useNavigation} from '@react-navigation/core';
import TimeframeSelector from '../../Home/Topmenu/subMenu/Fund_news_chart/Charts/chartTimeframes';

const VixChart = ({route}) => {
  const styles = useChartSectionStyles();
  const {isDarkMode, theme} = useContext(AppThemeContext);
  const [chartData, setChartData] = useState([]);
  const [selectedInterval, setSelectedInterval] = useState('1d');
  const [loading, setLoading] = useState(true);
  const {isLandscape, isHorizontal, handleScreenOrientationChange} =
    useScreenOrientation();
  const navigation = useNavigation();

  async function fetchVixIndexData() {
    try {
      const adapted_interval =
        selectedInterval.toUpperCase() === '1H'
          ? '1h'
          : selectedInterval.toUpperCase() === '4H'
          ? '4h'
          : selectedInterval.toUpperCase() === '1D'
          ? '1day'
          : '1week';
      const response = await TwelveDataService.getVixIndexData(
        adapted_interval,
      );
      const mapped_prices = response?.map(price => {
        const mapped_hour = new Date(price?.datetime);
        const hour_to_seconds = mapped_hour.getTime();
        return {
          x: hour_to_seconds,
          open: parseFloat(price.open),
          high: parseFloat(price.high),
          low: parseFloat(price.low),
          close: parseFloat(price.close),
        };
      });
      setChartData(mapped_prices);
      setLoading(false);
    } catch (error) {
      console.error('Error getting the VIX Index data: ', error);
      setChartData([]);
    }
  }

  const changeInterval = async newInterval => {
    setSelectedInterval(newInterval);
    setLoading(true);
  };

  useEffect(() => {
    setLoading(true);
  }, [selectedInterval]);

  useEffect(() => {
    const intervalId = setInterval(() => fetchVixIndexData(), 8000);
    return () => clearInterval(intervalId);
  }, [selectedInterval]);

  // Function to handle the X button interaction on the horizontal chart

  const handleBackInteraction = () => {
    if (isLandscape || isHorizontal) {
      handleScreenOrientationChange('PORTRAIT');
      navigation.canGoBack(false);
    }
  };

  if (loading || chartData?.length === 0) {
    return (
      <LinearGradient
        useAngle={true}
        angle={45}
        colors={isDarkMode ? ['#0A0A0A', '#0A0A0A'] : ['#F5F5F5', '#E5E5E5']}
        style={{flex: 1}}>
        <SafeAreaView
          style={[
            styles.background,
            isLandscape && isHorizontal && {width: '100%', paddingTop: 0},
          ]}>
          <ScrollView style={{flex: 1}}>
            <View style={styles.backButtonWrapper}>
              <BackButton />
            </View>
            <Text style={styles.title}>VIX Index Chart</Text>
            <Text style={styles.sectionDescription}>
              This Index measures the volatility in the markets - it spikes up
              when sudden shocks happen and stays low when things are much
              calmer.
            </Text>
            <View style={styles.container}>
              <SkeletonLoader type="timeframe" quantity={4} />
              <SkeletonLoader
                type="chart"
                style={{marginVertical: 0, paddingTop: 24, paddingVertical: 16}}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  const domainY = () => {
    return chartData?.reduce(
      (acc, dataPoint) => {
        return [
          Math.min(acc[0], dataPoint.low),
          Math.max(acc[1], dataPoint.high),
        ];
      },
      [Infinity, -Infinity],
    );
  };

  const domainX = [chartData[0]?.x, chartData[chartData.length - 1]?.x];

  return (
    <LinearGradient
      useAngle={true}
      angle={45}
      colors={isDarkMode ? ['#0A0A0A', '#0A0A0A'] : ['#F5F5F5', '#E5E5E5']}
      style={{flex: 1}}>
      <SafeAreaView
        style={[
          styles.mainSection,
          isLandscape && isHorizontal && {width: '100%', paddingTop: 0},
        ]}>
        <ScrollView style={{flex: 1}}>
          <View style={styles.backButtonWrapper}>
            <BackButton />
          </View>
          <Text style={styles.title}>VIX Index Chart</Text>
          <Text style={styles.sectionDescription}>
            This Index measures the volatility in the markets - it spikes up
            when sudden shocks happen and stays low when things are much calmer.
          </Text>
          <View style={styles.container}>
            <View style={styles.timeframeContainer}>
              <TimeframeSelector
                selectedInterval={selectedInterval}
                changeInterval={changeInterval}
                hasHourlyTimes={true}
              />
            </View>
            <View style={styles.chart}>
              <ImageBackground
                source={require('../../../assets/images/chart_alpha_logo.png')}
                style={styles.chartBackgroundImage}
                resizeMode="contain"
              />
              <VictoryChart
                width={isLandscape && isHorizontal ? 700 : 375}
                domain={{x: domainX, y: domainY()}}
                padding={{top: 10, bottom: 40, left: 20, right: 70}}
                domainPadding={{x: 5, y: 3}}
                scale={{x: 'time', y: 'linear'}}
                height={300}>
                <VictoryAxis
                  style={{
                    axis: {stroke: theme.chartsAxisColor, strokeWidth: 2.5},
                    tickLabels: {
                      fontSize: theme.responsiveFontSize * 0.7,
                      fill: theme.titleColor,
                      fontFamily: theme.font,
                    },
                    grid: {stroke: theme.chartsGridColor},
                  }}
                  tickCount={4}
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

                <VictoryCandlestick
                  data={chartData}
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
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default VixChart;
