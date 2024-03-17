import React, {useState, useEffect, useContext, useMemo} from 'react';
import {ScrollView, View} from 'react-native';
import moment from 'moment';
import TimeframeSelector from './chartTimeframes';
import CandlestickDetails from './candleDetails';
import Chart from './chart';
import RsButton from './S&RButtons';
import AlertMenu from './alerts/AlertMenu';
import AlertListComponent from './alerts/AlertListComponent';
import {TopMenuContext} from '../../../../../../context/topMenuContext';
import UpgradeOverlay from '../../../../../UpgradeOverlay/UpgradeOverlay';
import useChartsStyles from './ChartsStyles';
import {RevenueCatContext} from '../../../../../../context/RevenueCatContext';
import {AboutModalContext} from '../../../../../../context/AboutModalContext';
import AboutModal from '../Fundamentals/AboutModal';
import LinearGradient from 'react-native-linear-gradient';
import {AppThemeContext} from '../../../../../../context/themeContext';
import Loader from '../../../../../Loader/Loader';
import {COINGECKO_PRO_KEY} from '../../../../../../src/constants';

const CandlestickChart = ({route}) => {
  const styles = useChartsStyles();
  const {interval, symbol, coinBot} =
    route.params.screen === 'Charts' ? route.params.params : route.params;
  const [isPriceUp, setIsPriceUp] = useState(null);
  const [selectedInterval, setSelectedInterval] = useState(interval);
  const [lastPrice, setLastPrice] = useState(undefined);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeButtons, setActiveButtons] = useState([]);
  const [subscribed, setSubscribed] = useState(false);
  const {activeCoin} = useContext(TopMenuContext);
  const {findCategoryInIdentifiers, userInfo} = useContext(RevenueCatContext);
  const [activeAlertOption, setActiveAlertOption] = useState('this week');
  const {aboutDescription, aboutVisible, handleAboutPress} =
    useContext(AboutModalContext);
  const {isDarkMode} = useContext(AppThemeContext);

  // Restart the last price on every coin update

  useEffect(() => {
    setLoading(true);
    setLastPrice(undefined);
  }, [activeCoin]);

  // This temporaly handles the kas missing data for binance api 
  const url_days =
    selectedInterval === '1W'
      ? 180
      : selectedInterval === '1D'
      ? 30
      : selectedInterval === '4H'
      ? 7
      : 1;
  const fetch_url =
    symbol.toLowerCase() !== 'kasusdt'
      ? `https://api3.binance.com/api/v3/klines?symbol=${symbol.toUpperCase()}&limit=50&interval=${selectedInterval.toLowerCase()}`
      : `https://pro-api.coingecko.com/api/v3/coins/kaspa/ohlc?vs_currency=usd&days=${url_days}&precision=4`;

  const options = {
    method: 'GET',
    headers: {'x-cg-pro-api-key': COINGECKO_PRO_KEY},
  };

  async function fetchChartData() {
    try {
      const response = await fetch(
        fetch_url,
        symbol.toLowerCase() === 'kasusdt' ? options : {},
      );
      const data = await response.json();
      const currentPrice = parseFloat(data[data.length - 1][4]);
      data[data.length - 1][4] >= data[data.length - 2][4]
        ? setIsPriceUp(true)
        : setIsPriceUp(false);
      setLastPrice(currentPrice);
      const formattedChartData = data.map(item => ({
        x: moment(item[0]),
        open: parseFloat(item[1]),
        close: parseFloat(item[4]),
        high: parseFloat(item[2]),
        low: parseFloat(item[3]),
      }));

      setChartData(formattedChartData);
    } catch (error) {
      console.error(`Failed to fetch data: ${error}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const intervalId = setInterval(() => fetchChartData(), 3500);
    return () => clearInterval(intervalId);
  }, [interval, symbol, selectedInterval]);

  // This useEffect handles the content regulation
  useEffect(() => {
    const hasCoinSubscription = findCategoryInIdentifiers(
      activeCoin.category_name,
      userInfo.entitlements,
    );
    setSubscribed(hasCoinSubscription);
    // setLoading(true);
    // setLastPrice(undefined);
  }, [activeCoin, userInfo]);

  const changeInterval = async newInterval => {
    setLoading(true);
    try {
      setSelectedInterval(newInterval);
      setChartData([]);
    } catch (error) {
      console.error(`Failed to change interval: ${error}`);
    }
  };


  return subscribed ? (
    <LinearGradient
      useAngle={true}
      angle={45}
      colors={isDarkMode ? ['#0A0A0A', '#0A0A0A'] : ['#F5F5F5', '#E5E5E5']}
      style={styles.flex}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={true}>
        {aboutVisible && (
          <AboutModal
            description={aboutDescription}
            onClose={handleAboutPress}
            visible={aboutVisible}
          />
        )}
        <CandlestickDetails
          loading={loading}
          coin={symbol}
          interval={selectedInterval}
          lastPrice={lastPrice}
          styles={styles}
          isPriceUp={isPriceUp}
        />
        <View style={styles.chartsWrapper}>
       
          <View style={styles.chartsRow}>
            <RsButton
              activeButtons={activeButtons}
              setActiveButtons={setActiveButtons}
            />
            <TimeframeSelector
              selectedInterval={selectedInterval}
              changeInterval={changeInterval}
              hasHourlyTimes={symbol.toLowerCase() === 'btcusdt'}
            />
          </View>
          <Chart
            symbol={symbol}
            selectedInterval={selectedInterval}
            chartData={chartData}
            loading={loading}
            activeButtons={activeButtons}
            coinBot={coinBot}
          />
        </View>

        <AlertMenu
          activeAlertOption={activeAlertOption}
          setActiveButtons={setActiveAlertOption}
        />
        <AlertListComponent
          timeframe={activeAlertOption}
          botName={coinBot}
          styles={styles}
        />
      </ScrollView>
    </LinearGradient>
  ) : (
    <LinearGradient
      useAngle={true}
      angle={45}
      colors={isDarkMode ? ['#0A0A0A', '#0A0A0A'] : ['#F5F5F5', '#E5E5E5']}
      style={{flex: 1}}>
      <UpgradeOverlay isBlockingByCoin={true} screen={'Charts'} />
    </LinearGradient>
  );
};

export default CandlestickChart;
