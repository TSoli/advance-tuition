// Defines style for user input

import * as Colors from './Colors';
import * as Spacing from './Spacing';

export const text = {
  width: '100%',
  flex: 1,
  padding: Spacing.padding.base,
  marginHorizontal: Spacing.margin.base,
};

export const icon = {
  marginRight: Spacing.margin.medium,
};

export const view = {
  backgroundColor: Colors.primary,
  borderRadius: 25,
  width: '80%',
  height: 45,
  alignItems: 'center',
  justifyContent: 'flex-start',
  flexDirection: 'row',
};

export const container = {
  marginBottom: Spacing.margin.base,
};

export const mediumView = {
  backgroundColor: Colors.primary,
  borderRadius: 30,
  width: '80%',
  height: 85,
  marginBottom: Spacing.margin.base,
  alignItems: 'flex-start',
  flexDirection: 'row',
};
