// Defines a useful dispatch function to handle state objects
// see https://stackoverflow.com/a/71093607/17888937

const stateReducer = (state, action) => {
  return {
    ...state,
    ...(typeof action === 'function' ? action(state) : action),
  };
};

export default stateReducer;
