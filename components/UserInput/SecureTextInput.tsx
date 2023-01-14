import React, { useState } from 'react';
import { TextInputProps, TouchableOpacity } from 'react-native';
import { UserInputStyle } from '../../styles';
import SecureTextIcon from '../SecureTextIcon';
import { UserInput } from './UserInput';

interface SecureTextInputProps {
  /** The title displayed above the input */
  title?: string | null;
  /** The error message displayed below the input */
  error?: string | null;
  /** Shows the icon to toggle the secure text entry mode */
  showIcon?: boolean;
}

/** A text input that hides the text as it is typed
 *
 * @remarks
 *
 * By default, the secure text entry mode is enabled. Extra props that are valid
 * for a TextInput can be passed. By default, the placeholder is the same as the
 * title and the textContentType is "password".
 */
const SecureTextInput = ({
  title = null,
  error = null,
  ...rest
}: SecureTextInputProps & TextInputProps) => {
  const [secureText, setSecureText] = useState(true);
  const toggleSecureText = () => {
    setSecureText((prev) => !prev);
  };

  const icon = (
    <TouchableOpacity onPress={toggleSecureText}>
      <SecureTextIcon secureText={secureText} style={UserInputStyle.icon} />
    </TouchableOpacity>
  );

  return (
    <UserInput
      title={title}
      placeholder={title}
      error={error}
      secureTextEntry={secureText}
      textContentType="password"
      icon={icon}
      {...rest}
      // These can be removed once UserInput is properly converted to tsx
      titleProps={undefined}
      errorProps={undefined}
      inputContainerProps={undefined}
      mainContainerProps={undefined}
    />
  );
};

export default SecureTextInput;
