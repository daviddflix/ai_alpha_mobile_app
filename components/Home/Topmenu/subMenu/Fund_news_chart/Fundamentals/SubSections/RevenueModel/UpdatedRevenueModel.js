import React, {useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native';
import useUpdatedRevenueModelStyles from './UpdatedRevenueModelStyles';
import Loader from '../../../../../../../Loader/Loader';
import NoContentMessage from '../../NoContentMessage/NoContentMessage';

const UpdatedRevenueModel = ({getSectionData, coin, handleSectionContent}) => {
  const styles = useUpdatedRevenueModelStyles();
  const [revenues, setRevenues] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatNumber = num => {
    const absNum = Math.abs(num);
    const abbrev = ['', 'k', 'm', 'b', 't'];
    const thousand = 1000;

    const tier = (Math.log10(absNum) / 3) | 0;

    if (tier == 0) return num;

    const divisor = Math.pow(thousand, tier);
    const formattedNum = (num / divisor).toFixed(2);

    return formattedNum + abbrev[tier];
  };

  useEffect(() => {
    setLoading(true);
    setRevenues([]);

    const fetchRevenueModelData = async coin => {
      try {
        const response = await getSectionData(
          `/api/get_revenue_models?coin_name=${coin}`,
        );
        if (response.status !== 200) {
          setRevenues([]);
        } else {
          const revenue_model = response.revenue_model;
          const mapped_data = [];
          for (const key in revenue_model) {
            switch (key) {
              case 'analized_revenue':
                mapped_data.push({
                  title: 'Annualised Revenue',
                  subtitle: '*Cumulative last 1yr revenue',
                  value: revenue_model[key],
                });
                break;
              case 'fees_1ys':
                mapped_data.push({
                  title: 'Fees (1Y)',
                  subtitle: '*Cumulative last 1yr fees',
                  value: revenue_model[key],
                });
                break;
              default:
                break;
            }
          }
          setRevenues(mapped_data);
        }
      } catch (error) {
        console.log('Error trying to get revenue model data: ', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRevenueModelData(coin);
  }, [coin]);

  if (!loading && revenues?.length === 0) {
    handleSectionContent('revenueModel', true);
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <Loader />
      ) : revenues?.length === 0 ? (
        <NoContentMessage />
      ) : (
        <>
          {revenues.map((revenue, index) => {
            if (revenue.value === null) {
              return;
            } else {
              return (
                <View key={index} style={styles.itemContainer}>
                  <Image
                    style={styles.revenueImage}
                    resizeMode="contain"
                    source={require('../../../../../../../../assets/images/fundamentals/revenueModel.png')}
                  />
                  <View style={styles.textContainer}>
                    <Text style={styles.revenueTitle}>{revenue.title}</Text>
                    <Text style={styles.revenueSubtitle}>
                      {revenue.subtitle}
                    </Text>
                  </View>
                  <Text style={styles.revenueValue}>
                    {`$${formatNumber(revenue.value)}`}
                  </Text>
                </View>
              );
            }
          })}
        </>
      )}
    </View>
  );
};

export default UpdatedRevenueModel;
