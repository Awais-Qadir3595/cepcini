import {StyleSheet} from 'react-native';
import {BaseColor} from './theme';

/**
 * Common basic style defines
 */
export const BaseStyle = StyleSheet.create({
  textInput: {
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 10,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
    // borderTopRightRadius: 20,
    // borderTopColor: BaseColor.secondary2,
    // borderRightColor: BaseColor.secondary2,
    // borderLeftColor: BaseColor.secondary2,
    // borderBottomColor: BaseColor.secondary2,
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: BaseColor.primary,
    // paddingHorizontal: 16,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
