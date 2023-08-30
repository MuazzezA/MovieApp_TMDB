import React from 'react';
import {Pressable, View} from 'react-native';
import {Icon} from '../icon';
import styles from './styles';

export const Header = ({
  leftIcon,
  onPressLeftIcon,
  favorite,
  onPressFavorite,
}) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={onPressLeftIcon} style={styles.leftIcon}>
        <Icon name={leftIcon} />
      </Pressable>

      {favorite !== undefined && (
        <Pressable onPress={onPressFavorite} style={styles.rightIcon}>
          <Icon name={favorite ? 'HeartFill' : 'Heart'} />
        </Pressable>
      )}
    </View>
  );
};
