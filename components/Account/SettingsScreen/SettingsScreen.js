import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Button,
  SafeAreaView,
  Alert,
} from 'react-native';
import {
  auth0Domain,
  auth0DeleteAccount_Client,
  auth0DeleteAccount_Secret,
  auth0ManagementAPI_Client,
  auth0ManagementAPI_Secret,
} from '../../../src/constants';
import auth0 from '../../Login/auth0';
import {useNavigation} from '@react-navigation/core';
import {useUser} from '../../../context/UserContext';
import {useUserId} from '../../../context/UserIdContext';
import {useRawUserId} from '../../../context/RawUserIdContext';
import useSettingsScreenStyles from './SettingsScreenStyles';
import ThemeButton from '../../ThemeButton/ThemeButton';
import BackButton from '../../Analysis/BackButton/BackButton';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RevenueCatContext} from '../../../context/RevenueCatContext';
import RNRestart from 'react-native-restart';

const SettingsItem = ({
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
              source={require('../../../assets/images/analysis/right-arrow.png')}
              resizeMode={'contain'}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const SettingsScreen = ({route}) => {
  const styles = useSettingsScreenStyles();
  const navigation = useNavigation();
  // Below are the state variables that come from the previous DeleteUserForm
  const [isProcessing, setIsProcessing] = useState(false);
  const {userId, setUserId} = useUserId();
  const {userEmail} = useUser();
  const {rawUserId, setRawUserId} = useRawUserId();
  const {restorePurchases} = useContext(RevenueCatContext);

  const options = [
    {
      name: 'Dark Mode',
      logo: require('../../../assets/images/account/darkmode.png'),
      screenName: null,
      component: <ThemeButton />,
    },
    {
      name: 'Restore Purchases',
      logo: require('../../../assets/images/account/restorepurchases.png'),
      screenName: null,
      component: null,
    },
    {
      name: 'My Packages',
      logo: require('../../../assets/images/account/currentpackages.png'),
      screenName: null,
      component: null,
    },
    {
      name: 'Personalise Profile',
      logo: require('../../../assets/images/account/personalise-profile.png'),
      screenName: null,
      component: null,
    },
    {
      name: 'Delete Account',
      logo: require('../../../assets/images/account/delete-account.png'),
      screenName: null,
      component: null,
    },
  ];

  // Elements from previous 'DeleteUserForm'

  const getDeleteApiToken = async () => {
    const response = await fetch(`https://${auth0Domain}/oauth/token`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        client_id: auth0DeleteAccount_Client,
        client_secret: auth0DeleteAccount_Secret,
        audience: `https://${auth0Domain}/api/v2/`,
        grant_type: 'client_credentials',
      }),
    });
    const data = await response.json();
    return data.access_token;
  };

  const getManagementApiToken = async () => {
    const response = await fetch(`https://${auth0Domain}/oauth/token`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        client_id: auth0ManagementAPI_Client,
        client_secret: auth0ManagementAPI_Secret,
        audience: `https://${auth0Domain}/api/v2/`,
        grant_type: 'client_credentials',
      }),
    });
    const data = await response.json();
    return data.access_token;
  };

  const resetLoginForm = () => {
    navigation.navigate('SignIn', {
      resetForm: () => {
        setUsername('');
        setPassword('');
        setUserId('');
        setRawUserId('');
        setUserEmail(null);
        setFullName('');
        setUsername('');
        setBirthDate('');
        setIsEditing(null);
      },
    });
  };

  const deleteUserAccount = async () => {
    setIsProcessing(true);
    try {
      const deleteToken = await getDeleteApiToken();
      const token = await getManagementApiToken();

      console.log('User id: ', {userId});
      console.log('User email: ', {userEmail});
      console.log('token: ', token);
      console.log(
        'url: ',
        `https://${auth0Domain}/api/v2/users/auth0|${encodeURIComponent(
          userId,
        )}`,
      );

      let prefix;

      if (rawUserId.startsWith('apple')) {
        prefix = '';
      } else {
        prefix = 'auth0|';
      }

      console.log('prefix: ', prefix);
      console.log('user idddd: ', userId);

      console.log(
        'url: ',
        `https://${auth0Domain}/api/v2/users/${encodeURIComponent(rawUserId)}`,
      );

      const userFetch = await fetch(
        `https://${auth0Domain}/api/v2/users/${encodeURIComponent(rawUserId)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log('user fetch: ', userFetch);
      const userData = await userFetch.json();
      console.log('User Data!!:', userData);

      const response = await fetch(
        `https://${auth0Domain}/api/v2/users/${encodeURIComponent(rawUserId)}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${deleteToken}`,
          },
        },
      );

      if (response.ok) {
        console.log('Account deletion initiated');
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('refreshToken');
        await AsyncStorage.removeItem('userEmail');
        await AsyncStorage.removeItem('userId');
        await AsyncStorage.removeItem('rawUserId');
        await AsyncStorage.removeItem('fullName');
        await AsyncStorage.removeItem('username');
        await AsyncStorage.removeItem('birthDate');
        resetLoginForm();
        RNRestart.restart();
        //navigation.navigate('SignIn', {resetForm: true});
      } else {
        throw new Error('Account deletion failed');
      }
    } catch (error) {
      console.error('Failed to delete account:', error);
      Alert.alert('Error', 'Account deletion failed. Please try again later.');
    }
    setIsProcessing(false);
  };

  const handleDeleteAccount = async () => {
    try {
      console.log('User id: ', {userId});
      console.log('User email: ', {userEmail});
      console.log('Raw user ID: ', rawUserId);

      // Case for Username-Password users
      try {
        console.log('starting');
        let isUsernamePasswordAuthenticationUser = false;

        if (rawUserId && rawUserId.startsWith('auth0|')) {
          isUsernamePasswordAuthenticationUser = true;
        }
        console.log(
          'isUsernamePasswordAuthenticationUser ->',
          isUsernamePasswordAuthenticationUser,
        );

        if (isUsernamePasswordAuthenticationUser) {
          console.log('Entered true line of auth type!');
          Alert.prompt(
            'Delete Account',
            'Enter your password to delete your account',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'Delete',
                onPress: async enteredPassword => {
                  try {
                    const credentials = await auth0.auth.passwordRealm({
                      username: userEmail,
                      password: enteredPassword,
                      realm: 'Username-Password-Authentication',
                      scope: 'openid profile email offline_access',
                    });

                    console.log('got credentials');

                    if (credentials.idToken) {
                      Alert.alert(
                        'Delete Account',
                        'Are you sure you want to permanently delete your account? This action cannot be undone and all your information will be eliminated from our servers.',
                        [
                          {text: 'Cancel', style: 'cancel'},
                          {text: 'Delete', onPress: deleteUserAccount},
                        ],
                      );
                    }
                  } catch (error) {
                    Alert.alert(
                      'Wrong Password',
                      'Please enter the correct password.',
                    );
                    console.log('Failed to authenticate:', error);
                  }
                },
              },
            ],
            'secure-text',
          );
        } else {
          // Case for Google/Apple users
          console.log('Entered false line of auth type!');
          console.log('Will proceed in passwordless delete process');
          Alert.alert(
            'Delete Account',
            'Are you sure you want to permanently delete your account? This action cannot be undone.',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'Delete', onPress: deleteUserAccount},
            ],
          );
        }
      } catch (error) {
        // Case for Apple users that don't provide an email
        console.log('Entered error catch');
      }
    } catch (error) {
      // Handle errors from the outer try block
      console.log('Error in main try:', error);
    }
  };

  // Restore purchases handles

  const handleRestorePurchase = () => {
    Alert.alert(
      'Restore Purchases',
      'Warning: This must only be activated when your previous account is lost, as all subscriptions will be removed from the previous account.',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Restore', onPress: restorePurchases},
      ],
    );
  };

  // Switch case for 'options' array

  const handleItemTouch = option => {
    switch (option.name) {
      case 'Dark Mode':
        break;
      case 'Delete Account':
        handleDeleteAccount();
        break;
      case 'Restore Purchases':
        handleRestorePurchase();
        break;
      case 'My Packages':
        navigation.navigate('CurrentPackages');
        break;
      case 'Personalise Profile':
        navigation.navigate('PersonaliseProfile');
        break;
      default:
        console.log('Option not handled:', option.name);
    }
  };

  return (
    <SafeAreaView style={styles.backgroundColor}>
      <ScrollView style={[styles.backgroundColor, styles.paddingV]}>
        <View style={styles.backButtonContainer}>
          <BackButton />
        </View>
        <Text style={styles.title}>Settings</Text>
        <View style={styles.container}>
          <View style={styles.optionsContainer}>
            {options &&
              options.map((option, index) => (
                <SettingsItem
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
    </SafeAreaView>
  );
};

export default SettingsScreen;
