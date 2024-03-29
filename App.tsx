import React, {useContext, useEffect, useState} from 'react';
import Navigation from './navigation/Navigation';
import {
  View,
  Button,
  Alert,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Platform,
  Appearance,
  Dimensions,
  Text,
  TouchableOpacity,
  Modal,
  Image,
} from 'react-native';
import {useAuth0, Auth0Provider} from 'react-native-auth0';
import Keys from 'react-native-keys';
import {TopMenuContextProvider} from './context/topMenuContext';
import {UserProvider} from './context/UserContext';
import {UserIdProvider} from './context/UserIdContext';
import {CategoriesContextProvider} from './context/categoriesContext';
import {AppThemeProvider} from './context/themeContext';
import SplashScreen from 'react-native-splash-screen';
import {RevenueCatProvider} from './context/RevenueCatContext';
import {AboutModalProvider} from './context/AboutModalContext';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {AnalysisContextProvider} from './context/AnalysisContext';
import NetInfo from "@react-native-community/netinfo";
import RNRestart from 'react-native-restart';
import useWebSocket, {ReadyState}  from 'react-native-use-websocket';
import ThemeButton from './components/ThemeButton/ThemeButton';
import {AppThemeContext} from './context/themeContext';


const App = () => {
  const colorScheme = Appearance.getColorScheme();
  const [barScheme, setBarScheme] = useState('default');
  const [isConnected, setIsConnected] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);



  useEffect(() => {
    if (Platform.OS === 'android') {
      SplashScreen.hide();
    }
    const bar_theme = colorScheme === 'dark' ? 'dark-content' : 'light-content';
    setBarScheme(bar_theme);
  }, []);



  useEffect(() => {

  const unsubscribe = NetInfo.addEventListener(state => {
    setIsConnected(state.isConnected);
    setModalVisible(!state.isConnected); // Show modal when not connected
    if (state.isConnected) {
      console.log("Connected to Internet");
    }
  });
  return () => {
    unsubscribe();
  };
}, []);

  

  const handleStatusBarChange = theme => {
    setBarScheme(theme);
  };
  const handleNotification = () => {
    console.log('Button pressed, sending notification...');
    PushNotificationIOS.addNotificationRequest({
      id: '1', // Unique ID for the notification
      title: 'Hello',
      body: 'This is a notification!',
      userInfo: {}, // Optional additional data
      fireDate: new Date().getTime() + 1000, // Ensures the notification is scheduled for immediate delivery
    });
  };

  return (
    <Auth0Provider
      domain={'dev-zoejuo0jssw5jiid.us.auth0.com'}
      clientId={'K5bEigOfEtz4Devpc7kiZSYzzemPLIlg'}>
      <RevenueCatProvider>
        <UserProvider>
          <UserIdProvider>
            <AppThemeProvider>
              <SafeAreaView
                style={[
                  styles.container,
                  {
                    backgroundColor:
                      colorScheme === 'dark' ? '#0A0A0A' : '#EDEDED',
                  },
                ]}>
                <StatusBar barStyle={barScheme} />
                <CategoriesContextProvider>
                  <TopMenuContextProvider>
                    <AnalysisContextProvider>
                      <AboutModalProvider>
                        <Navigation />
                        {/* <View >
                        <Button title="Trigger Notification" onPress={handleNotification} />
                      </View>
                      */}
                      <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                        setModalVisible(false);
                      }}>
                        <View style={styles.centeredView}>
                          <View style={[styles.orangeBox, {backgroundColor:
                              colorScheme === 'dark' ? '#451205' : '#FFF7EC'},]}>
                            <View style={styles.row}>
                              <Image source={require('./assets/images/login/nointernet.png')} style={styles.imageStyle1} />
                              <Text style={[styles.labelText1,{
                                  color:
                                  colorScheme === 'dark' ? '#FF8D34' : '#FF6C0D',
                              },]}>It seems that you are offline.</Text>
                            </View>
                            <View style={styles.row}>
                              <Image source={require('./assets/images/login/reloadsymbol.png')} style={styles.imageStyle2} />
                              <TouchableOpacity onPress={() => RNRestart.restart()}>
                              <Text style={styles.labelText2}>Reload</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      </Modal>
                    </AboutModalProvider>
                    </AnalysisContextProvider>
                  </TopMenuContextProvider>
                </CategoriesContextProvider>
              </SafeAreaView>
            </AppThemeProvider>
          </UserIdProvider>
        </UserProvider>
      </RevenueCatProvider>
    </Auth0Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 0 : StatusBar.currentHeight,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  orangeBox: {
    top: '30%',
    width: '98%',
    backgroundColor: '#FFF7EC',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column', // Changed to stack rows vertically
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center', // Ensures content within the row is centered
    alignItems: 'center',
    paddingVertical: 5, // Adds vertical padding between rows
  },
  imageStyle1: {
    width: 35,
    height: 28,
    marginRight: 30, 
  },
  imageStyle2: {
    width: 20,
    height: 20,
    marginRight: 10, 
  },
  labelText1: {
    color: '#FF6C0D',
    fontSize: 16,
    marginRight: 60,
    fontFamily: 'Prompt',
  },
  labelText2: {
    color: '#FF6C0D',
    fontSize: 16,
    textDecorationLine: 'underline',
    fontFamily: 'Prompt',
    fontWeight: '500',
  },
});
