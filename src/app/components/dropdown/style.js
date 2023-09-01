import {StyleSheet} from 'react-native';
import {colors, sizes} from '../../utils/theme';

export default StyleSheet.create({
  root: {
    width: sizes.width * 0.42,
    backgroundColor: colors.gray,
    height: sizes.componentHeight,
    borderRadius: sizes.radius,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  body: {
    padding: 5,
    marginTop: sizes.radius,
    position: 'absolute',
    height: 250,
    backgroundColor: colors.gray,
  },
  bodyBackground: {
    backgroundColor: colors.white,
    borderRadius: 10,
    overflow: 'hidden',
  },
  title: {
    color: colors.black,
    fontSize: sizes.h8,
    fontFamily: 'Inter-Medium',
    paddingLeft: 10,
  },
  buttonItem: {width: sizes.width * 0.9, padding: 10, marginVertical: 2},
});
