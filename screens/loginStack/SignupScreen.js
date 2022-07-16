import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { useAuth } from '../../context/AuthContext';
import { LargeButton } from '../../components/Buttons';
import { UserInputStyle, ViewContainer, Spacing } from '../../styles';
import { DoubleUserInput, UserInput } from '../../components/UserInput';

const logoPath = require('../../assets/logo.jpg');

const initialErrors = {
  nameError: '',
  phoneError: '',
  emailError: '',
  passwordError: '',
  confirmPasswordError: '',
};

// Landline phones are 8 digits without the area code. Maybe we want 10 for mobile?
const MIN_PHONE_LENGTH = 8;
// Enforced by firebase
const MIN_PASSWORD_LENGTH = 6;

export default function SignupScreen({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState(initialErrors);
  const [loading, setLoading] = useState(false);
  const [secureText, setSecureText] = useState(true);
  const [confirmSecureText, setConfirmSecureText] = useState(true);

  const { signup, user } = useAuth();

  const secureTextIcon = (
    <TouchableOpacity onPress={() => setSecureText(!secureText)}>
      <Ionicons
        style={UserInputStyle.icon}
        name={secureText ? 'eye-off' : 'eye'}
        color="white"
        size={20}
      />
    </TouchableOpacity>
  );

  const confirmSecureTextIcon = (
    <TouchableOpacity onPress={() => setConfirmSecureText(!confirmSecureText)}>
      <Ionicons
        style={UserInputStyle.icon}
        name={confirmSecureText ? 'eye-off' : 'eye'}
        color="white"
        size={20}
      />
    </TouchableOpacity>
  );

  /* Check that the user inputs are valid and set error state accordingly.
    Returns true if valid and false otherwise.
  */
  const isValid = () => {
    // Note that state setters are asynchronous so the checks must be performed
    // synchronously rather than on the state object (errors) itself

    // Must create a new object otherwise the old one will be modified
    // Use structuredClone in the future when it is supported
    const updatedErrors = JSON.parse(JSON.stringify(initialErrors));

    if (!firstName || !surname) updatedErrors.nameError = 'Name is required';

    if (!phone) updatedErrors.phoneError = 'Phone number is required';
    else if (phone.length < MIN_PHONE_LENGTH) updatedErrors.phoneError = 'Invalid phone number';

    if (!email) updatedErrors.emailError = 'Email is required';
    else if (!email.includes('@')) updatedErrors.emailError = 'Invalid email address';

    if (!password) updatedErrors.passwordError = 'Password is required';
    else if (password.length < MIN_PASSWORD_LENGTH) {
      updatedErrors.passwordError = 'Password must be at least 6 characters';
    }

    if (password !== confirmPassword) updatedErrors.confirmPasswordError = 'Passwords do not match';

    console.log(JSON.stringify(updatedErrors));
    setErrors(updatedErrors);

    // Use the synchronously set updatedErrors to check for errors
    if (Object.values(updatedErrors).some((value) => value)) return false;
    return true;
  };

  const handleSignup = async () => {
    if (isValid()) {
      try {
        setLoading(true);
        await signup(email, password);
        navigation.navigate('LoginScreen');
        console.log(user);
      } catch (e) {
        Alert.alert(
          'Sign Up Failed',
          `Failed to create an account. Please check your details and try again. 
          If the error persists seek assistance.`
        );
        console.log(e);
        setLoading(false);
      }
    } else {
      Alert.alert('Invalid details', 'Please check your details and try again.');
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        <Image style={styles.image} source={logoPath} />

        <DoubleUserInput>
          <UserInput
            title="First Name"
            placeholder="First Name"
            error={errors.nameError}
            autoCapitalize="words"
            onChangeText={(text) => setFirstName(text)}
          />
          <UserInput
            title="Surname"
            placeholder="Surname"
            autoCapitalize="words"
            onChangeText={(text) => setSurname(text)}
          />
        </DoubleUserInput>

        <UserInput
          title="Phone Number"
          placeholder="Phone Number"
          error={errors.phoneError}
          keyboardType="numeric"
          maxLength={12}
          onChangeText={(text) => setPhone(text)}
        />

        <UserInput
          title="Email"
          placeholder="Email"
          error={errors.emailError}
          onChangeText={(text) => setEmail(text)}
          textContentType="username" // Or should it be email?
        />

        <UserInput
          title="Password"
          placeholder="Password"
          error={errors.passwordError}
          secureTextEntry={secureText}
          onChangeText={(text) => setPassword(text)}
          textContentType="password"
          icon={secureTextIcon}
        />

        <UserInput
          title="Confirm Password"
          placeholder="Confirm Password"
          error={errors.confirmPasswordError}
          secureTextEntry={confirmSecureText}
          onChangeText={(text) => setConfirmPassword(text)}
          textContentType="password"
          icon={confirmSecureTextIcon}
        />

        <LargeButton
          text="Sign Up"
          style={styles.signupBtn}
          onPress={() => {
            handleSignup();
          }}
          disabled={loading}
        />

        {password === confirmPassword ? (
          <Text>Please check your email for confirmation after signing up.</Text>
        ) : (
          <Text style={styles.warningText}>Passwords do not match!</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

SignupScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func.isRequired }).isRequired,
};

const styles = StyleSheet.create({
  mainContainer: {
    ...ViewContainer.base,
    alignItems: 'stretch',
    flexGrow: 1,
  },

  scrollContentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    paddingBottom: Spacing.padding.medium,
  },

  image: {
    height: 125,
    width: 125,
    marginBottom: 40,
  },

  warningText: {
    color: 'red',
  },

  signupBtn: {
    marginTop: Spacing.margin.base,
  },
});
