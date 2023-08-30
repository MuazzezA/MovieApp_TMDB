import {StyleSheet} from 'react-native';
import {colors, sizes} from '../../utils/theme';

export default StyleSheet.create({
  container: {
    width: sizes.width * 0.9,
    height: sizes.height * 0.2,
    flexDirection: 'row',
    marginVertical: sizes.padding,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: sizes.radius,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.gray,
  },
  textContainer: {
    flex: 2,
    paddingLeft: sizes.base,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontFamily: 'Inter-Regular',
    flex: 1,
  },
  overview: {
    fontFamily: 'Inter-Light',
    width: '98%',
    flex: 2,
    paddingBottom: sizes.padding,
  },
});
