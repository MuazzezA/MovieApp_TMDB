import React, {useState, useRef} from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Animated,
  Text,
  Pressable,
  FlatList,
} from 'react-native';
import {Icon} from '../';
import style from './style';

const ItemButton = ({item, selectedValue, onPress}) => {
  const selectedIds = selectedValue.map(selectedItem => selectedItem.id);
  const isItemSelected = selectedIds.includes(item.id);

  return (
    <Pressable onPress={onPress} style={style.buttonItem}>
      <Text
        style={[
          style.itemText,
          {
            fontWeight: isItemSelected ? '800' : '400',
          },
        ]}>
        {item.name}
      </Text>
    </Pressable>
  );
};

export const DropDown = ({
  title,
  data,
  icon,
  selectedValue,
  setSelectedValue,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [bodySectionHeight, setBodySectionHeight] = useState(0);

  const animatedController = useRef(new Animated.Value(0)).current;

  const bodyHeight = animatedController.interpolate({
    inputRange: [0, 1],
    outputRange: [0, bodySectionHeight],
  });

  const itemVisible = () => {
    if (isOpen) {
      Animated.timing(animatedController, {
        duration: 200,
        toValue: 0,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animatedController, {
        duration: 200,
        toValue: 1,
        useNativeDriver: false,
      }).start();
    }
    setIsOpen(!isOpen);
  };
  const setValues = item => {
    if (selectedValue.some(selectedItem => selectedItem.id === item.id)) {
      setSelectedValue(
        selectedValue.filter(selectedItem => selectedItem.id !== item.id),
      );
    } else {
      setSelectedValue([...selectedValue, item]);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => itemVisible()}>
      <View>
        <View style={style.root}>
          <Icon name={icon} />
          <Text style={style.title}>
            {title} ({selectedValue.length})
          </Text>
        </View>
        <TouchableWithoutFeedback onPress={() => itemVisible()}>
          <Animated.View
            panResponder={!isOpen}
            onStartShouldSetPanResponder={() => true}
            style={[style.bodyBackground, {height: bodyHeight}]}>
            <View
              onLayout={e => {
                setBodySectionHeight(e.nativeEvent.layout.height);
              }}
              style={style.body}>
              <FlatList
                data={data}
                renderItem={({item}) => (
                  <ItemButton
                    key={item.id}
                    item={item}
                    selectedValue={selectedValue}
                    onPress={() => setValues(item)}
                  />
                )}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
};
