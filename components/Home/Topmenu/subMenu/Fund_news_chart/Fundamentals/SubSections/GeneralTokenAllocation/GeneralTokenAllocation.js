import {Text, View, TouchableOpacity} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import CircleChart from '../CircleChart/CircleChart';
import useGTAStyles from './GTAStyles';
import {AppThemeContext} from '../../../../../../../../context/themeContext';
import Loader from '../../../../../../../Loader/Loader';
import NoContentMessage from '../../NoContentMessage/NoContentMessage';

const GeneralTokenData = ({data, handleTokenChange, styles, colors}) => {
  return (
    <View style={styles.circleDataContainer}>
      {data.map((sector, index) => (
        <TouchableOpacity
          style={styles.row}
          key={index}
          onPress={() => handleTokenChange(sector)}>
          <Text
            style={[
              styles.tokenSelector,
              {
                backgroundColor: colors[index],
              },
            ]}>
            {''}
          </Text>
          <Text
            style={[styles.strong, {color: colors[index]}]}
            numberOfLines={2}>
            {sector.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const GeneralTokenAllocation = ({
  getSectionData,
  coin,
  handleSectionContent,
}) => {
  const {isDarkMode} = useContext(AppThemeContext);
  const colors = isDarkMode ? [
    '#CD1900',
    '#FF3D00',
    '#FF7000',
    '#FF6C0D',
    '#FF9900',
    '#FF8D34',
    '#FFB546',
    '#FFCC7E',
    '#FFE3B8',
    '#FFF7EB',
    '#C539B4',
    '#DE57D1',
    '#EC86E2',
    '#F4B3EF',
    '#F9D5F8',
    '#FDEAFD',
    '#FEF5FE',
  ] : [
    '#451205',
    '#80290E',
    '#A02E0C',
    '#C93A05',
    '#FF1F00',
    '#FF3D00',
    '#FF7000',
    '#FF9900',
    '#FFB546',
    '#FFCC7E',
    '#460C3C',
    '#6C235F',
    '#832574',
    '#A02B90',
    '#C539B4',
    '#DE57D1',
    '#EC86E2',
    '#F4B3EF',
    '#F9D5F8',
  ];
  const styles = useGTAStyles();
  const [percentagesData, setPercentagesData] = useState([]);
  const {theme} = useContext(AppThemeContext);
  const [loading, setLoading] = useState(true);
  const [currentToken, setCurrentToken] = useState(null);
  const handleTokenChange = token => {
    setCurrentToken(token);
  };

  useEffect(() => {
    setLoading(true);
    setPercentagesData([]);
    const fetchTokenDistributionData = async () => {
      try {
        const response = await getSectionData(
          `/api/get_tokenomics?coin_name=${coin}`,
        );

        if (response.status !== 200) {
          setPercentagesData([]);
        } else {
          console.log(response.message.token_distribution);
          const parsed_data = response.message.token_distribution.map(
            distribution => {
              return {
                title: distribution.token_distributions.holder_category,
                percentage: parseFloat(
                  distribution.token_distributions.percentage_held.replace(
                    '%',
                    '',
                  ),
                ),
              };
            },
          );
          console.log('Parsed data:', parsed_data);
          setPercentagesData(parsed_data);
          setCurrentToken(parsed_data[0]);
        }
      } catch (error) {
        console.log('Error trying to get token distribution data: ', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTokenDistributionData();
  }, [coin]);

  const currentTokenIndex = percentagesData.findIndex(
    values => values.title === currentToken?.title,
  );

  useEffect(() => {
    if (!loading && percentagesData?.length === 0) {
      handleSectionContent('generalTokenAllocation', true);
    }
  }, [percentagesData, loading, handleSectionContent]);

  return (
    <View style={styles.container}>
      {loading ? (
        <Loader />
      ) : percentagesData?.length === 0 ? (
        <NoContentMessage />
      ) : (
        <>
          <CircleChart
            data={percentagesData}
            dividerSize={4}
            colors={colors}
            currentToken={currentToken}
            currentTokenIndex={currentTokenIndex}
          />
          <GeneralTokenData
            currentToken={currentToken}
            data={percentagesData}
            handleTokenChange={handleTokenChange}
            styles={styles}
            colors={colors}
          />
        </>
      )}
    </View>
  );
};

export default GeneralTokenAllocation;
