import React from 'react';
import {Text as RNText} from 'react-native';
import styles from './styles';

export const Text = ({children, style, ...rest}) => {
  return (
    <RNText
      allowFontScaling={false}
      style={[styles.text, {...style}]}
      {...rest}>
      {children}
    </RNText>
  );
};
