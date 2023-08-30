import React from 'react';
import {View} from 'react-native';
import {Icon} from '../icon';
import styles from './styles';

export const StarVote = ({rating}) => {
  const stars = [];
  const normalizedRating = Math.round(rating / 2);

  for (let i = 0; i < 5; i++) {
    const iconName = i <= normalizedRating ? 'StarFill' : 'StarEmpty';
    stars.push(<Icon key={i} name={iconName} />);
  }

  return <View style={styles.container}>{stars}</View>;
};
