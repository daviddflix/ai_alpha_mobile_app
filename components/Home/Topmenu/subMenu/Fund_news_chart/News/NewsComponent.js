import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  FlatList,
  SafeAreaView,
  View,
  TouchableOpacity,
} from 'react-native';
import {getService} from '../../../../../../services/aiAlphaApi';
import NewsItem from './newsItem';
import {useNavigation} from '@react-navigation/native';
import Loader from '../../../../../Loader/Loader';
import {TopMenuContext} from '../../../../../../context/topMenuContext';
import useNewsStyles from './NewsStyles';
import {AboutModalContext} from '../../../../../../context/AboutModalContext';
import {AboutIcon} from '../Fundamentals/AboutIcon';
import {home_static_data} from '../../../../homeStaticData';
import AboutModal from '../Fundamentals/AboutModal';

const NewsComponent = ({route}) => {
  const styles = useNewsStyles();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);
  const {activeCoin, activeSubCoin} = useContext(TopMenuContext);
  const [botname, setBotname] = useState(
    route.params ? route.params.botname : activeSubCoin.bot_name,
  );
  const options = ['Today', 'This Week'];
  const [activeFilter, setActiveFilter] = useState(options[0]);
  const {handleAboutPress, aboutDescription, aboutVisible} =
    useContext(AboutModalContext);

  // Function to filter the summary or texts of the article, removing the words that are put by the prompt generated, and aren't necessary in the summary or the title.
  const filterText = summary => {
    const keywords_to_remove = [
      'Headline:',
      'Summary:',
      'Step One:',
      'Step Two:',
      'Step Three:',
      'Secondary Summary:',
    ];

    const filteredText = summary
      .split('\n')
      .map(line => {
        for (const keyword of keywords_to_remove) {
          if (line.includes(keyword)) {
            line = line.replace(keyword, '');
          }
        }
        return line.trim();
      })
      .join('\n');

    return filteredText;
  };

  const onPress = item => {
    navigation.navigate('NewsArticle', {
      item: item,
      isStory: false,
    });
  };

  const handleFilterPress = option => {
    setActiveFilter(option);
  };

  useEffect(() => {
    if (
      activeSubCoin &&
      activeSubCoin !== undefined &&
      activeCoin &&
      activeCoin !== undefined
    ) {
      setBotname(activeSubCoin || activeCoin.coin_bots[0].bot_name);
    }
  }, [activeCoin, activeSubCoin]);

  useEffect(() => {
    // setNews([]);
    // setLoading(false);
    setLoading(true);
    const fetchNews = async () => {
      try {
        const newsLimit =
          activeFilter && activeFilter === 'Last Month'
            ? 30
            : activeFilter === 'This Week'
            ? 20
            : 10;
        const endpoint = activeFilter
          ? `/api/get/news?coin=${botname}&time_range=${activeFilter.toLowerCase()}&limit=${newsLimit}`
          : `/api/get/news?coin=${botname}&limit=${newsLimit}`;
        const response = await getService(endpoint);
        if (
          response.length === 0 ||
          (response.message &&
            response.message.startsWith('No articles found')) ||
          response.error
        ) {
          setNews([]);
        } else {
          const articles = response.articles;
          setNews(articles);
        }
      } catch (error) {
        console.error('Error fetching news:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [botname, activeFilter]);

  return (
    <SafeAreaView style={[styles.container, styles.backgroundColor]}>
      {aboutVisible && (
        <AboutModal
          description={aboutDescription}
          onClose={handleAboutPress}
          visible={aboutVisible}
        />
      )}
      <View style={styles.titleRow}>
        <Text style={styles.title}>News</Text>
        <AboutIcon
          handleAboutPress={handleAboutPress}
          description={home_static_data.news.sectionDescription}
        />
      </View>
      <View style={styles.filterContainer}>
        {options.map(option => (
          <TouchableOpacity
            key={option}
            onPress={() => handleFilterPress(option)}
            style={[
              styles.filterButton,
              activeFilter === option ? styles.activeOption : null,
            ]}>
            <Text
              style={[
                styles.filterText,
                activeFilter === option ? styles.activeButtonText : null,
              ]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {loading ? (
        <Loader />
      ) : (
        <FlatList
          data={news}
          ListEmptyComponent={
            <View style={styles.emptyMessageContainer}>
              <Text style={styles.emptyMessage}>
                There aren't news to show.
              </Text>
            </View>
          }
          keyExtractor={item => item.article_id}
          renderItem={({item}) => (
            <NewsItem item={item} onPress={onPress} filterText={filterText} />
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default NewsComponent;
