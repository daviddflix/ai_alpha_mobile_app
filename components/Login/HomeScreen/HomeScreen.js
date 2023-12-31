import {
  TopMenuContext,
  TopMenuContextProvider,
} from '../../../context/topMenuContext';
import React, {useContext, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Home from '../../Home/Home';
import Analysis from '../../Analysis/Analysis';
import Account from '../../Account/Account';
import Chatbot from '../../Chatbot/Chatbot';
import Alerts from '../../Alerts/Alerts';
import {Image, View} from 'react-native';
import styles from './HomeScreenStyles';
import HomeStackScreen from '../../Home/HomeStack';
import {AppThemeContext} from '../../../context/themeContext';
import AnalysisScreen from '../../Analysis/AnalysisStack';

const Tab = createBottomTabNavigator();

const MenuIcon = ({color, iconSource}) => {
  return (
    <View style={styles.iconContainer}>
      <Image
        style={[styles.icon, {tintColor: color}]}
        resizeMode={'contain'}
        source={iconSource}
      />
    </View>
  );
};

const HomeScreen = () => {
  const {updateActiveCoin} = useContext(TopMenuContext);
  const {theme} = useContext(AppThemeContext);
  return (
    <GestureHandlerRootView style={{flex: 1,}}>
      <Tab.Navigator
        initialRouteName={Home}
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 70,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.navbarBgColor,
            border: 'none',
          },
          tabBarActiveTintColor: theme.activeOrange,
          tabBarLabelStyle: {
            marginBottom: 10,
            fontSize: theme.responsiveFontSize * 0.8,
            fontWeight: 'bold',
          },
        }}>
        <Tab.Screen
          name="Home"
          listeners={{
            tabPress: e => {
              updateActiveCoin({});
            },
          }}
          component={HomeStackScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({focused, color, size}) => (
              <MenuIcon
                color={color}
                iconSource={
                  focused
                    ? require('../../../assets/images/bottomMenu/home-active.png')
                    : require('../../../assets/images/bottomMenu/home.png')
                }
              />
            ),
          }}
        />
        <Tab.Screen
          name="Alerts"
          component={Alerts}
          options={{
            tabBarLabel: 'Alerts',
            tabBarIcon: ({focused, color, size}) => (
              <MenuIcon
                color={color}
                iconSource={
                  focused
                    ? require('../../../assets/images/bottomMenu/alerts-active.png')
                    : require('../../../assets/images/bottomMenu/alerts.png')
                }
              />
            ),
          }}
        />
        <Tab.Screen
          name="Chatbot"
          component={Chatbot}
          options={{
            tabBarLabel: 'Chatbot',
            tabBarIcon: ({focused, color, size}) => (
              <MenuIcon
                color={color}
                iconSource={
                  focused
                    ? require('../../../assets/images/bottomMenu/chatbot-active.png')
                    : require('../../../assets/images/bottomMenu/chatbot.png')
                }
              />
            ),
          }}
        />

        <Tab.Screen
          name="Analysis"
          component={AnalysisScreen}
          options={{
            tabBarLabel: 'Analysis',
            tabBarIcon: ({focused, color, size}) => (
              <MenuIcon
                color={color}
                iconSource={
                  focused
                    ? require('../../../assets/images/bottomMenu/analysis-active.png')
                    : require('../../../assets/images/bottomMenu/analysis.png')
                }
              />
            ),
          }}
        />
        <Tab.Screen
          name="Account"
          component={Account}
          options={{
            tabBarLabel: 'Account',
            tabBarIcon: ({focused, color, size}) => (
              <MenuIcon
                color={color}
                iconSource={
                  focused
                    ? require('../../../assets/images/bottomMenu/account-active.png')
                    : require('../../../assets/images/bottomMenu/account.png')
                }
              />
            ),
          }}
        />
      </Tab.Navigator>
    </GestureHandlerRootView>
  );
};

export default HomeScreen;
