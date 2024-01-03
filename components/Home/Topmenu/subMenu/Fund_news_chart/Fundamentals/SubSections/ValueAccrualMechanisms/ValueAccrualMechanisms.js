import {Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import Loader from '../../../../../../../Loader/Loader';
import useVAMStyles from './VAMStyles';

const MechanismsMenuItem = ({
  item,
  activeOption,
  handleOptionChange,
  styles,
}) => {
  return (
    <TouchableOpacity onPress={() => handleOptionChange(item)}>
      <View style={styles.menuItemContainer}>
        <View style={styles.iconContainer}>
          <Image
            style={[
              styles.itemIcon,
              activeOption.name === item.name && {tintColor: '#F98404'},
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

const MechanismsMenu = ({
  options,
  activeOption,
  handleOptionChange,
  styles,
}) => {
  return (
    <View style={styles.menuContainer}>
      {options.map((item, index) => (
        <MechanismsMenuItem
          key={index}
          item={item}
          activeOption={activeOption}
          handleOptionChange={handleOptionChange}
          styles={styles}
        />
      ))}
    </View>
  );
};

const ContentItem = ({data, styles}) => {
  return (
    <View style={styles.dataContainer}>
      <Text style={styles.dataTitle}>{data.title}</Text>
      <View style={styles.dataRow}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.dataImage}
            alt={data.name}
            source={data.image}
            resizeMode={'contain'}
          />
        </View>
        <Text style={styles.dataText}>{data.text}</Text>
      </View>
    </View>
  );
};

const ValueAccrualMechanisms = ({options, contentData}) => {
  const styles = useVAMStyles();
  const [activeOption, setActiveOption] = useState(options[0]);
  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    const activeOptionData = filterContentByOptions(contentData, activeOption);
    setFilteredData(activeOptionData);
  }, [activeOption, contentData]);

  const filterContentByOptions = (content, option) => {
    const filteredContent = [];
    content.forEach(obj => {
      if (obj.option === option.name) {
        obj.content.forEach(data => {
          filteredContent.push(data);
        });
      }
    });
    return filteredContent;
  };

  const handleOptionChange = option => {
    setActiveOption(option);
  };

  return (
    <View style={styles.container}>
      {activeOption && filteredData ? (
        <View>
          <MechanismsMenu
            options={options}
            handleOptionChange={handleOptionChange}
            activeOption={activeOption}
            styles={styles}
          />
          <View style={styles.content}>
            {filteredData &&
              filteredData.map((data, index) => (
                <ContentItem data={data} key={index} styles={styles} />
              ))}
          </View>
        </View>
      ) : (
        <Loader />
      )}
    </View>
  );
};

export default ValueAccrualMechanisms;
