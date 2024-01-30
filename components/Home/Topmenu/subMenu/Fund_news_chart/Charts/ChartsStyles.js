import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../../../../context/themeContext';

const useChartsStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      backgroundColor: theme.mainBackgroundColor,
    },
    scroll: {
      width: '100%',
      backgroundColor: theme.mainBackgroundColor,
    },
    detailsContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      width: '100%',
      // borderColor: 'dark',
      // borderWidth: 1,
      paddingVertical: 10,
    },
    detailsSubContainer: {
      flexDirection: 'row',
      width: '90%',
    },
    detailslabel: {
      textTransform: 'uppercase',
      fontSize: theme.responsiveFontSize,
      fontWeight: 'bold',
      color: theme.textColor,
    },
    lastPrice: {
      textTransform: 'uppercase',
      fontSize: theme.responsiveFontSize,
      marginLeft: 10,
      fontWeight: 'bold',
      color: theme.textColor,
    },
    timeFrameContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      width: '100%',
      marginTop: 10,
    },
    timeFrameSubContainer: {
      flexDirection: 'row',
      width: '90%',
    },
    timeFrameButton: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.subMenuBgColor,
      paddingVertical: 3,
    },
    timeFrameActiveButton: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.subMenuTextColor,
      paddingVertical: 3,
      borderColor: theme.subMenuBgColor,
      borderWidth: 1,
    },
    timeFrameButtonText: {
      color: theme.subMenuTextColor,
      textTransform: 'uppercase',
      fontSize: theme.responsiveFontSize * 0.8,
    },
    timeFrameActiveButtonText: {
      color: theme.secondaryTextColor,
      textTransform: 'uppercase',
      fontWeight: 'bold',
      fontSize: theme.responsiveFontSize * 0.8,
    },
    rsButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      width: '100%',
      marginTop: 10,
    },
    rsButtonSubContainer: {
      flexDirection: 'row',
      width: '90%',
    },
    rsButton: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderWidth: 1,
      borderRadius: 2,
      margin: 5,
      backgroundColor: theme.secondaryBoxesBgColor,
    },
    rsButtonText: {
      textTransform: 'uppercase',
      fontSize: theme.responsiveFontSize * 0.8,
    },
    chartContainer: {
      justifyContent: 'top',
      alignItems: 'top',
      width: '100%',
      height: 300,
      // borderWidth: 2,
      // borderColor: 'black',
      backgroundColor: theme.boxesBackgroundColor,
    },
    chart: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    chartBackgroundImage: {
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      width: 50,
      height: 50,
    },
    alertMenuContainer: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    alertMenuTitle: {
      fontSize: theme.titleFontSize,
      fontWeight: 'bold',
      color: theme.textColor,
    },
    alertMenuButtonContainer: {
      marginLeft: 10,
      flexDirection: 'row',
    },
    alertMenuButton: {
      paddingVertical: 5,
      paddingHorizontal: 18,
      backgroundColor: theme.subMenuBgColor,
      marginHorizontal: 5,
    },
    alertMenuActiveButton: {
      backgroundColor: theme.subMenuTextColor,
    },
    alertMenuActiveText: {
      color: theme.secondaryTextColor,
    },
    alertMenuInactiveText: {
      color: theme.subMenuTextColor,
    },
    alertListContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      marginVertical: 20,
    },
    alertsTextMessage: {
      minHeight: 100,
    },
    alertDetailsContainer: {
      flexDirection: 'row',
      backgroundColor: theme.boxesBackgroundColor,
      marginVertical: 10,
      borderRadius: 2,
      paddingVertical: 10,
      paddingHorizontal: 10,
      flex: 1, // Take up 100% of the width
    },
    alertDetailsLeftContent: {
      flex: 1,
    },
    alertDetailsRightContent: {
      alignItems: 'flex-end',
    },
    alertDetailsTitle: {
      fontSize: theme.responsiveFontSize,
      fontWeight: 'bold',
      color: theme.textColor,
    },
    alertDetailsSubtitle: {
      fontSize: theme.responsiveFontSize,
      color: theme.textColor,
    },
    alertDetailsRightTitle: {
      fontSize: theme.responsiveFontSize * 0.8,
      fontWeight: 'bold',
      color: theme.textColor,
    },
  });
  return styles;
};

export default useChartsStyles;
