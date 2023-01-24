// Defines style for user input
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import * as Colors from './Colors';
import * as Spacing from './Spacing';

interface Styles {
  text: TextStyle;
  icon: ViewStyle;
  view: ViewStyle;
  container: ViewStyle;
  mediumView: ViewStyle;
}

const UserInputStyle = StyleSheet.create<Styles>({
  text: {
    width: '100%',
    flex: 1,
    padding: Spacing.padding.base,
    marginHorizontal: Spacing.margin.base,
    color: Colors.white,
  },

  icon: {
    marginRight: Spacing.margin.medium,
  },

  view: {
    backgroundColor: Colors.primary,
    borderRadius: 25,
    width: '80%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },

  container: {
    marginBottom: Spacing.margin.base,
  },

  mediumView: {
    backgroundColor: Colors.primary,
    borderRadius: 30,
    width: '80%',
    height: 85,
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
});

export default UserInputStyle;
