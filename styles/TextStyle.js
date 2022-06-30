// Defines some common text styles for the app

export const fontSize = {
  large: 24,
  medium: 16,
  small: 14,
};

export const titleNoMargin = {
  fontSize: fontSize.large,
  fontWeight: "bold",
};

export const title = {
  ...titleNoMargin,
  marginBottom: 30,
};
