import {StyleSheet} from 'react-native';
import {colors, sizes} from '../../utils/theme';

export default StyleSheet.create({
  button: {
    width: sizes.width * 0.45,
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
    left: sizes.padding,
  },
  titleText: {
    fontFamily: 'Inter-Medium',
    position: 'absolute',
    paddingLeft: sizes.padding,
  },
});
