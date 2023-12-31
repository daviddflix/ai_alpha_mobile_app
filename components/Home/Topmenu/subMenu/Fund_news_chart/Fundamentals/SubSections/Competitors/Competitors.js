import {Text, View, TouchableOpacity, ScrollView, Image} from 'react-native';
import React, {useContext, useState} from 'react';
import TypeOfToken from './CompetitorSections/TypeOfToken/TypeOfToken';
import CompetitorSection from './CompetitorSections/CompetitorSection';
import CirculatingSupply from './CompetitorSections/CirculatingSupply/CirculatingSupply';
import DailyActiveUsers from './CompetitorSections/DailyActiveUsers/DailyActiveUsers';
import TransactionFees from './CompetitorSections/TransactionFees/TransactionFees';
import CurrentMarketCap from './CompetitorSections/CurrentMarketCap/CurrentMarketCap';
import TotalValueLocked from './CompetitorSections/TVL/Tvl';
import TransactionSpeed from './CompetitorSections/TransactionSpeed/TransactionSpeed';
import Apr from './CompetitorSections/APR/Apr';
import Revenue from './CompetitorSections/Revenue/Revenue';
import ActiveDevelopers from './CompetitorSections/ActiveDevelopers/ActiveDevelopers';
import InflationRate from './CompetitorSections/InflationRate/InflationRate';
import useCompetitorsStyles from './CompetitorsStyles';
import {AppThemeContext} from '../../../../../../../../context/themeContext';

const MenuItem = ({item, activeOption, handleOptionChange, styles}) => {
  const {theme} = useContext(AppThemeContext);
  return (
    <TouchableOpacity onPress={() => handleOptionChange(item)}>
      <View style={styles.menuItemContainer}>
        <View style={styles.iconContainer}>
          <Image
            style={[
              styles.itemIcon,
              activeOption.name === item.name && {tintColor: theme.orange},
            ]}
            resizeMode={'contain'}
            source={item.icon}
          />
        </View>
        <Text
          style={[
            styles.menuItemName,
            activeOption.name === item.name && styles.activeItem,
          ]}>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const CompetitorsMenu = ({
  options,
  activeOption,
  handleOptionChange,
  styles,
}) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.menuContainer}>
        {options.map((item, index) => (
          <MenuItem
            key={index}
            item={item}
            activeOption={activeOption}
            handleOptionChange={handleOptionChange}
            styles={styles}
          />
        ))}
      </View>
    </ScrollView>
  );
};

// Todo - Move content outside the component

const Competitors = () => {
  const styles = useCompetitorsStyles();
  const cryptosData = [
    {
      crypto: 'Ethereum',
      symbol: 'ETH',
      image: require('../../../../../../../../assets/ETH.png'),
      maxValue: Infinity,
      percentageValue: 100,
      inflationary: false,
      marketCap: [250.3, 250331978.508],
      tvl: 26.6,
      color: '#399AEA',
      tps: [11.14],
      fee: 1.3,
      apr: 4.44,
      revenue: 2.48,
      activeDevs: 162.87,
      inflationRate: [
        {year: 2022, value: 4.5},
        {year: 2023, value: -0.16},
      ],
    },
    {
      crypto: 'Solana',
      symbol: 'SOL',
      image: require('../../../../../../../../assets/SOL.png'),
      maxValue: Infinity,
      percentageValue: 75,
      inflationary: null,
      marketCap: [25.7, 25696025.115],
      tvl: 0.67,
      color: '#20CBDD',
      tps: [65000],
      fee: 0.01,
      apr: 8.69,
      revenue: 0.019,
      activeDevs: 82.57,
      inflationRate: [
        {year: 2022, value: 8},
        {year: 2023, value: 7},
      ],
    },
    {
      crypto: 'Cardano',
      symbol: 'ADA',
      image: require('../../../../../../../../assets/ADA.png'),
      maxValue: '45 billion ADA',
      percentageValue: 78,
      inflationary: true,
      marketCap: [13.4, 13412098.765],
      tvl: 0.25,
      color: '#895EF6',
      tps: [1000],
      fee: 0.07,
      apr: 6.94,
      revenue: 0.16,
      activeDevs: 166.8,
      inflationRate: [
        {year: 2022, value: 4.72},
        {year: 2023, value: 2.58},
      ],
    },
    {
      crypto: 'Avalanche',
      symbol: 'AVAX',
      image: require('../../../../../../../../assets/AVAX.png'),
      maxValue: '720 million AVAX',
      percentageValue: 49,
      inflationary: false,
      marketCap: [7.9, 7974837.865],
      tvl: 3,
      color: '#C539B4',
      tps: [4500, 6500],
      fee: 0.96,
      apr: 3.14,
      revenue: 0.033,
      activeDevs: 47.17,
      inflationRate: null,
    },
  ];

  const content = [
    {
      name: 'Type Of Token',
      component: <TypeOfToken tokens={cryptosData} />,
      icon: require('../../../../../../../../assets/images/fundamentals/competitors/typeoftoken.png'),
    },
    {
      name: 'Circulating Supply',
      component: <CirculatingSupply cryptos={cryptosData} />,
      icon: require('../../../../../../../../assets/images/fundamentals/competitors/circulatingsupply.png'),
    },
    {
      name: 'Current Market Cap',
      component: <CurrentMarketCap cryptos={cryptosData} />,
      icon: require('../../../../../../../../assets/images/fundamentals/competitors/cmc.png'),
    },
    {
      name: 'TVL',
      component: <TotalValueLocked cryptos={cryptosData} />,
      icon: require('../../../../../../../../assets/images/fundamentals/competitors/TVL.png'),
    },
    {
      name: 'Daily Active Users',
      component: <DailyActiveUsers cryptos={cryptosData} />,
      icon: require('../../../../../../../../assets/images/fundamentals/competitors/dailyusers.png'),
    },
    {
      name: 'Transaction Fees',
      component: <TransactionFees cryptos={cryptosData} />,
      icon: require('../../../../../../../../assets/images/fundamentals/competitors/tfee.png'),
    },
    {
      name: 'Transaction Speed',
      component: <TransactionSpeed cryptos={cryptosData} />,
      icon: require('../../../../../../../../assets/images/fundamentals/competitors/tspeed.png'),
    },
    {
      name: 'Inflation Rate',
      component: <InflationRate cryptos={cryptosData} />,
      icon: require('../../../../../../../../assets/images/fundamentals/competitors/inflationrate.png'),
    },
    {
      name: 'APR',
      component: <Apr cryptos={cryptosData} />,
      icon: require('../../../../../../../../assets/images/fundamentals/competitors/apr.png'),
    },
    {
      name: 'Active Developers',
      component: <ActiveDevelopers cryptos={cryptosData} />,
      icon: require('../../../../../../../../assets/images/fundamentals/competitors/activedevs.png'),
    },
    {
      name: 'Revenue',
      component: <Revenue cryptos={cryptosData} />,
      icon: require('../../../../../../../../assets/images/fundamentals/competitors/revenue.png'),
    },
  ];

  const [activeOption, setActiveOption] = useState(content[0]);

  const handleOptionChange = option => {
    setActiveOption(option);
  };

  return (
    <View style={styles.container}>
      <CompetitorsMenu
        options={content}
        activeOption={activeOption}
        handleOptionChange={handleOptionChange}
        styles={styles}
      />
      <View style={styles.selectedOptionContent}>
        <CompetitorSection
          title={activeOption.name}
          component={activeOption.component}
          styles={styles}
        />
      </View>
    </View>
  );
};

export default Competitors;
