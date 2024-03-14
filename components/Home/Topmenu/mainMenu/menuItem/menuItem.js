import React from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import useMenuItemStyles from './menuItemStyles';
import {API_BASE_URL} from '../../../../../services/aiAlphaApi';

const MenuItem = ({
  onPress,
  category,
  isActive,
  isDarkMode,
  findCategoryInMenuData,
}) => {
  const styles = useMenuItemStyles();
  const icons = {
    light: {
      active: `${API_BASE_URL}${category.active_light_icon}`,
      inactive: `${API_BASE_URL}${category.inactive_light_icon}`,
    },
    dark: {
      active: `${API_BASE_URL}${category.active_dark_icon}`,
      inactive: `${API_BASE_URL}${category.inactive_dark_icon}`,
    },
  };

  return (
    <TouchableOpacity
      style={styles.buttonContainer}
      onPress={() => onPress(category)}>
      <View
        style={[
          styles.button,
          isActive && styles.activeButton,
          {borderColor: category.borderColor},
        ]}>
        <Image
          source={{
            uri: `${API_BASE_URL}${category.icon}`,
            width: 60,
            height: 60,
          }}
          resizeMode="contain"
          style={styles.imageIcon}
          fadeDuration={100}
          alt={category.category_name}
        />
      </View>

      <Text numberOfLines={2} ellipsizeMode="tail" style={styles.buttonText}>
        {category.category_name}
      </Text>
    </TouchableOpacity>
  );
};

export default MenuItem;