import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../../context/themeContext';

const useCryptoCalendarStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    cryptoCalendarTitle: {
      paddingVertical: 2.5,
      paddingHorizontal: 15,
      color: theme.titleColor,
      fontSize: theme.responsiveFontSize * 0.85,
    },
    container: {
      flex: 1,
      width: '100%',
    },
    loaderContainer: {
      flex: 1,
      width: '100%',
      minHeight: 160,
      alignItems: 'center',
      justifyContent: 'center',
    },
    contentCenter: {
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    eventsContainer: {
      flex: 1,
      width: theme.width - 20,
    },
    calendarItem: {
      flex: 1,
      maxWidth: '100%',
      flexDirection: 'row',
      marginVertical: 4,
      paddingVertical: 8,
      paddingHorizontal: 4,
      borderRadius: 4,
      backgroundColor: theme.boxesBackgroundColor,
    },
    itemIconContainer: {
      marginHorizontal: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    itemIconImage: {
      width: 45,
      height: 45,
      marginVertical: 2,
      borderRadius: 22.5,
    },
    coinName: {
      color: theme.textColor,
      fontSize: theme.responsiveFontSize * 0.75,
      fontFamily: theme.fontMedium,
      textAlign: 'center',
    },
    itemInfo: {
      fontSize: theme.responsiveFontSize * 0.8,
      fontFamily: theme.font,
      color: theme.secondaryTextColor,
      marginHorizontal: 2.5,
    },
    caption: {
      height: 64,
      width: 250,
    },
    topDataRow: {
      position: 'relative',
      paddingVertical: 5,
      marginVertical: 10,
      marginHorizontal: 18,
      flexDirection: 'row',
    },
    date: {
      position: 'absolute',
      right: 12,
      flexDirection: 'row',
    },
    tags: {
      position: 'absolute',
      flexDirection: 'row',
    },
    timeIconContainer: {
      marginHorizontal: 4,
      marginVertical: 2,
      width: 15,
      height: 15,
      justifyContent: 'center',
      alignItems: 'center',
    },
    timeIcon: {
      flex: 1,
      tintColor: theme.textColor,
    },
    itemTitle: {
      paddingVertical: 10,
      marginHorizontal: theme.width * 0.05,
      fontFamily: theme.fontSemibold,
      fontSize: theme.responsiveFontSize,
      color: theme.titleColor,
    },
    dataColumn: {
      width: '90%',
    },
    cryptoFilter: {
      minHeight: 70,
      maxWidth: '100%',
      flexDirection: 'row',
      marginVertical: 10,
      backgroundColor: theme.subMenuBgColor,
      borderRadius: 3,
    },
    cryptoItem: {
      width: theme.width * 0.175,
      marginVertical: 4,
      marginHorizontal: 4,
      padding: 2.5,
      borderRadius: 3,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    cryptoIconContainer: {
      width: 35,
      height: 35,
      margin: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cryptoIcon: {
      width: 35,
      height: 35,
      borderRadius: 17.5,
    },
    activeCryptoItem: {
      backgroundColor: theme.activeWhite,
    },
    activeCryptoName: {
      fontFamily: theme.fontMedium,
      color: theme.subMenuTextColor,
    },
    cryptoName: {
      fontSize: theme.responsiveFontSize * 0.65,
      color: theme.secondaryTextColor,
      fontFamily: theme.font,
      textAlign: 'center',
    },
    messageContainer: {
      width: '80%',
      marginVertical: theme.boxesVerticalMargin,
      marginHorizontal: 'auto',
      alignSelf: 'center',
    },
    emptyEventsMessage: {
      margin: theme.boxesVerticalMargin,
      fontSize: 14,
      color: theme.secondaryTextColor,
      alignSelf: 'flex-start',
      fontFamily: theme.fontBoldItalic,
      textAlign: 'left',
    },
    flex: {
      flex: 1,
      width: '100%',
    },
  });
  return styles;
};

export default useCryptoCalendarStyles;
