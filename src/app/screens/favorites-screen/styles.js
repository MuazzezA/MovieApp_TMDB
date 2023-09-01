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
  titleText: {
    fontSize: sizes.h1,
    fontFamily: 'Inter-Bold',
    marginVertical: sizes.padding * 0.5,
  },
  shortButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: sizes.padding,
  },
  infoContainer: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notdataTitle: {
    fontSize: sizes.h7,
    fontFamily: 'Inter-Medium',
    paddingVertical: sizes.padding * 0.5,
  },
  notdataDesc: {
    fontSize: sizes.h8,
    fontFamily: 'Inter-Light',
    textAlign: 'center',
    color: colors.darkGray,
  },
  button: {
    marginTop: sizes.padding,
    borderColor: colors.darkGray,
    borderWidth: 1,
    borderRadius: sizes.radius,
  },
});
