// Defines some common text styles for the app

export const fontSize = {
  small: 14,
  medium: 16,
  large: 24,
  extraLarge: 36,
};

export const titleNoMargin = {
  fontSize: fontSize.large,
  fontWeight: "bold",
};

export const title = {
  ...titleNoMargin,
  marginBottom: 30,
};
