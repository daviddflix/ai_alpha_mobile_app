import { TopMenuContext, TopMenuContextProvider } from '../../../context/topMenuContext';
import React, { useContext, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Home from '../../Home/Home';
import Analysis from '../../Analysis/Analysis';
import Account from '../../Account/Account';
import Chatbot from '../../Chatbot/Chatbot';
import Alerts from '../../Alerts/alerts';
import Icon from 'react-native-vector-icons/FontAwesome';


const Tab = createBottomTabNavigator();

const HomeScreen = () => {

  const { updateActiveCoin } = useContext(TopMenuContext);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tab.Navigator
        initialRouteName={Home}
        screenOptions={{
          headerShown: false,
          tabBarStyle: { height: 65, justifyContent: 'center', alignItems: 'center' },
          tabBarActiveTintColor: '#FC5404'
        }}
      >
        <Tab.Screen
          name="Home"
          listeners={{
            tabPress: (e) => {
              updateActiveCoin({})
            },
          }}
          component={Home}
          options={{
            tabBarLabel: 'Home',
            tabBarLabelStyle: { marginBottom: 10 },
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Alerts"
          component={Alerts}
          options={{
            tabBarLabel: 'Alerts',
            tabBarLabelStyle: { marginBottom: 10 },
            tabBarIcon: ({ color, size }) => (
              <Icon name="bell-o" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Chatbot"
          component={Chatbot}
          options={{
            tabBarLabel: 'Chatbot',
            tabBarLabelStyle: { marginBottom: 10 },
            tabBarIcon: ({ color, size }) => (
              <Icon name="comment" color={color} size={size} />
            ),
          }}
        />

        <Tab.Screen
          name="Analysis"
          component={Analysis}
          options={{
            tabBarLabel: 'Analysis',
            tabBarLabelStyle: { marginBottom: 10 },
            tabBarIcon: ({ color, size }) => (
              <Icon name="bar-chart" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Account"
          component={Account}
          options={{
            tabBarLabel: 'Account',
            tabBarLabelStyle: { marginBottom: 10 },
            tabBarIcon: ({ color, size }) => (
              <Icon name="user" color={color} size={size} />
            ),
          }}
        />

      </Tab.Navigator>
    </GestureHandlerRootView>
  );
};

export default HomeScreen;






