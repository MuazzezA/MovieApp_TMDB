import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

const colors = {
  black: '#000000',
  white: '#ffffff',
  gray: '#EFEFF0',
  success: '#4caf50',
  error: '#f44336',
  warning: '#ffeb3b',
};

const sizes = {
  h1: 22,
  h7: 14,
  h8: 12,
  base: 16,
  radius: 12,
  padding: 20,
  width,
  height,
  componentHeight: 38,
  inputHeight: 44,
};

export {colors, sizes};
