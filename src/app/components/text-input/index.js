import React from 'react';
import {View, TextInput as RNInput} from 'react-native';
import {Icon} from '../icon';
import styles from './styles';
import {colors} from '../../utils/theme';

export const TextInput = ({value, onChangeText, ...rest}) => {
  return (
    <View style={styles.container}>
      <Icon name="Magnify" />
      <RNInput
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        placeholder="Search"
        placeholderTextColor={colors.darkGray}
        {...rest}
      />
    </View>
  );
};
