import React, {useState, useEffect, useContext} from 'react';
//var rnSecureStorage = require("rn-secure-storage");
//import secureLocalStorage from "react-secure-storage";
import rnSecureStorage from 'rn-secure-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  View,
  TextInput,
  Button,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  Appearance,
} from 'react-native';
import Logo from '../../../assets/images/AIAlphalogonew.png';
import CustomInput from '../CustomInput/CustomInput';
import CustomButton from '../CustomButton/CustomButton';
import Separator from '../CustomButton/Separator';
import SocialSignInButton from '../SocialButtons/SocialSignInButton';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import auth0 from '../auth0.js';
import Purchases from 'react-native-purchases';
import {useUser} from '../../../context/UserContext';
import {useUserId} from '../../../context/UserIdContext';
import jwtDecode from 'jwt-decode';
import {decode as base64decode} from 'base-64';
import {AppThemeContext} from '../../../context/themeContext';

const LoginForm = ({route}) => {
  const {height} = useWindowDimensions();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigation = useNavigation();
  const {setUserEmail} = useUser();
  const {setUserId} = useUserId();
  const [error, setError] = useState('');
  const colorScheme = Appearance.getColorScheme();
  const {toggleDarkMode} = useContext(AppThemeContext);

  useEffect(() => {
    if (colorScheme === 'dark') {
      toggleDarkMode();
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setUsername('');
      setPassword('');
      setError('');
    }, []),
  );

  useEffect(() => {
    const checkToken = async () => {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      const userEmail = await AsyncStorage.getItem('userEmail');

      if (accessToken && refreshToken) {
        setUserEmail(userEmail);
        navigation.navigate('HomeScreen');
      } else {
        navigation.navigate('SignIn');
      }
    };

    checkToken();
  }, []);

  function decodeJwt(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(base64decode(base64));
      return payload;
    } catch (error) {
      console.error('Failed to decode JWT:', error);
      return null;
    }
  }

  const onSignInPressed = async () => {
    try {
      console.log('jwtDecode:', jwtDecode);

      const credentials = await auth0.auth.passwordRealm({
        username: username,
        password: password,
        realm: 'Username-Password-Authentication',
        scope: 'openid profile email offline_access',
      });

      console.log('Logged in with Auth0:', credentials);

      if (credentials.idToken) {
        const decodedToken = decodeJwt(credentials.idToken);
        console.log('Decoded token: ', decodedToken);
        if (decodedToken) {
          const userId = decodedToken.sub;
          console.log('User ID:', userId);

          await AsyncStorage.setItem('accessToken', credentials.accessToken);
          await AsyncStorage.setItem('refreshToken', credentials.refreshToken);
          await AsyncStorage.setItem('userEmail', username);

          setUserEmail(username);
          setUserId(userId);

          navigation.navigate('HomeScreen');
        }
      }
    } catch (error) {
      console.log('Failed to log in with Auth0:', error);
      setError('Email or Password are incorrect');
    }
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPassword');
  };

  const onSignUpPressed = () => {
    navigation.navigate('SignUp');
  };

  const logout = async () => {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
    navigation.navigate('SignIn');
  };

  return (
    <ScrollView
      style={[
        styles.scrollview,
        {backgroundColor: colorScheme === 'dark' ? '#242427' : 'white'},
      ]}
      showsVerticalScrollIndicator={false}>
      <View
        style={[
          styles.root,
          {backgroundColor: colorScheme === 'dark' ? '#242427' : 'white'},
        ]}>
        <Image
          source={Logo}
          style={[styles.logo, {height: height * 0.3}]}
          resizeMode="contain"
        />
        <View style={styles.inputContainer}>
          <View style={styles.labelContainer}>
            <Text style={styles.title}>Email</Text>
            {error ? <Text style={styles.errorLabel}>{error}</Text> : null}
          </View>
          <CustomInput
            placeholder=" "
            value={username}
            setValue={setUsername}
          />
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.labelContainer}>
            <Text style={styles.title}>Password</Text>
            {error ? <Text style={styles.errorLabel}>{error}</Text> : null}
          </View>
          <CustomInput
            placeholder=" "
            value={password}
            setValue={setPassword}
            secureTextEntry={true}
          />
        </View>
        <CustomButton text="Sign In" onPress={onSignInPressed} type="PRIMARY" />
        <Separator />
        <SocialSignInButton />
        <CustomButton
          text="Forgot Password"
          onPress={onForgotPasswordPressed}
          type="TERTIARY"
        />
        <View style={styles.signUpContainer}>
          <Text
            style={[
              styles.signUpText,
              {color: colorScheme === 'dark' ? 'white' : 'black'},
            ]}>
            Don't have an account?{' '}
          </Text>
          <TouchableOpacity onPress={onSignUpPressed}>
            <Text style={styles.signUpButton}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    //backgroundColor: colorScheme === 'dark' ? '#242427' : 'white',
    padding: 20,
  },
  scrollview: {
    //backgroundColor: colorScheme === 'dark' ? '#242427' : 'white',
  },
  logo: {
    marginTop: 10,
    marginBottom: 10,
    width: '50%',
    maxHeight: 120,
    maxWidth: 220,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  errorLabel: {
    color: 'red',
    fontSize: 12,
    marginLeft: 8,
  },
  inputContainer: {
    alignSelf: 'stretch',
    marginBottom: 10,
  },
  title: {
    color: '#b8bbbd',
    textAlign: 'left',
    marginLeft: 0,
    fontWeight: 'bold',
  },
  signUpContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  signUpText: {},
  signUpButton: {
    color: '#fc5505',
    fontWeight: 'bold',
  },
});

export default LoginForm;
