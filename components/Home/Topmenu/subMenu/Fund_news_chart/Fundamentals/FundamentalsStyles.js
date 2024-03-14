import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../../../../context/themeContext';

const useFundamentalsStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    container: {
      width: theme.width,
      paddingHorizontal: 10,
      paddingTop: 30,
      marginBottom: 80,
    },
    title: {
      marginVertical: theme.titlesVerticalMargin * 0.5,
      marginHorizontal: 12,
      marginTop: 0,
      fontFamily: theme.fontSemibold,
      color: theme.titleColor,
      fontSize: theme.titleFontSize,
    },
    subTitle: {
      margin: theme.boxesVerticalMargin,
      marginHorizontal: 12,
      color: theme.titleColor,
      fontFamily: theme.fontSemibold,
      fontSize: theme.responsiveFontSize,
    },
    subSectionContent: {
      flex: 1,
      marginVertical: theme.boxesVerticalMargin,
      backgroundColor: theme.boxesBackgroundColor,
      borderRadius: 4,
    },
    backgroundColor: {
      backgroundColor: theme.mainBackgroundColor,
    },
    subSection: {
      flex: 1,
      marginVertical: theme.boxesVerticalMargin,
    },
    row: {
      position: 'relative',
      width: '100%',
      flexDirection: 'row',
    },
    aboutIcon: {
      width: 20,
      height: 20,
      tintColor: theme.titleColor,
    },
    aboutIconWrapper: {
      position: 'absolute',
      right: 25,
      flex: 1,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontFamily: theme.fontMedium,
      fontSize: 16,
    },
    aboutTitle: {
      marginBottom: theme.titlesVerticalMargin,
      fontSize: theme.responsiveFontSize * 0.85,
      textAlign: 'left',
      fontFamily: theme.fontSemibold,
      color: theme.textColor,
    },
    modalBackground: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: '#00000060',
      opacity: 1,
      zIndex: 2000,
    },
    modalContainer: {
      ...StyleSheet.absoluteFillObject,
      position: 'relative',
      alignItems: 'flex-end',
      backgroundColor: '#00000060',
    },
    modalContent: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: 0,
      backgroundColor: theme.secondaryBgColor,
      padding: 24,
      borderRadius: 2,
    },
    closeButton: {
      position: 'absolute',
      top: 24,
      right: 24,
      width: 24,
      height: 24,
    },
    closeButtonImage: {
      flex: 1,
      tintColor: theme.textColor,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: '#33333360',
    },
    modalDescription: {
      fontSize: theme.responsiveFontSize * 0.8,
      fontFamily: theme.fontMedium,
      color: theme.textColor,
      lineHeight: 22,
    },
    readMoreText: {
      fontSize: theme.responsiveFontSize * 0.8,
      fontFamily: theme.fontSemibold,
      color: '#7B7BFF',
      lineHeight: 24,
      textDecorationLine: 'underline',
      textDecorationColor: '#7B7BFF',
    },
    hidden: {
      opacity: 0,
    },
  });
  return styles;
};

export default useFundamentalsStyles;
