import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import {ENTITLEMENT_ID} from '../../src/constants';
import Purchases from 'react-native-purchases';
import {useNavigation} from '@react-navigation/core';
import {useUser} from '../../context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAccountStyles from './styles';
import ThemeButton from '../ThemeButton/ThemeButton';
import {API_KEY} from '../../src/constants';
import {RevenueCatContext} from '../../context/RevenueCatContext';

const AccountItem = ({styles, option, handleItemTouch}) => {
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
        <View style={styles.rightArrowContainer}>
          <Image
            style={styles.rightArrow}
            source={require('../../assets/images/analysis/right-arrow.png')}
            resizeMode={'contain'}
          />
        </View>
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
  const {userEmail} = useUser();
  const navigation = useNavigation();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const {userInfo} = useContext(RevenueCatContext);

  console.log(userInfo);

  const options = [
    {
      name: 'Subscriptions',
      logo: require('../../assets/images/account/subscription.png'),
      screenName: 'Subscriptions',
    },
    {
      name: 'Log Out',
      logo: require('../../assets/images/account/logout.png'),
      screenName: null,
    },
    {
      name: 'Delete Account',
      logo: require('../../assets/images/account/deleteacc.png'),
      screenName: null,
    },
  ];

  const handleItemTouch = option => {
    switch (option.name) {
      case 'Log Out':
        handleLogout();
        break;
      case 'Delete Account':
        navigation.navigate('DeleteAccountScreen');
        break;
      case 'Subscriptions':
        navigation.navigate(option.screenName);
      default:
        console.log('Option not handled:', option.name);
    }
  };

  const getUserData = async () => {
    setIsAnonymous(await Purchases.isAnonymous());
    setUserId(await Purchases.getAppUserID());

    const purchaserInfo = await Purchases.getCustomerInfo();
    setSubscriptionActive(
      typeof purchaserInfo.entitlements.active[ENTITLEMENT_ID] !== 'undefined',
    );
    //await Purchases.identify(userId);

    const activeSubscriptions = Object.keys(purchaserInfo.entitlements.active);
    if (activeSubscriptions.length > 0) {
      setSubscriptionName(activeSubscriptions[0]); // Set the first active subscription name
    }
  };
  const resetLoginForm = () => {
    navigation.navigate('SignIn', {
      resetForm: () => {
        setUsername('');
        setPassword('');
        setUserEmail(null);
      },
    });
  };
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('refreshToken');
      await AsyncStorage.removeItem('userEmail');
      resetLoginForm();
      navigation.navigate('SignIn', {resetForm: true});
    } catch (e) {
      console.error('Logout failed', e);
    }
  };

  useEffect(() => {
    if (route.params?.userEmail) {
      setUserEmail(route.params.userEmail);
    }
    getUserData();
  }, []);

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

  // const formatUserEntitlements = entitlements => {
  //   let formattedString = 'Subscriptions: \n';
  //   for (const entitlement in entitlements) {
  //     formattedString.concat(entitlement.title);
  //   }
  //   return formattedString;
  // };

  return (
    <ScrollView style={styles.backgroundColor}>
      {/* <View style={styles.page}>
       <Text style={styles.headline}>Current User Identifier</Text>
       <Text style={styles.userIdentifier}>{userId}</Text>
       <Text style={styles.headline}>User Email</Text>
        <Text style={styles.userIdentifier}>{userEmail || 'Email not available'}</Text>
       <Text style={styles.headline}>Subscription Name</Text>
       <Text>{subscriptionName || 'No Active Subscription'}</Text>
       <Text style={styles.headline}>Subscription Status</Text>
       <Text style={{ color: subscriptionActive ? styles.greenColor : styles.redColor}}>
         {subscriptionActive ? 'Active' : 'Not Active'}
       </Text>
       <CustomButton text="Delete Account" onPress={() => navigation.navigate('DeleteAccountScreen')} />
       <CustomButton text="Log Out" onPress={handleLogout} />
       
     </View> */}

      <View style={styles.container}>
        <View style={styles.row}>
          {/* {isSubscribed && ( */}
          <View style={styles.alphaLogoContainer}>
            <Image
              source={require('../../assets/images/account/alphalogo.png')}
              resizeMode="contain"
              style={styles.image}
            />
          </View>
          {/* )} */}
          <Text style={styles.username}>
            {userEmail || 'User not available'}
          </Text>
        </View>
        {/* <View>
          <Button
        title="Click Me"
        onPress={Buy_now}
        />
        </View> */}
        <Text style={styles.headline}>User Subscriptions</Text>
        <Text style={styles.text}>
          {userInfo.entitlements.length > 0
            ? userInfo.entitlements.join('. \n')
            : 'There are no active subscriptions.'}
        </Text>
        {/* <Text style={styles.headline}>Subscription Status</Text>
        <Text
          style={[
            styles.text,
            subscriptionActive && {
              color: subscriptionActive ? styles.greenColor : styles.redColor,
            },
          ]}>
          {subscriptionActive ? 'Active' : 'Not Active'}
        </Text> */}
        <View style={styles.optionsContainer}>
          {options &&
            options.map((option, index) => (
              <AccountItem
                key={index}
                option={option}
                styles={styles}
                handleItemTouch={handleItemTouch}
              />
            ))}
          <ThemeButton />
        </View>
      </View>
    </ScrollView>
  );
};

export default Account;
