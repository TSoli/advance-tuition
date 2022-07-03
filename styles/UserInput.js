// Defines style for user input

import * as Colors from './Colors'
import * as Spacing from './Spacing'

export const text = {
  width: "100%",
  flex: 1,
  padding: Spacing.padding.base,
  marginHorizontal: Spacing.margin.base,
};

export const view = {
  backgroundColor: Colors.primary,
  borderRadius: 30,
  width: "80%",
  height: 45,
  marginBottom: Spacing.margin.base,
  alignItems: "center",
  flexDirection: "row",
}; 

export const mediumView = {
  backgroundColor: Colors.primary,
  borderRadius: 30,
  width: "80%",
  height: 85,
  marginBottom: Spacing.margin.base,
  alignItems: "flex-start",
  flexDirection: "row",
};