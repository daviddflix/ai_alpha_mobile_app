import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../../context/themeContext';

const useTopMenuStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      minWidth: 60,
      paddingVertical: 10,
    },
    loadingMessage: {
      flex: 1,
      alignSelf: 'center',
      marginHorizontal: '25%',
    },
    text: {
      color: theme.textColor,
      fontSize: theme.responsiveFontSize * 0.825,
      fontFamily: theme.fontMedium,
      textAlign: 'center',
    },
    topContentWrapper: {
      width: '100%',
    },
    marginWrapper: {
      width: '100%',
      marginTop: 8,
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent'
    }
  });
  return styles;
};

export default useTopMenuStyles;
