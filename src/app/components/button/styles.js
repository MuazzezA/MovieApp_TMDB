import {StyleSheet} from 'react-native';
import {colors, sizes} from '../../utils/theme';

export default StyleSheet.create({
  button: {
    width: sizes.width * 0.42,
    backgroundColor: colors.gray,
    height: sizes.componentHeight,
    borderRadius: sizes.radius,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconButton: {
    width: sizes.base,
    height: sizes.base,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    position: 'absolute',
    left: sizes.padding * 0.7,
  },
  titleText: {
    fontFamily: 'Inter-Medium',
    position: 'absolute',
    fontSize: sizes.h8,
    paddingLeft: sizes.padding,
  },
});
