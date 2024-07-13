import React, {useContext, useEffect, useState, useMemo} from 'react';
import {View, ImageBackground, Dimensions, Image} from 'react-native';
import {
  VictoryChart,
  VictoryAxis,
  VictoryZoomContainer,
  VictoryCandlestick,
  VictoryLabel,
  VictoryLine,
} from 'victory-native';
import {AppThemeContext} from '../../../../../../context/themeContext';
import useChartsStyles from './ChartsStyles';
import {getService} from '../../../../../../services/aiAlphaApi';
import DataRenderer from './clickOnCandleDetails';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useScreenOrientation} from '../../../../../../hooks/useScreenOrientation';
import {useNavigation} from '@react-navigation/core';
import SkeletonLoader from '../../../../../Loader/SkeletonLoader';

// Format any number, including 0.0000
const formatNumber = num => {
  const absNum = Math.abs(num);

  // Handle numbers lower than 1, rounding them to 4 terms.
  if (absNum < 1) {
    return num.toFixed(4);
  }

  const abbrev = ['', 'k', 'm', 'b', 't'];
  const tier = Math.floor(Math.log10(absNum) / 3);

  // If the number is too low, use exponential notation
  if (absNum < 0.001) {
    return num.toExponential();
  }

  // Divide based on the tier
  const divisor = Math.pow(1000, tier);
  const formattedNum = (num / divisor).toFixed(2);

  // Return the number with the correct abbreviation and handling the negative cases.
  return (num < 0 ? '-' : '') + formattedNum + abbrev[tier];
};

// Format number in shorten way
function formatLabelNumber(number, decimalPlaces = 2) {
  if (number >= 1) {
    return number.toFixed(decimalPlaces).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  } else {
    return number;
  }
}

// Format of date: yeay-month-day hour:minutes
function formatDate(dateString) {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${month}/${day} ${hours}:${minutes}`;
}

// Calculate fibonacci lines
const fibonacciRetracement = (low, high) => {
  const range = high - low;
  const retracementLevels = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1, 1.618];

  return retracementLevels.reduce((result, level) => {
    result[level] = low + range * level;
    return result;
  }, {});
};

const Chart = ({
  symbol,
  chartData,
  loading,
  candlesToShow = 30,
  activeButtons,
  selectedInterval,
  coinBot,
  selectedPairing,
}) => {
  const styles = useChartsStyles();
  const {theme} = useContext(AppThemeContext);
  const [supportLevels, setSupportLevels] = useState([]);
  const [resistanceLevels, setResistanceLevels] = useState([]);
  const [selectedCandle, setSelectedCandle] = useState(null);
  const {isLandscape, isHorizontal, handleScreenOrientationChange} =
    useScreenOrientation();
  const navigation = useNavigation();

  // Function to handle the X button interaction on the horizontal chart

  const handleBackInteraction = () => {
    if (isLandscape || isHorizontal) {
      handleScreenOrientationChange('PORTRAIT');
      navigation.canGoBack(false);
    }
  };

  const usesAlternativeSource =
    coinBot === 'velo' || coinBot === 'kas' ? true : false;

  // Fetch support and resistance data from the API
  const getSupportAndResistanceData = async (coinBot, time_interval) => {
    try {
      const response = await getService(
        `/api/coin-support-resistance?coin_name=${coinBot}&temporality=${time_interval.toLowerCase()}&pair=${selectedPairing.toLowerCase()}`,
      );

      const supportValues = [];
      const resistanceValues = [];

      if (response.success) {
        // Extract support and resistance values from the response
        const values = response.chart_values;
        for (const key in values) {
          if (key.includes('support')) {
            supportValues.push(values[key]);
          } else if (key.includes('resistance')) {
            resistanceValues.push(values[key]);
          }
        }

        setSupportLevels(supportValues);
        setResistanceLevels(resistanceValues);
      } else {
        console.info('---response S&R----', response.message);
      }
    } catch (error) {
      console.error('Error fetching support and resistance data: ', error);
    }
  };

  // Extracting low and high values from candlestick data
  const lows = chartData.map(d => d.low);
  const highs = chartData.map(d => d.high);

  // Calculate Fibonacci retracement levels
  const low = Math.min(...lows);
  const high = Math.max(...highs);
  const retracementLevels = fibonacciRetracement(low, high);

  useEffect(() => {
    if (coinBot && selectedInterval) {
      getSupportAndResistanceData(coinBot, selectedInterval);
    }
  }, [coinBot, selectedInterval]);

  const filterExcessiveLevels = (levels, currentPrice, type) => {
    return levels.filter(level => {
      if (type === 'support' || type === 'resistance') {
        return level <= currentPrice * 1.6 && level >= currentPrice * 0.4;
      }
      return false;
    });
  };

  const [zoomDomain, setZoomDomain] = useState({
    x: [chartData[0]?.x, chartData[chartData.length - 1]?.x],
  });

  useEffect(() => {
    setZoomDomain({
      x: [
        chartData[chartData.length - candlesToShow]?.x,
        chartData[chartData.length - 1]?.x,
      ],
    });
  }, [chartData, candlesToShow]);

  const domainY = useMemo(() => {
    const priceRange = chartData.slice(-candlesToShow).reduce(
      (acc, dataPoint) => {
        const {open, close, high, low} = dataPoint;
        return [
          Math.min(acc[0], open, close, high, low),
          Math.max(acc[1], open, close, high, low),
        ];
      },
      [Infinity, -Infinity],
    );

    let maxPrice = Math.max(priceRange[1], high);
    let minPrice = Math.min(priceRange[0], low);

    // Apply the function to filter the excessively high or low support and resistance levels
    if (activeButtons.includes('Support')) {
      const filteredSupport = filterExcessiveLevels(
        supportLevels,
        low,
        'support',
      );
      if (filteredSupport.length > 0) {
        minPrice = Math.min(minPrice, ...filteredSupport);
      }
    }

    if (activeButtons.includes('Resistance')) {
      const filteredResistance = filterExcessiveLevels(
        resistanceLevels,
        high,
        'resistance',
      );
      if (filteredResistance.length > 0) {
        maxPrice = Math.max(maxPrice, ...filteredResistance);
      }
    }

    return [minPrice, maxPrice];
  }, [
    chartData,
    candlesToShow,
    supportLevels,
    resistanceLevels,
    activeButtons,
  ]);

  // const domainY = () => {
  //   if (
  //     activeButtons.length === 0 ||
  //     (activeButtons.length > 0 &&
  //       (supportLevels.length === 0 || resistanceLevels.length === 0))
  //   ) {
  //     return chartData.slice(-candlesToShow).reduce(
  //       (acc, dataPoint) => {
  //         const {open, close, high, low} = dataPoint;
  //         return [
  //           Math.min(acc[0], open, close, high, low),
  //           Math.max(acc[1], open, close, high, low),
  //         ];
  //       },
  //       [Infinity, -Infinity],
  //     );
  //   } else {
  //     const levels = [...supportLevels, ...resistanceLevels];
  //     // Remove: atom usdt issue solver.
  //     return coinBot.toLowerCase() === 'atom' && selectedInterval === '1W'
  //       ? [1, Math.max(...levels)]
  //       : [Math.min(...levels), Math.max(...levels)];
  //   }
  // };

  const domainX = [
    chartData[chartData.length - candlesToShow]?.x,
    chartData && chartData[chartData.length - 1]?.x,
  ];

  const lastCandle = chartData[chartData.length - 1]; // Get the last candlestick data

  // Function to handle candle click events
  const handleCandleClick = (event, data) => {
    setSelectedCandle(data);
  };

  const handleCandlePressOut = () => {
    setSelectedCandle(null); // Clear the selected candle state
  };

  const calculateCandleMiddle = candle => {
    return (candle.open + candle.close) / 2;
  };

  // Gets the dimensation of the phone
  const {height, width} = Dimensions.get('window');
  const chartWidth = width > 500 ? 860 : 400;
  const chartHeight = 340;

  if (loading) {
    return <SkeletonLoader type="chart" style={{height: 300}} />;
  }

  return (
    <View style={styles.chartContainer}>
      <View style={[styles.chart, {width: '100%'}]}>
        <ImageBackground
          source={require('../../../../../../assets/images/chart_alpha_logo.png')}
          style={styles.chartBackgroundImage}
          resizeMode="contain"
        />

        {/* CHART WRAPPER COMPONENT */}
        <VictoryChart
          style={styles.chartMainContainer}
          width={chartWidth}
          containerComponent={
            <VictoryZoomContainer
            // zoomDomain={zoomDomain}
            // onZoomDomainChange={domain => setZoomDomain(domain)}
            />
          }
          domain={{x: zoomDomain.x, y: domainY}}
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
          padding={{top: 20, bottom: 60, left: 20, right: 70}}
          domainPadding={{
            x: 1,
            y:
              coinBot.toLowerCase() === 'atom' && selectedInterval === '1W'
                ? 0
                : 10,
          }}
          scale={{x: 'time', y: 'log'}}
          height={chartHeight}>
          {/* X AXIS */}
          <VictoryAxis
            fixLabelOverlap
            style={{
              axis: {stroke: theme.chartsAxisColor},
              tickLabels: {
                fontSize: theme.responsiveFontSize * 0.725,
                fill: theme.titleColor,
                fontFamily: theme.font,
                maxWidth: 10,
              },
              grid: {stroke: theme.chartsGridColor},
            }}
            tickCount={3}
            tickFormat={t => {
              const year = t.getFullYear();
              const month = (t.getMonth() + 1).toString().padStart(2, '0');
              const day = t.getDate().toString().padStart(2, '0');
              const hour = t.getHours().toString().padStart(2, '0');
              const minute = t.getMinutes().toString().padStart(2, '0');
              return `${year}-${day}-${month}`;
            }}
          />

          {/* Y AXIS */}
          <VictoryAxis
            dependentAxis
            style={{
              axis: {stroke: theme.chartsAxisColor},
              tickLabels: {
                fontSize: theme.responsiveFontSize * 0.67,
                fontFamily: theme.font,
                fill: theme.titleColor,
              },
              grid: {stroke: theme.chartsGridColor},
            }}
            tickCount={selectedInterval === '1W' ? 7 : 5}
            tickFormat={t => formatNumber(t)}
            orientation={'right'}
          />
          {/* HORIZONTAL LINE */}
          {selectedCandle && (
            <VictoryLine
              data={[
                {
                  x: zoomDomain.x[0],
                  y: (selectedCandle.open + selectedCandle.close) / 2,
                },
                {
                  x: zoomDomain.x[1],
                  y: (selectedCandle.open + selectedCandle.close) / 2,
                },
              ]}
              style={{
                data: {stroke: 'red', strokeWidth: 1, strokeDasharray: [4, 4]},
              }}
            />
          )}

          <DataRenderer
            domainX={zoomDomain.x}
            yPoint={selectedCandle && calculateCandleMiddle(selectedCandle)}
            domainY={domainY}
            chartWidth={chartWidth}
            screenWidth={width}
            chartHeight={chartHeight}
            data={selectedCandle && selectedCandle}
          />

          {/* VERTICAL LINE */}
          {selectedCandle && (
            <VictoryLine
              data={[
                {x: new Date(selectedCandle.x), y: high},
                {x: new Date(selectedCandle.x), y: low},
              ]}
              style={{
                data: {stroke: 'red', strokeWidth: 1, strokeDasharray: [4, 4]},
              }}
            />
          )}

          {/* DISPLAY DATA COMPONENT */}
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
            candleRatio={
              usesAlternativeSource && selectedInterval !== '1W' ? 2.75 : 0.9
            }
            candleColors={{positive: '#09C283', negative: '#E93334'}}
            style={{
              data: {
                strokeWidth: 0.75,
                stroke: datum =>
                  datum.close < datum.open ? '#09C283' : '#E93334',
              },
            }}
          />

          {/* RESISTANCE LEVELS */}
          {resistanceLevels &&
            activeButtons.includes('Resistance') &&
            resistanceLevels?.map((level, index) => (
              <VictoryLine
                data={[
                  {x: domainX[0], y: level},
                  {x: domainX[1], y: level},
                ]}
                key={`resistance-${index}`}
                // styles for the line itself
                style={{data: {stroke: '#F012A1', strokeWidth: 2}}}
                labels={() => [`$${formatLabelNumber(level)} `]}
                labelComponent={
                  <VictoryLabel
                    dy={5}
                    dx={10}
                    textAnchor="start"
                    inline={true}
                    style={{
                      fill: '#fff',
                      fontSize: 11,
                      fontFamily: theme.fontMedium,
                    }}
                    backgroundPadding={[
                      {top: -1, bottom: 6, left: 2.3, right: 0},
                    ]}
                    backgroundStyle={[
                      {
                        fill: '#F012A1',
                        opacity: 0.8,
                      },
                    ]}
                  />
                }
              />
            ))}

          {/* SUPPORT LEVELS */}
          {supportLevels &&
            activeButtons.includes('Support') &&
            supportLevels?.map((level, index) => (
              <VictoryLine
                data={[
                  {x: domainX[0], y: level},
                  {x: domainX[1], y: level},
                ]}
                key={`support-${index}`}
                style={{
                  data: {stroke: '#FC5404', strokeWidth: 2},
                }}
                labels={() => [`$${formatLabelNumber(level)} `]}
                labelComponent={
                  <VictoryLabel
                    dy={5}
                    dx={10}
                    textAnchor="start"
                    inline={true}
                    backgroundPadding={[
                      {top: -1, bottom: 6, left: 2.3, right: 0},
                    ]}
                    style={[
                      {
                        fill: '#F7F7F7',
                        fontSize: 11,
                        fontFamily: theme.fontMedium,
                      },
                    ]}
                    backgroundStyle={[
                      {
                        fill: '#FC5404',
                        opacity: 0.8,
                      },
                    ]}
                  />
                }
              />
            ))}
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
              ? require('../../../../../../assets/images/home/charts/deactivate-horizontal.png')
              : require('../../../../../../assets/images/home/charts/activate-horizontal.png')
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
          source={require('../../../../../../assets/images/home/charts/back.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Chart;

// {/* Plot of the Fibonacci lines */}
// {activeButtons.includes('Fibonacci') && Object.keys(retracementLevels).length > 0 && (
//   Object.keys(retracementLevels).map(level => (
//     <VictoryLine
//     key={level}
//     padding={{ top: 0, bottom: 0, left: 20, right: 60}}
//     labels={() => `${level}% $${formatLabelNumber(retracementLevels[level])}`}
//     data={[
//       { x: domainX[0], y: retracementLevels[level] },
//       { x: domainX[1], y: retracementLevels[level] },
//     ]}
//     style={{
//       data: { stroke: 'blue' },
//       labels: {fontSize: 12}
//     }}
//     labelComponent={
//       <VictoryLabel
//         dy={5}
//         dx={10}
//         textAnchor="start"
//         inline={true}
//         style={{
//           fill: '#fff',
//           fontSize: 11,
//           fontFamily: theme.fontMedium,
//         }}
//         backgroundPadding={[{ top: -1, bottom: 6, left: 2.3, right: 0 }]}
//         backgroundStyle={[
//           {
//             fill: 'blue',
//             opacity: 0.8
//           }
//         ]}
//       />
//     }
//   />
//   ))
// )}

// events={[
//   {
//     target: 'data',
//     eventHandlers: {
//       onPressIn:  () => {
//         setIsToolTipActive(true);
//         return [
//           {
//             target: 'data',
//             mutation: props => {
//               return {
//                 style: {
//                   ...props.style, // Keep existing styles
//                   stroke: '#FFD700',
//                   strokeWidth: 2
//                 }
//               };
//             },
//           },
//         ];
//       },
//       onPressOut: () => {
//         setIsToolTipActive(false);
//         return [
//           {
//             target: 'data',
//             mutation: () => {
//               return null;
//             },
//           },
//         ];
//       },
//     },
//   },
// ]}

{
  /* TREND LINE */
}
{
  /* <VictoryLine
                data={[
                  { x: chartData[25].x, y: 52000 },
                  { x: chartData[33].x, y: 68000 },
                ]}
                key={`trendline`}
                style={{
                  data: { stroke: '#13B4C7', strokeWidth: 2 },
                }}
                labels={[formatLabelNumber(52000), formatLabelNumber(68000)]}
                labelComponent={
                  <VictoryLabel
                    dy={0}
                    dx={0}
                    // angle={-36}
                    textAnchor="end"
                    inline={true}
                    backgroundPadding={[{ top: -1, bottom: 6, left: 2.5, right: 8 }]}
                    style={[
                      {
                        fill: '#fff',
                        fontSize: 11,
                        fontFamily: theme.fontMedium,
                      },
                    ]}
                    backgroundStyle={[
                      {
                        fill: '#13B4C7',
                        opacity: 1
                      },
                    ]}
                  />
                }
              /> */
}
