import {StyleSheet} from 'react-native';
import {useContext} from 'react';
import {AppThemeContext} from '../../context/themeContext';

const useAskAiStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    flex: {
      flex: 1,
    },
    container: {
      flex: 1,
      width: theme.width,
      padding: 12,
      paddingBottom: 0,
    },
    title: {
      marginTop: 48,
      marginBottom: 24,
      marginLeft: 28,
      fontSize: 25,
      color: theme.titleColor,
      fontFamily: theme.fontSemibold,
      textAlign: 'left',
    },
    searchInput: {
      width: '100%',
      marginVertical: 8,
      paddingHorizontal: 12,
      paddingLeft: 18,
      backgroundColor: theme.loginInputBgColor,
      borderRadius: 3,
      fontFamily: theme.font,
      fontSize: theme.responsiveFontSize * 0.925,
      color: theme.textColor,
    },
    inputWrapper: {
      flexDirection: 'row',
      position: 'relative',
      height: 60,
      marginHorizontal: 4,
    },
    placeholderText: {
      position: 'absolute',
      top: 18,
      left: 24,
      color: theme.searchPlaceHolderColor,
      fontSize: 14,
      fontFamily: theme.font,
    },
    inputText: {
      marginHorizontal: 26,
      fontFamily: theme.fontMedium,
      color: theme.titleColor,
      fontSize: 16,
    },
    menuContainer: {
      width: '100%',
      marginVertical: theme.boxesVerticalMargin,
      flexDirection: 'row',
      alignSelf: 'center',
      alignItems: 'center',
      backgroundColor: theme.subMenuBgColor,
      borderRadius: 4,
    },
    menuButton: {
      width: '50%',
      backgroundColor: 'transparent',
      borderRadius: 4,
      overflow: 'hidden',
    },
    activeButton: {
      backgroundColor: theme.activeWhite,
      borderColor: theme.subMenuBgColor,
      borderWidth: 2,
      borderRadius: 4,
    },
    menuText: {
      marginVertical: 5,
      textAlign: 'center',
      fontSize: 12,
      fontFamily: theme.font,
      color: theme.secondaryTextColor,
    },
    activeText: {
      fontFamily: theme.fontMedium,
      color: theme.subMenuTextColor,
    },
    searchButton: {
      width: 120,
      height: 40,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 14,
      backgroundColor: theme.orange,
      borderRadius: 4,
    },
    searchButtonText: {
      color: '#FFFFFF',
      fontSize: 14,
      fontFamily: theme.fontMedium,
    },
    row: {
      flexDirection: 'row',
    },
    emptyIcon: {
      width: 48,
      height: 48,
      marginLeft: 6,
      borderRadius: 24,
      alignSelf: 'flex-start',
      backgroundColor: theme.boxesBackgroundColor,
    },
    emptyTitle: {
      width: 125,
      height: 20,
      marginHorizontal: 14,
      alignSelf: 'center',
      borderRadius: 2,
      backgroundColor: theme.boxesBackgroundColor,
    },
    emptySecondTitle: {
      width: 100,
      marginBottom: 8,
      marginTop: 16,
      marginHorizontal: 26,
      alignSelf: 'flex-start',
    },
    emptyContent: {
      width: '100%',
      height: 400,
      backgroundColor: theme.boxesBackgroundColor,
      borderRadius: 3,
      alignSelf: 'center',
    },
    resultsContainer: {
      marginBottom: 32,
    },
    valueBoxContainer: {
      width: '100%',
      marginBottom: 8,
      justifyContent: 'center',
      alignSelf: 'center',
    },
    boxTitle: {
      marginVertical: theme.boxesVerticalMargin,
      marginHorizontal: 14,
      color: theme.titleColor,
      fontSize: 16,
      fontFamily: theme.fontMedium,
      textTransform: 'capitalize',
    },
    content: {
      width: '100%',
      alignSelf: 'center',
      padding: 14,
      fontSize: 14,
      fontFamily: theme.font,
      color: theme.textColor,
      backgroundColor: theme.boxesBackgroundColor,
    },
    iconImage: {
      width: 48,
      height: 48,
      alignSelf: 'flex-start',
      overflow: 'hidden',
    },
    imageBackground: {
      width: 48,
      height: 48,
      marginVertical: 24,
      marginLeft: 6,
      borderRadius: 24,
      justifyContent: 'center',
      backgroundColor: theme.boxesBackgroundColor,
      overflow: 'hidden',
    },
    coinName: {
      fontSize: 16,
      color: theme.titleColor,
      fontFamily: theme.fontMedium,
      marginHorizontal: 14,
      alignSelf: 'center',
      textTransform: 'capitalize',
    },
    disabledButton: {
      backgroundColor: theme.secondaryGrayColor,
    },
    historySection: {
      width: '100%',
      marginVertical: 16,
    },
    cleanButton: {
      marginVertical: 8,
      marginRight: 6,
      alignSelf: 'flex-end',
      textAlign: 'right',
      color: theme.secondaryTextColor,
      fontSize: 12,
      fontFamily: theme.font,
    },
    historyMenuContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 4,
      backgroundColor: theme.subMenuBgColor,
    },
    historyMenuButton: {
      backgroundColor: 'transparent',
      borderRadius: 4,
      overflow: 'hidden',
    },
    historyItemsContainer: {
      width: '100%',
      marginVertical: 8,
    },
    historyItem: {
      position: 'relative',
      width: '100%',
      marginBottom: 4,
      flexDirection: 'row',
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderRadius: 3,
      alignItems: 'center',
      backgroundColor: theme.boxesBackgroundColor,
    },
    historyItemLogo: {
      width: 38,
      height: 38,
      borderRadius: 19,
    },
    historyItemImageBackground: {
      width: 42,
      height: 42,
      borderRadius: 21,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.thirdBoxesBgColor,
    },
    historyItemName: {
      marginHorizontal: 10,
      fontSize: 14,
      color: theme.textColor,
      fontFamily: theme.fontMedium,
      textTransform: 'uppercase',
    },
    rightArrow: {
      position: 'absolute',
      right: 8,
      width: 14,
      height: 14,
      marginHorizontal: 8,
      tintColor: theme.secondaryGrayColor,
    },
    noContentMessage: {
      margin: theme.boxesVerticalMargin,
      fontSize: 14,
      color: theme.secondaryTextColor,
      alignSelf: 'center',
      fontFamily: theme.fontBoldItalic,
    },
  });
  return styles;
};

export default useAskAiStyles;
