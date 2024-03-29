import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../context/themeContext';

const useChatbotStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      ...StyleSheet.absoluteFillObject,
      backgroundColor: theme.mainBackgroundColor,
    },
    messageText: {
      padding: 20,
      borderWidth: 1,
      borderColor: theme.boxesBorderColor,
      backgroundColor: theme.boxesBackgroundColor,
      textAlign: 'center',
      color: theme.titleColor,
      fontSize: theme.titleFontSize,
      borderRadius: 5,
    },
    overlayImage: {
      flex: 1,
      padding: '25%',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  return styles;
};

export default useChatbotStyles;
