import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../../../../../../../context/themeContext';

const useCryptoSelectorStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    selectorContainer: {
      marginVertical: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    selectorItem: {
      width: theme.width * 0.2,
      marginHorizontal: 5,
      padding: 2.5,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: 2.5,
    },
    itemText: {
      color: theme.secondaryTextColor,
      fontSize: theme.responsiveFontSize * 0.68,
    },
    activeText: {
      color: theme.activeWhite,
      fontWeight: 'bold',
    },
  });
  return styles;
};

export default useCryptoSelectorStyles;
