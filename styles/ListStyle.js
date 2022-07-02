// Defines the styling for an item in a list

import * as Spacing from './Spacing';
import * as Colors from './Colors';

export const listItem = {
  flexDirection: "row",
  padding: Spacing.padding.base,
  borderBottomWidth: 1,
  borderBottomColor: Colors.grey,
  width: "100%",
};

export const list = {
  base: {
    width: "100%",
    padding: Spacing.padding.base,
  },
}