import { ReactElement } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { Colors, Spacing, UserInputStyle } from '../../styles';

interface UserInputProps extends TextInputProps {
  title?: string;
  icon?: JSX.Element; // Might be a better type here
  error?: string;
  size?: 'line' | 'half-line' | 'medium';
}

/* The default component for user text input.
  Props:
    title: The title for the input, if any (sits above the TextInput)
    icon: A component to be rendered as an icon (i.e the eye for secure entry).
    error: An error message to display, if any.
    rest: The rest of the props are passed as additional props for the TextInput
      component.
*/
const UserInput = ({ title, icon, error, size, ...rest }: UserInputProps) => {
  const { style: inputStyle, ...restInput } = { ...rest };

  let viewStyle;
  switch (size) {
    case 'medium':
      viewStyle = UserInputStyle.mediumView;
      break;
    case 'half-line':
      viewStyle = [UserInputStyle.view, styles.smallInputContainer];
      break;
    default:
      viewStyle = UserInputStyle.view;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.mainContainer}>
      {!!title && <Text style={styles.title}>{title}</Text>}

      <View style={viewStyle}>
        <TextInput
          style={[UserInputStyle.text, inputStyle]}
          placeholderTextColor={Colors.white50}
          autoCapitalize="none"
          {...restInput}
        />
        {icon}
      </View>

      {!!error && <Text style={styles.error}>{error}</Text>}
    </KeyboardAvoidingView>
  );
};

interface DoubleUserInputProps {
  children: [ReactElement<UserInputProps>, ReactElement<UserInputProps>];
}

/* Renders the two child UserInput components in the same row. They collectively take up the same
  width as a single UserInput component.
  Props:
    children: Exactly two UserInput components should be added as children.
*/
const DoubleUserInput = ({ children }: DoubleUserInputProps) => {
  return (
    <View style={styles.doubleInputContainer}>
      <View style={styles.leftContainer}>
        <>{children[0]}</>
      </View>
      <View style={styles.rightContainer}>
        <>{children[1]}</>
      </View>
    </View>
  );
};

interface Styles {
  title: TextStyle;
  error: TextStyle;
  mainContainer: ViewStyle;
  doubleInputContainer: ViewStyle;
  leftContainer: ViewStyle;
  rightContainer: ViewStyle;
  smallLeftMainContainer: ViewStyle;
  smallRightMainContainer: ViewStyle;
  smallInputContainer: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
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
    marginRight: Spacing.margin.base / 2,
  },

  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
    marginLeft: Spacing.margin.base / 2,
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
