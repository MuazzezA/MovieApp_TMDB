import React from 'react';
import {View, Pressable, Image} from 'react-native';
import {Text, Icon, StarVote} from '../../components';
import styles from './styles';

export const MovieCard = ({data, onPress}) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.imageContainer}>
        {data?.poster_path ? (
          <Image
            style={styles.image}
            resizeMode="cover"
            source={{
              uri: 'https://image.tmdb.org/t/p/w500/' + data.poster_path,
            }}
          />
        ) : (
          <View style={styles.image}>
            <Icon name="Play" />
          </View>
        )}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.overview} numberOfLines={4}>
          {data?.overview}
        </Text>
        <StarVote rating={data.vote_average} />
      </View>
    </Pressable>
  );
};
