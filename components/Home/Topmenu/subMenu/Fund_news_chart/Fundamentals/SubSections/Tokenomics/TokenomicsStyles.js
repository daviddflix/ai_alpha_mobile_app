import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../../../../../../context/themeContext';

const useTokenomicsStyles = () => {
  const {theme} = useContext(AppThemeContext);

  const styles = StyleSheet.create({
    progressBarContainer: {
      height: 15,
      width: '100%',
      backgroundColor: theme.boxesBackgroundColor,
      borderRadius: 2,
      overflow: 'hidden',
      marginVertical: 8,
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: theme.secondaryTextColor,
    },
    progressBarWrapper: {
      flex: 1,
    },
    progressBar: {
      height: '100%',
      backgroundColor: theme.orange,
    },
    progressBarValue: {
      position: 'absolute',
      left: 0,
      top: 0,
      textAlign: 'left',
      color: theme.orange,
      fontSize: theme.responsiveFontSize * 0.8,
      fontFamily: theme.fontMedium,
    },
    progressBarMaxValue: {
      position: 'absolute',
      right: 0,
      top: 0,
      textAlign: 'right',
      color: theme.secondaryTextColor,
      fontSize: theme.responsiveFontSize * 0.8,
      fontFamily: theme.fontMedium,
    },
    infinityBar: {
      borderLeftWidth: 0,
      borderRightWidth: 0,
    },
    infinityLabel: {
      fontSize: theme.responsiveFontSize * 1.2,
    },
    infinityButton: {
      position: 'absolute',
      right: 0,
      top: 0,
      zIndex: 2,
    },
    // Tokenomics styles
    container: {
      width: '100%',
      paddingVertical: 10,
    },
    tokenItemsContainer: {
      flex: 1,
      marginVertical: theme.boxesVerticalMargin,
    },
    tokenItem: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginVertical: theme.boxesVerticalMargin * 0.6,
      backgroundColor: theme.boxesBackgroundColor,
      borderTopColor: theme.secondaryGrayColor,
      borderTopWidth: 1,
    },
    tokenRow: {
      flexDirection: 'row',
    },
    numberTitles: {
      flex: 1,
      position: 'relative',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    alignRight: {
      right: 10,
      color: theme.secondaryTextColor,
      fontSize: theme.responsiveFontSize * 0.8,
      fontFamily: theme.fontMedium,
    },
    alignLeft: {
      left: 70,
      color: theme.orange,
      fontSize: theme.responsiveFontSize * 0.8,
      fontFamily: theme.fontMedium,
    },
    tokenName: {
      width: '20%',
      paddingVertical: 8,
      fontSize: theme.responsiveFontSize,
      color: theme.textColor,
      textAlign: 'center',
      alignSelf: 'flex-end',
      fontFamily: theme.fontSemibold,
    },
    text: {
      marginLeft: 8,
      color: theme.textColor,
      fontSize: theme.responsiveFontSize * 0.8,
      fontFamily: theme.fontMedium,
    },
    row: {
      position: 'relative',
      marginBottom: 15,
      flexDirection: 'row',
    },
    inflationaryArrow: {
      width: theme.responsiveFontSize * 0.85,
      height: theme.responsiveFontSize * 0.85,
      tintColor: theme.textColor,
    },
  });
  return styles;
};

export default useTokenomicsStyles;
