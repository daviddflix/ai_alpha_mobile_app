import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../../../../../../context/themeContext';

const useCompetitorsStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    menuContainer: {
      flex: 1,
      flexDirection: 'row',
    },
    menuItemContainer: {
      width: theme.width * 0.225,
      height: theme.height * 0.125,
      margin: 4,
      marginBottom: 0,
      borderRadius: 4,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconContainer: {
      position: 'absolute',
      top: 10,
      width: 'auto',
      height: 15,
      margin: 5,
    },
    itemIcon: {
      flex: 1,
      tintColor: theme.fundamentalsMenuText,
    },
    none: {
      display: 'none',
    },
    menuItemName: {
      minHeight: 25,
      marginTop: 4,
      padding: 5,
      color: theme.fundamentalsMenuText,
      textAlign: 'center',
      fontSize: theme.responsiveFontSize * 0.725,
      fontFamily: theme.fontMedium,
    },
    activeItem: {
      color: theme.orange,
      fontFamily: theme.fontSemibold,
    },
    competitorSection: {
      flex: 1,
      marginVertical: theme.boxesVerticalMargin,
    },
    selectedOptionContent: {
      flex: 1,
      height: 700,
    },
    title: {
      marginBottom: theme.titlesVerticalMargin * 0.5,
      marginHorizontal: theme.titlesVerticalMargin,
      color: theme.titleColor,
      fontSize: theme.responsiveFontSize * 0.95,
      fontFamily: theme.fontSemibold,
    },
    row: {
      width: '100%',
      position: 'relative',
      marginVertical: 8,
      flexDirection: 'row',
    },
    emptySectionMessage: {
      margin: theme.boxesVerticalMargin,
      fontSize: theme.responsiveFontSize,
      color: theme.secondaryTextColor,
      alignSelf: 'center',
      fontFamily: theme.fontBoldItalic,
    },
    emptyMessageContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    loaderWrapper: {
      paddingVertical: 48,
    },
  });
  return styles;
};

export default useCompetitorsStyles;
