import { KeyboardAvoidingView, TextInput, Text, View, Platform, StyleSheet } from 'react-native';
import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { Colors, Spacing, UserInputStyle } from '../styles';

/* The default component for user text input.
  Props:
    titleProps: The props for the Text component used for the title, if any.
    title: The title for the input, if any (sits above the TextInput)
    icon: A component to be rendered as an icon (i.e the eye for secure entry).
    error: An error message to display, if any.
    errorProps: Additional props for the error Text component.
    inputContainerProps: Any additional props for the View component that wraps
      the TextInput.
    mainContainerProps: Any additional props for the KeyboardAvoidingView that
      wraps the entire component
    rest: The rest of the props are passed as additional props for the TextInput
      component.
*/
function UserInput({
  titleProps,
  title,
  icon,
  error,
  errorProps,
  inputContainerProps,
  mainContainerProps,
  ...rest
}) {
  const { style: inputStyle, ...restInput } = { ...rest };
  const { style: inputContainerStyle, ...restInputContainer } = { ...inputContainerProps };
  const { style: mainContainerStyle, ...restMainContainer } = { ...mainContainerProps };
  const { style: errorStyle, ...restError } = { ...errorProps };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={[styles.mainContainer, mainContainerStyle]}
      {...restMainContainer}>
      {!!title && (
        <Text style={styles.title} {...titleProps}>
          {title}
        </Text>
      )}

      <View style={[UserInputStyle.view, inputContainerStyle]} {...restInputContainer}>
        <TextInput
          style={[UserInputStyle.text, inputStyle]}
          placeholderTextColor="#ffffff7f" // white with 0.5 opacity
          color="white"
          autoCapitalize="none"
          {...restInput}
        />
        {icon}
      </View>

      {!!error && (
        <Text style={[styles.error, errorStyle]} {...restError}>
          {error}
        </Text>
      )}
    </KeyboardAvoidingView>
  );
}

UserInput.propTypes = {
  titleProps: PropTypes.objectOf(PropTypes.object),
  title: PropTypes.string,
  icon: PropTypes.element, // Not sure about this one
  error: PropTypes.string,
  errorProps: PropTypes.objectOf(PropTypes.object),
  inputContainerProps: PropTypes.objectOf(PropTypes.object),
  mainContainerProps: PropTypes.objectOf(PropTypes.object),
};

UserInput.defaultProps = {
  titleProps: null,
  title: null,
  icon: null,
  error: null,
  errorProps: null,
  inputContainerProps: null,
  mainContainerProps: null,
};

/* Renders the two child UserInput components in the same row. They collectively take up the same
  width as a single UserInput component.
  Props:
    children: Exactly two UserInput components should be added as children.
*/
function DoubleUserInput({ children }) {
  const userInputs = Children.toArray(children);

  // Define the additional styling props for each of the children components
  const leftInputProps = {
    mainContainerProps: { style: styles.smallLeftMainContainer },
    inputContainerProps: { style: styles.smallInputContainer },
  };
  const rightInputProps = {
    mainContainerProps: { style: styles.smallRightMainContainer },
    inputContainerProps: { style: styles.smallInputContainer },
  };

  return (
    <View style={styles.doubleInputContainer}>
      <View style={styles.leftContainer}>{cloneElement(userInputs[0], { ...leftInputProps })}</View>
      <View style={styles.rightContainer}>
        {cloneElement(userInputs[1], { ...rightInputProps })}
      </View>
    </View>
  );
}

DoubleUserInput.propTypes = {
  // eslint-disable-next-line react/require-default-props
  children: (props, propName, componentName) => {
    const prop = props[propName];
    let error = null;

    if (!prop.length || prop.length !== 2) {
      error = new Error(`\`${componentName}\` should have exactly two children`);
    } else {
      Children.forEach(prop, (child) => {
        if (child.type !== UserInput) {
          error = new Error(`\`${componentName}\` children should be of type \`UserInput\`.`);
        }
      });
    }
    return error;
  },
};

const styles = StyleSheet.create({
  title: {
    marginLeft: Spacing.margin.medium,
    marginBottom: Spacing.margin.small,
    color: Colors.grey,
    opacity: 0.8,
    fontWeight: 'bold',
  },

  error: {
    marginLeft: Spacing.margin.medium,
    marginTop: Spacing.margin.small,
    color: Colors.red,
  },

  mainContainer: {
    marginBottom: Spacing.margin.small,
  },

  doubleInputContainer: {
    width: '80%',
    flexDirection: 'row',
  },

  leftContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },

  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },

  smallLeftMainContainer: {
    flex: 1,
    marginRight: Spacing.margin.base / 2,
  },

  smallRightMainContainer: {
    flex: 1,
    marginLeft: Spacing.margin.base / 2,
  },

  smallInputContainer: {
    width: '100%',
  },
});

export { UserInput, DoubleUserInput };
