import {Text, View} from 'react-native';
import React from 'react';
import {AboutIcon} from '../../../AboutIcon';

const CompetitorSection = ({
  title,
  component,
  description,
  styles,
  handleAboutPress,
}) => {
  if (!component) {
    return <></>;
  }
  return (
    <View style={styles.competitorSection}>
      <View style={styles.row}>
        <Text style={styles.title}>{title}</Text>
        <AboutIcon
          description={description}
          handleAboutPress={handleAboutPress}
        />
      </View>
      <View style={styles.contentContainer}>{component}</View>
    </View>
  );
};

export default CompetitorSection;
