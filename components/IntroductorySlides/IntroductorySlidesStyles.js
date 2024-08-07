import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../context/themeContext';

const useIntroductorySlidesStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    sectionContainer: {
      flex: 1,
      width: theme.width,
      height: theme.height,
      backgroundColor: '#171717',
    },
    slide: {
      flex: 1,
      width: theme.width,
      height: theme.height,
      padding: 20,
      alignSelf: 'center',
      alignItems: 'center',
    },
    mainImage: {
      width: 350,
      height: 200,
    },
    contentContainer: {
      width: '100%',
      marginVertical: 16,
      padding: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      textAlign: 'center',
      alignSelf: 'center',
      fontFamily: theme.fontMedium,
      fontSize: 25,
      lineHeight: 30,
      color: '#FFFFFF',
    },
    subtitle: {
      marginVertical: 6,
      fontFamily: theme.fontSemibold,
      fontSize: 14,
      color: '#FAFAFA',
      textAlign: 'center',
      alignSelf: 'center',
    },
    informationItem: {
      width: '100%',
      marginVertical: 4,
      flexDirection: 'row',
      alignItems: 'center',
    },
    informationIcon: {
      width: 35,
      height: 30,
      marginHorizontal: 4,
      tintColor: '#FC5404',
      alignSelf: 'flex-start',
    },
    informationText: {
      fontSize: 14,
      fontFamily: theme.font,
      color: '#FAFAFA',
      textAlign: 'left',
      alignSelf: 'center',
    },
    boldInformativeText: {
      width: '100%',
      marginTop: 24,
      marginBottom: 12,
      fontFamily: theme.fontSemibold,
      fontSize: 16,
      color: '#FF6C0D',
      alignSelf: 'center',
      textAlign: 'center',
    },
    skipButton: {
      width: '100%',
      alignSelf: 'center',
      fontFamily: theme.font,
      color: '#A3A3A3',
      fontSize: 10,
      textAlign: 'center',
    },
    carouselContainer: {
      flex: 1,
      width: '100%',
    },
    carouselScrollView: {
      flex: 1,
      width: '100%',
    },
    pagination: {
      flexDirection: 'row',
      position: 'absolute',
      bottom: 12,
      paddingVertical: 4,
      paddingHorizontal: 12,
      alignSelf: 'center',
      alignItems: 'center',
      borderRadius: 15,
      backgroundColor: '#525252',
    },
    dot: {
      height: 5,
      width: 5,
      borderRadius: 2.5,
      backgroundColor: '#A3A3A3',
      margin: 6,
    },
    activeDot: {
      height: 9,
      width: 9,
      borderRadius: 4.5,
      backgroundColor: '#FFFFFF',
    },
    exploreButton: {
      width: '100%',
      marginTop: 32,
      padding: 8,
      alignItems: 'center',
      borderRadius: 4,
    },
    buttonText: {
      fontSize: 16,
      fontFamily: theme.fontSemibold,
      color: '#FAFAFA',
      textAlign: 'center',
    },
    popUpModal: {
      position: 'relative',
      width: '100%',
      marginTop: 20,
      paddingVertical: 10,
      backgroundColor: '#262626',
      borderRadius: 2,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'visible',
    },
    popUpTitle: {
      fontFamily: theme.fontSemibold,
      color: '#FAFAFA',
      fontSize: 14,
      textAlign: 'center',
    },
    popUpText: {
      marginTop: 4,
      marginBottom: 16,
      marginHorizontal: 16,
      fontFamily: theme.font,
      color: '#FAFAFA',
      lineHeight: 22,
      fontSize: 14,
      textAlign: 'center',
    },
    row: {
      width: '100%',
      flexDirection: 'row',
    },
    popUpSkip: {
      marginLeft: 20,
      textAlign: 'left',
      alignSelf: 'flex-start',
      color: '#A3A3A3',
      fontFamily: theme.font,
      fontSize: 10,
    },
    popUpNext: {
      textAlign: 'right',
      position: 'absolute',
      right: 20,
      alignSelf: 'flex-end',
      color: '#FF6C0D',
      fontFamily: theme.font,
      fontSize: 14,
    },
    popUpDot: {
      width: 3,
      height: 3,
      margin: 2,
      borderRadius: 1.5,
      backgroundColor: '#A3A3A3',
    },
    popUpActiveDot: {
      width: 7,
      height: 7,
      borderRadius: 3.5,
    },
    dotsContainer: {
      position: 'absolute',
      flexDirection: 'row',
      bottom: 10,
      left: '45%',
    },
    triangle: {
      position: 'absolute',
      left: 150,
      width: 24,
      height: 24,
      tintColor: '#262626',
    },
    popUpsOverlay: {
      position: 'relative',
      width: '100%',
      paddingHorizontal: 12,
      height: theme.height,
      backgroundColor: 'rgba(10,10,10,0.6)',
      zIndex: 1000,
    },
    subscribePopUpsButton: {
      width: '80%',
      marginVertical: 12,
      paddingVertical: 6,
      paddingHorizontal: 24,
      alignItems: 'center',
      backgroundColor: '#FF6C0D',
      borderRadius: 4,
    },
    popUpsButtonText: {
      fontFamily: theme.fontMedium,
      fontSize: 14,
    },
    nextRightArrow: {
      position: 'absolute',
      right: 8.5,
      width: 6,
      height: 10,
      tintColor: '#FF6C0D',
    }
  });
  return styles;
};

export default useIntroductorySlidesStyles;
