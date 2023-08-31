import {StyleSheet} from 'react-native';
import {colors, sizes} from '../../utils/theme';

export default StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: sizes.padding,
    paddingTop: sizes.padding,
    backgroundColor: colors.white,
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: sizes.padding * 2,
  },
  image: {
    width: '100%',
    height: sizes.width * 0.9,
    borderRadius: sizes.radius,
    marginVertical: sizes.padding,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: sizes.h1,
    width: '40%',
    paddingBottom: sizes.padding * 0.5,
  },
  descContainer: {
    flexDirection: 'row',
    paddingTop: sizes.padding,
  },
  subtitle: {
    fontFamily: 'Inter-Bold',
    fontSize: sizes.h7,
    paddingTop: sizes.padding,
  },
  descTitleText: {
    fontFamily: 'Inter-Bold',
    fontSize: sizes.base,
    paddingTop: sizes.padding,
    paddingBottom: sizes.padding * 0.5,
  },
  descText: {
    fontFamily: 'Inter-Regular',
  },
});
