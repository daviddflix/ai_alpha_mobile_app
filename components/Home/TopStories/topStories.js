import React, {useState, useEffect, useContext} from 'react';
import {List} from 'react-native-paper';
import StoryItem from './Storyitem/storyItem';
import useTopStoriesStyles from './topStoriesStyles';
import {Image, Text} from 'react-native';
import {getService} from '../../../services/aiAlphaApi';
import {useNavigation} from '@react-navigation/core';
import {TopMenuContext} from '../../../context/topMenuContext';
import {CategoriesContext} from '../../../context/categoriesContext';
import {RevenueCatContext} from '../../../context/RevenueCatContext';

const TopStories = () => {
  const styles = useTopStoriesStyles();
  const [expanded, setExpanded] = useState(false);
  const handlePress = () => setExpanded(!expanded);
  const [stories, setStories] = useState([]);
  const navigation = useNavigation();
  const {categories} = useContext(CategoriesContext);
  const {updateActiveCoin, updateActiveSubCoin} = useContext(TopMenuContext);
  const {userInfo, findCategoryInIdentifiers} = useContext(RevenueCatContext);

  // This function finds the category and coin bot that belongs to the story, passing through the parameters the coin bot id and the coins where find it.
  const findCoinById = (coins, coinBotId) => {
    let foundCategory = coins.find(category =>
      category.coin_bots.some(coin => coin.bot_id === coinBotId),
    );

    if (foundCategory) {
      let foundCoin = foundCategory.coin_bots.find(
        coin => coin.bot_id === coinBotId,
      );
      return {category: foundCategory, coinBot: foundCoin};
    }
  };

  // This function handles the story redirect when clicking over one, first, finds the category/coin and the subCoin coin bot that belongs to it, after that, updates the active coin and subcoin with its values and after that navigates to the new section. If any param is needed, just include it in the second params object below, which are the params passed to the news screen. This handler is passed to every story item, and it is called on the onPress event.
  const handleStoryRedirect = (story, coinBotId) => {
    let {category, coinBot} = findCoinById(categories, coinBotId);
    updateActiveCoin(category);
    updateActiveSubCoin(coinBot.bot_name);

    if (
      findCategoryInIdentifiers(category.category_name, userInfo.entitlements)
    ) {
      navigation.navigate('TopMenuScreen', {
        screen: 'SubMenuScreen',
        params: {
          screen: 'News',
          params: {
            screen: 'NewsArticle',
            params: {
              item: {
                title: story.summary.slice(0, 100),
                summary: story.summary,
                images: story.images,
                date: story.story_date,
              },
            },
          },
        },
      });
    } else {
      navigation.navigate('Account', {screen: 'Subscriptions'});
    }
  };

  useEffect(() => {
    const fetchTopStories = async () => {
      try {
        const data = await getService(`/api/get/allTopStories`);
        if (!data || data['top stories'] === undefined) {
          setStories([]);
        } else {
          setStories(data['top stories']);
        }
      } catch (error) {
        console.error('Error fetching top stories:', error.message);
      }
    };

    fetchTopStories();
  }, []);

  return (
    <List.Section title="Top Stories" titleStyle={styles.mainTitle}>
      {stories.length === 0 ? (
        <Text style={styles.emptyMessage}>There are no Stories to show...</Text>
      ) : (
        <List.Accordion
          style={styles.storyItem}
          titleStyle={styles.titleStyles}
          title={stories ? `${stories[0].summary.slice(0, 50)}...` : 'Loading'}
          description={stories ? stories[0].summary : 'Loading'}
          descriptionStyle={styles.description}
          right={() => (
            <Image
              source={
                expanded
                  ? require('../../../assets/images/arrow-up.png')
                  : require('../../../assets/images/arrow-down.png')
              }
              style={styles.arrowDown}
              resizeMode="contain"
            />
          )}
          left={() => (
            <Image
              source={{
                uri:
                  stories[0].images[0].image ||
                  'https://static.vecteezy.com/system/resources/thumbnails/006/299/370/original/world-breaking-news-digital-earth-hud-rotating-globe-rotating-free-video.jpg',
                width: 60,
              }}
              style={styles.imageStyle}
              resizeMode="contain"
            />
          )}
          expanded={expanded}
          onPress={handlePress}>
          {stories?.map((story, i) => (
            <StoryItem
              item={story}
              key={i}
              title={story.summary}
              description={story.summary}
              image={
                story.images[0].image ||
                'https://static.vecteezy.com/system/resources/thumbnails/006/299/370/original/world-breaking-news-digital-earth-hud-rotating-globe-rotating-free-video.jpg'
              }
              handleStoryRedirect={handleStoryRedirect}
              coinBotId={story.coin_bot_id}
            />
          ))}
        </List.Accordion>
      )}
    </List.Section>
  );
};

export default TopStories;
