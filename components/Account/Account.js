import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Button,
  SafeAreaView,
} from 'react-native';
import Purchases from 'react-native-purchases';
import {useNavigation} from '@react-navigation/core';
import {useUser} from '../../context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAccountStyles from './styles';
import ThemeButton from '../ThemeButton/ThemeButton';
import {API_KEY} from '../../src/constants';
import {RevenueCatContext} from '../../context/RevenueCatContext';
import {NOTIFICATIONS_MOCK} from './NotificationsPanel/notificationsMock';
import LinearGradient from 'react-native-linear-gradient';
import {AppThemeContext} from '../../context/themeContext';
import useWebSocket from 'react-native-use-websocket';

const AccountItem = ({
  styles,
  option,
  handleItemTouch,
  itemComponent = null,
}) => {
  return (
    <TouchableOpacity onPress={() => handleItemTouch(option)}>
      <View style={styles.itemContainer}>
        <View style={styles.itemLogoContainer}>
          <Image
            source={option.logo}
            resizeMode="contain"
            style={styles.itemLogo}
          />
        </View>
        <Text style={styles.itemName}>{option.name}</Text>
        {itemComponent !== null ? (
          itemComponent
        ) : (
          <View style={styles.rightArrowContainer}>
            <Image
              style={styles.rightArrow}
              source={require('../../assets/images/analysis/right-arrow.png')}
              resizeMode={'contain'}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const Account = ({route}) => {
  const styles = useAccountStyles();
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [userId, setUserId] = useState(null);
  const [subscriptionActive, setSubscriptionActive] = useState(false);
  const [subscriptionName, setSubscriptionName] = useState('');
  const {userEmail, setUserEmail} = useUser();
  const navigation = useNavigation();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const {userInfo} = useContext(RevenueCatContext);
  const {isDarkMode} = useContext(AppThemeContext);

  console.log(userInfo);
  // Account menu!!
  const options = [
    {
      name: 'Subscriptions Options',
      logo: require('../../assets/images/account/subscription.png'),
      screenName: 'Subscriptions',
      component: null,
    },
    {
      name: 'Legal and Information',
      logo: require('../../assets/images/account/informationicon.png'),
      screenName: null,
      component: null,
    },
    {
      name: 'Notifications',
      logo: require('../../assets/images/account/notifications.png'),
      screenName: 'Notifications',
      component: null,
    },
    {
      name: 'Settings',
      logo: require('../../assets/images/account/settingsscreenicon.png'),
      screenName: null,
      component: null,
    },
    {
      name: 'Log Out',
      logo: require('../../assets/images/account/logout.png'),
      screenName: null,
      component: null,
    },
  ];
  

  const handleItemTouch = option => {
    switch (option.name) {
      case 'Log Out':
        handleLogout();
        break;
      case 'Settings':
        navigation.navigate('SettingsScreen');
        break;
      case 'Subscriptions Options':
        navigation.navigate(option.screenName);
        break;
      case 'Legal and Information':
        navigation.navigate('Legal');
        break;
      case 'Notifications':
        navigation.navigate('Notifications', {options: NOTIFICATIONS_MOCK});
        break;
      default:
        console.log('Option not handled:', option.name);
    }
  };

  // const getUserData = async () => {
  //   setIsAnonymous(await Purchases.isAnonymous());
  //   setUserId(await Purchases.getAppUserID());

  //   const purchaserInfo = await Purchases.getCustomerInfo();
  //   setSubscriptionActive(
  //     typeof purchaserInfo.entitlements.active[ENTITLEMENT_ID] !== 'undefined',
  //   );
  //   //await Purchases.identify(userId);

  //   const activeSubscriptions = Object.keys(purchaserInfo.entitlements.active);
  //   if (activeSubscriptions.length > 0) {
  //     setSubscriptionName(activeSubscriptions[0]); // Set the first active subscription name
  //   }
  // };

  const resetLoginForm = () => {
    navigation.navigate('SignIn', {
      resetForm: () => {
        setUsername('');
        setPassword('');
        setUserId('');
        setUserEmail(null);
      },
    });
  };
  const handleLogout = async () => {
    try {
      console.log("Logged out")
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('refreshToken');
      await AsyncStorage.removeItem('userEmail');
      await AsyncStorage.removeItem('userId');
      await AsyncStorage.removeItem('loginMethod');
      resetLoginForm();
      navigation.navigate('SignIn', {resetForm: true});
    } catch (e) {
      console.error('Logout failed', e);
    }
  };

  // useEffect(() => {
  //   if (route.params?.userEmail) {
  //     setUserEmail(route.params.userEmail);
  //   }
  //   getUserData();
  // }, []);

  // useEffect(() => {
  //   Purchases.addCustomerInfoUpdateListener(getUserData);
  //   return () => {
  //     Purchases.removeCustomerInfoUpdateListener();
  //   };
  // }, []);

  // useEffect(() => {
  //   Purchases.setLogLevel(Purchases.LOG_LEVEL.VERBOSE);
  //   if (Platform.OS === 'ios') {
  //     Purchases.configure({apiKey: API_KEY});
  //   } else if (Platform.OS === 'android') {
  //     //Purchases.configure({apiKey: ANDROID_API_KEY});
  //   }
  // }, []);
  // console.log('Entitlement id: ', ENTITLEMENT_ID);
  // async function Buy_now() {
  //   try {
  //     // Get offerings
  //     const offerings = await Purchases.getOfferings();
  //     // Check if the desired package is available
  //     const packageIdentifier = 'packageIdentifier_product_id';
  //     const availablePackages =
  //       offerings.all['Bitcoin_4999_m1'].availablePackages;
  //     if (availablePackages.length !== 0) {
  //       // Display packages for sale (you can customize this part based on your UI)
  //       // For simplicity, let's assume you want to purchase the first available package
  //       const selectedPackage = availablePackages[0];
  //       // Make the purchase
  //       const {customerInfo, productIdentifier} =
  //         await Purchases.purchasePackage(selectedPackage);
  //       // Check if the entitlement is active
  //       const entitlementIdentifier = 'Bitcoin_4999_m1';
  //       if (
  //         customerInfo.entitlements.active[entitlementIdentifier] !== undefined
  //       ) {
  //         console.log(':white_check_mark: PURCHASE SUCCESSFUL');
  //         // Do something after a successful purchase
  //         setIsSubscribed(true);
  //         console.log(isSubscribed);
  //       }
  //     }
  //   } catch (error) {
  //     if (!error.userCancelled) {
  //       console.error('PURCHASE FAILED', error);
  //       // Handle error (show an error message, etc.)
  //     }
  //   }
  // }

  /*Solution1.
import { Purchases } from 'react-native-purchases';
async function Buy_now() {
  try {
    const offerings = await Purchases.getOfferings();
    if (offerings.all["offering_name"].availablePackages.length !== 0) {
      const {customerInfo, productIdentifier} = await Purchases.purchasePackage(offerings.all["offering_name"].availablePackages[0]);
      if (typeof customerInfo.entitlements.active['offering_name'] !== "undefined") {
        console.log(":white_check_mark: PURCHASE SUCCESSFUL");
      }
    }
  } catch (e) {
    console.log("PURCHASE FAILED");
    if (!e.userCancelled) {
      showError(e);
    }
  }
}
Solution2
import { Purchases } from 'react-native-purchases';
async function Buy_now() {
  try {
    const offerings = await Purchases.getOfferings();
    if (offerings.all["offering_name"].availablePackages.length !== 0) {
      const {customerInfo, productIdentifier} = await Purchases.purchasePackage(offerings.all["offering_name"].availablePackages[0]);
      if (typeof customerInfo.entitlements.active['offering_name'] !== "undefined") {
        console.log(":white_check_mark: PURCHASE SUCCESSFUL");
      }
    }
  } catch (e) {
    console.log("PURCHASE FAILED");
    if (!e.userCancelled) {
      showError(e);
    }
  }
}
Solution3
import Purchases from 'react-native-purchases';
async function Buy_now() {
  try {
    // Get offerings
    const offerings = await Purchases.getOfferings();
    // Check if the desired package is available
    const packageIdentifier = "packageIdentifier_product_id";
    const availablePackages = offerings.all["experiment_group"].availablePackages;
    if (availablePackages.length !== 0) {
      // Display packages for sale (you can customize this part based on your UI)
      // For simplicity, let's assume you want to purchase the first available package
      const selectedPackage = availablePackages[0];
      // Make the purchase
      const { customerInfo, productIdentifier } = await Purchases.purchasePackage(selectedPackage);
      // Check if the entitlement is active
      const entitlementIdentifier = "entitlement_name";
      if (customerInfo.entitlements.active[entitlementIdentifier] !== undefined) {
        console.log(":white_check_mark: PURCHASE SUCCESSFUL");
        // Do something after a successful purchase
      }
    }
  } catch (error) {
    if (!error.userCancelled) {
      console.error("PURCHASE FAILED", error);
      // Handle error (show an error message, etc.)
    }
  }
}
*/

  const formatUserEntitlements = entitlements => {
    let formattedString = '';

    userInfo.entitlements.forEach(entitlement => {
      let first_separator = entitlement.indexOf('_');
      let coin_name = entitlement.slice(0, first_separator);
      formattedString += coin_name;
      formattedString += '\n';
    });
    return formattedString;
  };

  return (
    <SafeAreaView style={styles.backgroundColor}>
      <LinearGradient
        useAngle={true}
        angle={45}
        colors={isDarkMode ? ['#0A0A0A', '#0A0A0A'] : ['#F5F5F5', '#E5E5E5']}
        style={styles.gradient}>
        <ScrollView style={styles.backgroundColor}>
          <View style={styles.container}>
            <View style={styles.alphaLogoContainer}>
              <Image
                source={require('../../assets/images/account/alphalogo.png')}
                resizeMode="contain"
                style={styles.image}
              />
            </View>
            <Text style={styles.username}>
              {userEmail || ' '}
            </Text>
            <View style={styles.optionsContainer}>
              {options &&
                options.map((option, index) => (
                  <AccountItem
                    key={index}
                    option={option}
                    styles={styles}
                    handleItemTouch={handleItemTouch}
                    itemComponent={option.component && option.component}
                  />
                ))}
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Account;
