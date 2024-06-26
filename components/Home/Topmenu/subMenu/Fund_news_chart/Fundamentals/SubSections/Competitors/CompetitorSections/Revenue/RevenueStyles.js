import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../../../../../../../../context/themeContext';

const useRevenueStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    container: {
      height: '100%',
      padding: 10,
    },
    chartContainer: {
      position: 'relative',
      minHeight: 400,
      width: '100%',
      backgroundColor: theme.boxesBackgroundColor,
      alignSelf: 'flex-start',
      alignItems: 'flex-end',
    },
    selectorContainer: {
      position: 'absolute',
      top: 0,
      width: '100%',
      paddingVertical: 10,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      backgroundColor: theme.boxesBackgroundColor,
      borderRadius: 2,
      zIndex: 2,
    },
    grayRectangle: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      minHeight: 60,
      backgroundColor: theme.boxesBackgroundColor,
      zIndex: 2,
    },
    selectorItem: {
      width: theme.width * 0.18,
      paddingVertical: 2.5,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 2,
    },
    itemText: {
      color: theme.fundamentalsCompetitorsLabelColor,
      fontSize: theme.responsiveFontSize * 0.8,
      fontFamily: theme.fontMedium,
      alignSelf: 'center',
      zIndex: 5,
    },
    bgImage: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      minHeight: 300,
      opacity: 0.4,
    },
    graphImage: {
      marginHorizontal: 10,
      minHeight: 50,
      maxHeight: 400,
    },
    imagesContainer: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    marginBottom: {
      marginBottom: 40,
    },
    graphItemContainer: {
      marginTop: 14,
    }
  });
  return styles;
};

export default useRevenueStyles;
