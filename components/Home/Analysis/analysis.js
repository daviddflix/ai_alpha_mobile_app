import * as React from 'react';
import {List} from 'react-native-paper';
import AnalysisItem from './analysisItem/analysisItem';
import useHomeAnalysisStyles from './analysisStyles';
import {Image, View, Text, TouchableOpacity} from 'react-native';
// import {analysis_mock} from './analysis_mock';
import {getService} from '../../../services/aiAlphaApi';
import {useNavigation} from '@react-navigation/core';
import {AboutIcon} from '../Topmenu/subMenu/Fund_news_chart/Fundamentals/AboutIcon';
import {home_static_data} from '../homeStaticData';
import {AnalysisContext} from '../../../context/AnalysisContext';
const Analysis = ({handleAboutPress}) => {
  const styles = useHomeAnalysisStyles();
  const {analysisItems} = React.useContext(AnalysisContext);
  const [analysisData, setAnalysisData] = React.useState([]);
  const [expanded, setExpanded] = React.useState(false);
  const navigation = useNavigation();
  const aboutIconStyles = {
    top: 12.5,
  };

  React.useEffect(() => {
    setAnalysisData(analysisItems);
  }, [analysisItems]);

  const handlePress = () => setExpanded(!expanded);

  const handleAnalysisNavigation = analysis => {
    navigation.navigate('AnalysisArticleScreen', {
      analysis_content: analysis.raw_analysis,
      coin_bot_id: analysis.coin_bot_id,
      date: analysis.created_at,
    });
  };

  const handleSeeAllNavigation = () => {
    navigation.navigate('Analysis', {
      screen: 'History',
      params: {},
    });
  };

  return (
    <List.Section title="Analysis" titleStyle={styles.mainTitle}>
      <AboutIcon
        handleAboutPress={handleAboutPress}
        description={home_static_data.analysis.sectionDescription}
        additionalStyles={aboutIconStyles}
      />
      {analysisData?.length === 0 ? (
        <Text style={styles.emptyMessage}>There aren't analysis to show.</Text>
      ) : (
        <View style={styles.itemsContainer}>
          {analysisData?.slice(0, 5).map((story, index) => (
            <View
              style={[
                styles.itemWrapper,
                index > 0 && !expanded ? styles.hidden : {},
              ]}
              key={index}>
              <AnalysisItem
                key={story.id}
                title={story.title}
                image={story.image}
                item={story}
                handleAnalysisNavigation={handleAnalysisNavigation}
              />
              <TouchableOpacity
                style={[styles.arrowContainer, index > 0 ? styles.hidden : {}]}
                onPress={() => handlePress()}>
                <Image
                  source={
                    expanded
                      ? require('../../../assets/images/arrow-up.png')
                      : require('../../../assets/images/arrow-down.png')
                  }
                  style={styles.arrowDown}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          ))}
          <View style={styles.seeAllButton}>
            <Text
              style={styles.seeAllText}
              onPress={() => handleSeeAllNavigation()}>
              See all articles
            </Text>
          </View>
        </View>
      )}
    </List.Section>
  );
};

export default Analysis;
