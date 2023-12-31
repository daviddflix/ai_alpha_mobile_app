import {useContext} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {AppThemeContext} from '../../../../../context/themeContext';

const useCoinMenuStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    menu: {
      justifyContent: 'space-between',
      borderRadius: 20,
      width: '96%',
      backgroundColor: theme.mainBackgroundColor,
    },
    subMenu: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 5,
      borderRadius: 30,
      backgroundColor: theme.mainBackgroundColor,
    },
    subMenuButton: {
      width: '30%',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 30,
      borderWidth: 1,
      borderColor: theme.inactiveColor,
      height: 30,
    },
    activeButton: {
      backgroundColor: theme.activePink,
      color: theme.activeWhite,
    },
    buttonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    buttonImage: {
      width: 15,
      height: 15,
      marginRight: 8,
    },
    buttonText: {
      color: theme.inactiveColor,
      textTransform: 'uppercase',
      fontSize: theme.responsiveFontSize * 0.925,
      fontWeight: '500',
    },
    activeButtonText: {
      color: theme.activeWhite,
    },
  });
  return styles;
};

export default useCoinMenuStyles;
