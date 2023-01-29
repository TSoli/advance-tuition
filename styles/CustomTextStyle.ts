// Defines some common text styles for the app

import { StyleSheet, TextStyle } from 'react-native';

const FontSize = {
  small: 14,
  medium: 16,
  large: 24,
  extraLarge: 36,
};

interface Styles {
  titleNoMargin: TextStyle;
  title: TextStyle;
  paragraph: TextStyle;
}

const CustomTextStyle = StyleSheet.create<Styles>({
  titleNoMargin: {
    fontSize: FontSize.large,
    fontWeight: 'bold',
  },

  title: {
    fontSize: FontSize.large,
    fontWeight: 'bold',
    marginBottom: 30,
  },

  paragraph: {
    textAlign: 'justify',
  },
});

export default CustomTextStyle;
export { FontSize };
