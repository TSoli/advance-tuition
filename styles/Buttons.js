// Defines some general buttons to use

export const medium = {
  width: '40%',
  height: 45,
  alignItems: 'center',
  justifyContent: 'center',
};

export const large = {
  width: '70%',
  height: 45,
  alignItems: 'center',
  justifyContent: 'center',
};

export const rounded = {
  borderRadius: 25,
};

export const outlined = {
  borderWidth: 2,
};

export const mediumRounded = {
  ...medium,
  ...rounded,
};

export const largeRounded = {
  ...large,
  ...rounded,
};

export const action = {
  height: 75,
  width: 75,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 25, // Maybe try 100?
};
