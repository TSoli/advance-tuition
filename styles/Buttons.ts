// Defines some general buttons to use

import { StyleSheet, ViewStyle } from 'react-native';

interface BaseStyles {
  medium: ViewStyle;
  large: ViewStyle;
  rounded: ViewStyle;
  outlined: ViewStyle;
  action: ViewStyle;
}

interface Styles extends BaseStyles {
  mediumRounded: ViewStyle;
  largeRounded: ViewStyle;
}

const Base = StyleSheet.create<BaseStyles>({
  medium: {
    width: '40%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },

  large: {
    width: '70%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },

  rounded: {
    borderRadius: 25,
  },

  outlined: {
    borderWidth: 2,
  },

  action: {
    height: 75,
    width: 75,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25, // Maybe try 100?
  },
});

const Buttons = StyleSheet.create<Styles>({
  ...Base,

  mediumRounded: {
    ...Base.medium,
    ...Base.rounded,
  },

  largeRounded: {
    ...Base.large,
    ...Base.rounded,
  },
});

export default Buttons;
