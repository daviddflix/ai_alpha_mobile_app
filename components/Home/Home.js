import React, {useContext, useState, useRef, useEffect} from 'react';
import {ScrollView, SafeAreaView} from 'react-native';
import TickerTape from './Tickertape/TickerTape';
import TopStories from './TopStories/topStories';
import Analysis from './Analysis/analysis';
import TopTenGainers from './TopTenGainers/TopTenGainers';
import useHomeStyles from './HomeStyles';
import AboutModal from './Topmenu/subMenu/Fund_news_chart/Fundamentals/AboutModal';
import LinearGradient from 'react-native-linear-gradient';
import {AppThemeContext} from '../../context/themeContext';
import {useScrollToTop} from '@react-navigation/native';
import NarrativeTradings from './HomeNarrativeTradings/NarrativeTradings';
import TopTenLosers from './Top10Losers/TopTenLosers';
import IntroductoryPopUpsOverlay from '../IntroductorySlides/IntroductoryPopUps/IntroductoryPopUpsOverlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRawUserId } from '../../context/RawUserIdContext';
import { RevenueCatContext } from '../../context/RevenueCatContext';
import Purchases, {LOG_LEVEL, PurchasesPackage} from 'react-native-purchases';


const Home = ({route}) => {
  const styles = useHomeStyles();
  const [aboutVisible, setAboutVisible] = useState(false);
  const [aboutDescription, setAboutDescription] = useState('');
  const [activePopUps, setActivePopUps] = useState(false);
  const {isDarkMode} = useContext(AppThemeContext);
  const { rawUserId } = useRawUserId();
  const { packages, purchasePackage, userInfo } = useContext(RevenueCatContext);


  const ref = useRef(null);




  useEffect(() => {
    const fetchUserData = async () => {
      const url = `https://aialpha.ngrok.io/user?auth0id=${rawUserId}`;
      try {
        const userFetch = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const userData = await userFetch.json();
        console.log("USER DATA IN HOME", userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    const fetchCustomerInfo = async () => {
      try {
        const customerInfo = await Purchases.getCustomerInfo();
        console.log("Customer info IN HOME:", customerInfo);
      } catch (error) {
        console.error("Error fetching customer info:", error);
      }
    };
    fetchUserData();
    fetchCustomerInfo();
  }, []);










  useEffect(() => {
    const checkShowIntroductoryPopUp = async () => {
      const popUpsData = await AsyncStorage.getItem('hasIntroduced');
      let shouldShowPopUp = popUpsData === 'false' ? true : false;
      setActivePopUps(shouldShowPopUp);
      await AsyncStorage.setItem('hasIntroduced', 'true');
    };
    checkShowIntroductoryPopUp();
  }, []);

  useScrollToTop(ref);

  const handleAboutPress = (description = null) => {
    if (description) {
      setAboutDescription(description);
    }
    setAboutVisible(!aboutVisible);
  };

  const handleActivePopUps = () => {
    setActivePopUps(false);
  };

  return (
    <LinearGradient
      useAngle={true}
      angle={45}
      colors={isDarkMode ? ['#0F0F0F', '#171717'] : ['#F5F5F5', '#E5E5E5']}
      locations={[0.22, 0.97]}
      style={styles.flex}>
      <SafeAreaView style={styles.container}>
        {aboutVisible && (
          <AboutModal
            description={aboutDescription}
            onClose={handleAboutPress}
            visible={aboutVisible}
          />
        )}
        {activePopUps && activePopUps !== undefined ? (
          <IntroductoryPopUpsOverlay
            handleActivePopUps={handleActivePopUps}
            visible={activePopUps}
          />
        ) : (
          <></>
        )}
        <ScrollView
          bounces={false}
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
          style={[styles.paddingH, styles.paddingB]}
          ref={ref}>
          <TickerTape />
          <TopStories handleAboutPress={handleAboutPress} />
          <Analysis handleAboutPress={handleAboutPress} />
          <NarrativeTradings handleAboutPress={handleAboutPress} />
          <TopTenGainers handleAboutPress={handleAboutPress} />
          <TopTenLosers handleAboutPress={handleAboutPress} />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Home;
