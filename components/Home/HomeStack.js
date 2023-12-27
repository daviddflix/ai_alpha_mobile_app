import React, {useContext, useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Home';
import Fundamentals from './Topmenu/subMenu/Fund_news_chart/Fundamentals/Fundamentals';
import TopMenu from './Topmenu/mainMenu/topmenu';
import SubMenu from './Topmenu/subMenu/SubMenu';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import CandlestickChart from './Topmenu/subMenu/Fund_news_chart/Charts';
import NewsComponent from './Topmenu/subMenu/Fund_news_chart/News';
import {TopMenuContext} from '../../context/topMenuContext';
import {ScrollView, Text, View} from 'react-native';

const HomeStack = createNativeStackNavigator();
const TopmenuStack = createNativeStackNavigator();
const SubMenuStack = createMaterialTopTabNavigator();
const NewsStack = createNativeStackNavigator();

const ChartScreen = () => {
  return (
    <View>
      <Text>Charts</Text>
    </View>
  );
};

// Change this with the respective newsArticle component, remember to receive the props like its done below, obtaining it from the route prop.
const NewsArticle = ({route}) => {
  const item = route.params.item;
  return (
    <ScrollView>
      <Text>Title: {item.title}</Text>
      <Text>News id:{item.article_id}</Text>
      <Text>Summary: {item.summary}</Text>
    </ScrollView>
  );
};

const NewsScreen = () => {
  const {activeSubCoin} = useContext(TopMenuContext);
  return (
    <NewsStack.Navigator
      initialRouteName="NewsMain"
      backBehavior={'none'}
      screenOptions={{headerShown: false}}>
      {/* Replace NewsMain with NewsComponent */}
      <NewsStack.Screen
        name="NewsMain"
        component={NewsComponent}
        initialParams={{botname: activeSubCoin}}
      />
      <NewsStack.Screen name="NewsArticle" component={NewsArticle} />
    </NewsStack.Navigator>
  );
};

const SubMenuScreen = () => {
  const {activeSubCoin} = useContext(TopMenuContext);
  return (
    <SubMenuStack.Navigator
      initialRouteName="Charts"
      backBehavior={'none'}
      screenOptions={{
        swipeEnabled: false,
        tabBarShowLabel: true,
        tabBarShowIcon: true,
        tabBarActiveTintColor: '#E6007A',
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: 'bold',
        },
        tabBarStyle: {
          backgroundColor: '#F7F7F7',
          borderRadius: 5,
        },
        tabBarIndicatorStyle: {
          backgroundColor: '#E6007A',
          height: 4,
        },
        tabBarGap: 10,
        tabBarPressColor: '#E6007A10',
      }}>
      <SubMenuStack.Screen name="Fundamentals" component={Fundamentals} />
      <SubMenuStack.Screen
        name="Charts"
        component={CandlestickChart}
        initialParams={{
          interval: '1h',
          symbol: `${activeSubCoin}USDT`,
          coinBot: activeSubCoin,
        }}
        // Replace the component prop with the correct component, passing the props that it needs with the initialParams prop, structuring it the way that is right before this comment. I tried to do it the way that was before but throws an error with the request so you may fix that.
        // component={ChartScreen}
      />
      <SubMenuStack.Screen name="News" component={NewsScreen} />
    </SubMenuStack.Navigator>
  );
};

const TopmenuScreen = () => {
  return (
    <TopmenuStack.Navigator
      initialRouteName={'SubMenuScreen'}
      backBehavior="initialRoute"
      screenOptions={{
        header: () => <SubMenu />,
      }}>
      <TopmenuStack.Screen name="SubMenuScreen" component={SubMenuScreen} />
    </TopmenuStack.Navigator>
  );
};

const HomeStackScreen = () => {
  const {updateActiveCoin} = useContext(TopMenuContext);

  return (
    <HomeStack.Navigator
      initialRouteName="InitialHome"
      backBehavior="initialRoute"
      screenOptions={{header: () => <TopMenu />}}>
      <HomeStack.Screen
        name="InitialHome"
        component={Home}
        listeners={{
          focus: e => {
            updateActiveCoin({});
          },
        }}
      />
      <HomeStack.Screen name="TopMenuScreen" component={TopmenuScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
