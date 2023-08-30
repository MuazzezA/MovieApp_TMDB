import {StyleSheet} from 'react-native';
import {sizes} from '../../utils/theme';

export default StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    height: sizes.componentHeight,
  },
  leftIcon: {
    position: 'absolute',
    left: 0,
  },
  rightIcon: {
    position: 'absolute',
    right: 0,
  },
});
