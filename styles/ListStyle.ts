// Defines the styling for an item in a list

import { StyleSheet, ViewStyle } from 'react-native';
import * as Colors from './Colors';
import * as Spacing from './Spacing';

interface List {
  base: ViewStyle;
}

const list = StyleSheet.create<List>({
  base: {
    width: '100%',
    padding: Spacing.padding.base,
  },
});

interface Styles {
  listItem: ViewStyle;
  list: List;
}

const ListStyle: Styles = {
  listItem: {
    flexDirection: 'row',
    padding: Spacing.padding.base,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey,
    width: '100%',
  },

  list: list,
};

export default ListStyle;
