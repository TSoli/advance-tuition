import { useState } from 'react';
import { TextInputProps, TouchableOpacity } from 'react-native';
import { UserInputStyle } from '../../styles';
import SecureTextIcon from '../SecureTextIcon';
import { UserInput } from './UserInput';

interface SecureTextInputProps {
  /** The title displayed above the input */
  title?: string;
  /** The error message displayed below the input */
  error?: string;
}

/** A text input that hides the text as it is typed.
 *
 * @remarks
 *
 * By default, the secure text entry mode is enabled. Extra props that are valid
 * for a TextInput can be passed. By default, the placeholder is the same as the
 * title and the textContentType is "password".
 */
const SecureTextInput = ({ title, error, ...rest }: SecureTextInputProps & TextInputProps) => {
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
    />
  );
};

export default SecureTextInput;
