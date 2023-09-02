import {StyleSheet} from 'react-native';
import {colors, sizes} from '../../utils/theme';

export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: sizes.padding,
    paddingHorizontal: sizes.padding,
  },
  seperator: {
    height: 1,
    backgroundColor: colors.gray,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  titleText: {
    fontSize: sizes.h1,
    fontFamily: 'Inter-Bold',
    marginVertical: 10,
  },
  shortButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: sizes.padding,
    height: sizes.componentHeight,
    position: 'absolute',
    top: sizes.componentHeight * 3,
    zIndex: -1,
    alignSelf: 'center',
    width: '100%',
  },
  activityIndicator: {
    flex: 0.8,
    justifyContent: 'center',
  },
  noResultText: {
    fontSize: sizes.h7,
    textAlign: 'center',
    marginTop: sizes.padding * 2,
  },
  flatList: {
    paddingTop: 50,
    zIndex: -2,
    marginTop: sizes.base * 0.5,
  },
});
