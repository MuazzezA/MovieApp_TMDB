import React from 'react';
import {View, Pressable} from 'react-native';
import styles from './styles';
import {Text} from '../text';
import {Icon} from '../icon';

export const Button = ({title, onPress, style, icon}) => {
  return (
    <Pressable style={[style]} onPress={onPress}>
      {title ? (
        <View style={styles.button}>
          <View style={styles.iconContainer}>
            <Icon name={icon} />
          </View>
          <Text style={styles.titleText}>{title}</Text>
        </View>
      ) : (
        <View style={styles.iconButton}>
          <Icon name={icon} />
        </View>
      )}
    </Pressable>
  );
};
