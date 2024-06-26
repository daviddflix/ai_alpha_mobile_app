import {useContext} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {AppThemeContext} from '../../../../../../../../../../context/themeContext';

const useTransactionFeeStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    imageContainer: {
      position: 'relative',
      height: 100,
      margin: theme.boxesVerticalMargin,
      justifyContent: 'center',
      alignItems: 'center',
    },
    dollarImage: {
      flex: 1,
    },
    graphsContainer: {
      marginVertical: 10,
      padding: 10,
      backgroundColor: theme.boxesBackgroundColor,
      alignItems: 'center',
    },
    activeOptionContainer: {
      width: '50%',
      marginVertical: 15,
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderWidth: 2,
      borderColor: theme.secondaryGrayColor,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
    },
    activeOptionValue: {
      color: theme.textColor,
      fontSize: theme.responsiveFontSize,
      fontFamily: theme.fontMedium,
      textAlign: 'center',
    },
    overlay: {
      position: 'absolute',
      left: '2.45%',
      right: '2.45%',
      bottom: 0,
      height: '100%',
      opacity: 0.5,
    },
  });
  return styles;
};

export default useTransactionFeeStyles;
