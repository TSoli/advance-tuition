import { KeyboardAvoidingView, TextInput, Text, View, Platform, StyleSheet } from 'react-native';
import React from 'react';
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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.mainContainer, mainContainerStyle]}
      {...restMainContainer}>
      {title && (
        <Text style={styles.title} {...titleProps}>
          {title}
        </Text>
      )}

      <View style={[UserInputStyle.view, inputContainerStyle]} {...restInputContainer}>
        <TextInput
          style={[UserInputStyle.text, inputStyle]}
          placeholderTextColor="white"
          color="white"
          autoCapitalize="none"
          {...restInput}
        />
        {icon}
      </View>

      {error && <Text style={styles.error}>{error}</Text>}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  title: {
    marginLeft: Spacing.margin.medium,
    marginBottom: Spacing.margin.small,
    color: Colors.grey,
    opacity: 0.8,
    fontWeight: 'bold',
  },

  error: {
    marginLeft: Spacing.margin.base,
    marginTop: Spacing.margin.small,
    color: Colors.red,
  },

  mainContainer: {
    marginBottom: Spacing.margin.base,
  },
});

export default UserInput;
