import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import useHomeNotificationsStyles from './HomeNotificationsStyles';

const NotificationsButton = ({handleButtonPress}) => {
  const styles = useHomeNotificationsStyles();
  return (
    <TouchableOpacity
      onPress={() => handleButtonPress()}
      style={styles.notificationsButton}>
      <Image
        source={require('../../../assets/images/home/notifications_light.png')}
        style={styles.bellImage}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default NotificationsButton;
