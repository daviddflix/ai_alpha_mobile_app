import {Image, Linking, Platform, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import useIntroductionStyles from './IntroductionStyles';
import Loader from '../../../../../../../Loader/Loader';
import {TouchableOpacity} from 'react-native-gesture-handler';
import RenderHTML, {defaultSystemFonts} from 'react-native-render-html';
import NoContentMessage from '../../NoContentMessage/NoContentMessage';
import {AppThemeContext} from '../../../../../../../../context/themeContext';

const ExternalLink = ({url, text}) => {
  const styles = useIntroductionStyles();
  const handleLinkRedirect = url => {
    Linking.openURL(url);
  };
  return (
    <TouchableOpacity
      onPress={() => handleLinkRedirect(url)}
      style={styles.linkContainer}>
      <Text style={styles.link}>{text}</Text>
    </TouchableOpacity>
  );
};

const Introduction = ({getSectionData, coin, handleSectionContent}) => {
  const styles = useIntroductionStyles();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const {theme, isDarkMode} = useContext(AppThemeContext);
  const isAndroid = Platform.OS === 'android' ? true : false;
  const systemFonts = [
    ...defaultSystemFonts,
    isAndroid ? 'prompt_regular' : 'Prompt-Regular',
    isAndroid ? 'prompt_semibold' : 'Prompt-SemiBold',
  ];
  const mocked_introduction =
    '<p><strong>Chainlink</strong>, a decentralised oracle network, provides secure data feeds for smart contracts, expanding their applications. <strong>Chainlink 2.0 </strong> introduces <strong> Decentralised Oracle Networks (DONs) </strong>, enhancing capabilities with secure off-chain computations. With a market cap of <strong>$11.6B</strong> and daily volume of <strong>$657M</strong>, Chainlink leads the blockchain oracle space, empowering innovation in smart contract development.</p>';

  const parseHtmlTags = content => {
    const replacedContent = content.replace(/\\/g, '');
    const strong_changed_content = replacedContent
      .replace(
        /<strong style="color: rgb\([0-9]+, [0-9]+, [0-9]+\);">/g,
        `<span style="color: ${
          isDarkMode ? 'rgb(255, 255, 255) ' : 'rgb(64, 64, 64)'
        };" class="bold";>`,
      )
      .replace(/<\/strong>/g, '</span>')
      .replace(/strong/g, 'span')
      .replace(
        /style="color: rgb\([0-9]+, [0-9]+, [0-9]+\);"/g,
        `style="color: ${
          isDarkMode ? 'rgb(255, 255, 255) ' : 'rgb(64, 64, 64)'
        }";`,
      );
    return strong_changed_content;
  };

  const findHtmlContent = content => {
    const replacedContent = content.replace(/\\/g, '');
    const strong_changed_content = replacedContent
      .replace(
        /<strong style="color: rgb\([0-9]+, [0-9]+, [0-9]+\);">/g,
        `<span style="color: ${
          isDarkMode ? 'rgb(255, 255, 255) ' : 'rgb(64, 64, 64)'
        };" class="bold";>`,
      )
      .replace(/<\/strong>/g, '</span>')
      .replace(/strong/g, 'p');
    const paragraphs_changed = strong_changed_content.replace(
      /p style="color: rgb\([0-9]+, [0-9]+, [0-9]+\);"/g,
      `p style="color: ${
        isDarkMode ? 'rgb(250, 250, 250) ' : 'rgb(64, 64, 64)'
      };"`,
    );

    const span_changed = paragraphs_changed.replace(
      /<span style="color: rgb\([0-9]+, [0-9]+, [0-9]+\);">/g,
      `<span style="color: ${
        isDarkMode ? 'rgb(255, 255, 255) ' : 'rgb(64, 64, 64)'
      };">`,
    );

    // const titles_changed_content = span_changed.replace(
    //   /><strong style="color: rgb\([0-9]+, [0-9]+, [0-9]+\);">/g,
    //   ` style="color: ${
    //     isDarkMode ? 'rgb(255, 255, 255) ' : 'rgb(23, 23, 23)'
    //   };">`,
    // );
    const bullet_lists_updated_content = span_changed.replace(
      /<ul>/g,
      `<ul style="color: ${
        isDarkMode ? 'rgb(255, 255, 255) ' : 'rgb(23, 23, 23)'
      };">`,
    );
    return bullet_lists_updated_content;
  };

  const html_styles = {
    span: {
      color: theme.titleColor,
      fontFamily: isAndroid ? 'prompt_regular' : 'Prompt-Regular',
      fontSize: theme.responsiveFontSize * 0.8,
    },
    p: {
      color: theme.textColor,
      fontFamily: isAndroid ? 'prompt_regular' : 'Prompt-Regular',
      fontSize: theme.responsiveFontSize * 0.85,
    },
  };

  const classes_styles = {
    'ql-size-huge': {
      fontSize: theme.responsiveFontSize * 1.5,
      marginVertical: 4,
      color: theme.titleColor,
      fontFamily: isAndroid ? 'prompt_semibold' : 'Prompt-SemiBold',
    },
    'ql-size-large': {
      fontSize: theme.responsiveFontSize * 1.25,
      marginVertical: 4,
      color: theme.titleColor,
      fontFamily: isAndroid ? 'prompt_semibold' : 'Prompt-SemiBold',
    },
    bold: {
      fontSize: theme.responsiveFontSize * 0.9,
      color: theme.textColor,
      fontFamily: isAndroid ? 'prompt_semibold' : 'Prompt-SemiBold',
    },
  };

  useEffect(() => {
    setLoading(true);
    setContent(null);
    const fetchIntroductionContent = async () => {
      try {
        const response = await getSectionData(
          `/api/get_introduction?coin_name=${coin}`,
        );

        if (response.status !== 200) {
          setContent([]);
        } else {
          const parsedContent = {
            description: response.message.content,
            website: response.message.website,
            whitepaper: response.message.whitepaper,
          };
          setContent(parsedContent);
        }
      } catch (error) {
        console.log('Error trying to get introduction data: ', error);
      } finally {
        setLoading(false);
      }
    };
    fetchIntroductionContent();
  }, [coin]);

  if (!loading && (content === null || content.length === 0)) {
    handleSectionContent('introduction', true);
  }

  if (content) {
    console.log(parseHtmlTags(content.description));
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <Loader />
      ) : content === null ? (
        <NoContentMessage hasSectionName={false} />
      ) : (
        <>
          {/* <Text style={styles.introText}>{content.description}</Text> */}
          <RenderHTML
            source={{
              html: parseHtmlTags(content.description),
            }}
            contentWidth={theme.width - 50}
            systemFonts={systemFonts}
            tagsStyles={html_styles}
            classesStyles={classes_styles}
          />
          <View style={styles.dataContainer}>
            <View style={styles.textContainer}>
              <Image
                style={styles.starSymbol}
                resizeMode="contain"
                source={require('../../../../../../../../assets/images/fundamentals/star-icon.png')}
              />
              <ExternalLink url={content.website} text={'Website'} />
            </View>
            <View style={styles.textContainer}>
              <Image
                style={styles.starSymbol}
                resizeMode="contain"
                source={require('../../../../../../../../assets/images/fundamentals/star-icon.png')}
              />
              <ExternalLink url={content.whitepaper} text={'Whitepaper'} />
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default Introduction;
