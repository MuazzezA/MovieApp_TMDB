import {StyleSheet} from 'react-native';
import {colors, sizes} from '../../utils/theme';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray,
    backgroundColor: colors.gray,
    borderRadius: sizes.radius,
    paddingVertical: sizes.padding * 0.5,
    paddingHorizontal: sizes.padding * 0.5,
    height: sizes.inputHeight,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: sizes.h7,
    paddingLeft: 10,
    color: '#333',
  },
});
