// Defines some styles for View containers
import { Platform, StatusBar, StyleSheet, ViewStyle } from 'react-native';
import * as Colors from './Colors';

interface Styles {
  base: ViewStyle;
  topLeft: ViewStyle;
}

const ViewContainer = StyleSheet.create<Styles>({
  base: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },

  topLeft: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});

export default ViewContainer;
