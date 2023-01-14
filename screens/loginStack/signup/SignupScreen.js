import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { LargeButton } from '../../../components/Buttons';
import { Loading } from '../../../components/Loading';
import SecureTextInput from '../../../components/UserInput/SecureTextInput';
import { DoubleUserInput, UserInput } from '../../../components/UserInput/UserInput';
import { useAuth } from '../../../context/AuthContext';
import { Spacing, UserInputStyle, ViewContainer } from '../../../styles';

const logoPath = require('../../../assets/logo.jpg');

const initialUserInfo = {
  firstName: '',
  surname: '',
  phone: '',
  email: '',
  password: '',
  confirmPassword: '',
  street: '',
  unitNumber: '',
  suburb: '',
  postcode: '',
};

const initialErrors = {
  name: '',
  phone: '',
  email: '',
  password: '',
  confirmPassword: '',
  street: '',
  postcode: '',
};

// Landline phones are 8 digits without the area code. Maybe we want 10 for mobile?
const MIN_PHONE_LENGTH = 8;
const MAX_PHONE_LENGTH = 12; // idk lol
// Enforced by firebase
const MIN_PASSWORD_LENGTH = 6;
// True for Australia
const POSTCODE_LENGTH = 4;

export default function SignupScreen({ navigation }) {
  const [userInfo, setUserInfo] = useState(initialUserInfo);
  const [errors, setErrors] = useState(initialErrors);
  const [loading, setLoading] = useState(false);
  const [secureText, setSecureText] = useState(true);
  const [confirmSecureText, setConfirmSecureText] = useState(true);

  const { signup, user, updateDisplayName, verifyEmail, logout } = useAuth();

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

    if (!userInfo.firstName || !userInfo.surname) updatedErrors.name = 'Name is required';

    if (!userInfo.phone) updatedErrors.phone = 'Phone number is required';
    else if (userInfo.phone.length < MIN_PHONE_LENGTH) updatedErrors.phone = 'Invalid phone number';

    if (!userInfo.email) updatedErrors.email = 'Email is required';
    else if (!userInfo.email.includes('@')) updatedErrors.email = 'Invalid email address';

    if (!userInfo.password) updatedErrors.password = 'Password is required';
    else if (userInfo.password.length < MIN_PASSWORD_LENGTH) {
      updatedErrors.password = 'Password must be at least 6 characters';
    }

    if (userInfo.password !== userInfo.confirmPassword) {
      updatedErrors.confirmPassword = 'Passwords do not match';
    }

    if (!userInfo.street) updatedErrors.street = 'Street address is required';

    if (userInfo.postcode.length != POSTCODE_LENGTH) updatedErrors.postcode = 'Invalid postcode';

    setErrors(updatedErrors);

    // Use the synchronously set updatedErrors to check for errors
    if (Object.values(updatedErrors).some((value) => value)) return false;
    return true;
  };

  const signUpUser = async () => {
    try {
      await signup(userInfo.email, userInfo.password);
      await updateDisplayName(`${userInfo.firstName} ${userInfo.surname}`);
      await verifyEmail();
      Alert.alert('Verify your Email', 'Please check your emails to verify your account.');
      navigation.navigate('LoginScreen');
      console.log(user);
    } catch (error) {
      let errorMessage =
        `${error.message}\nFailed to create an account. ` +
        'Please check your details and try again. If this error persists, seek assistance.';

      if (error.code == 'auth/email-already-in-use') {
        errorMessage = 'Account already exists. You can reset your password at the Login screen.';
      }

      Alert.alert('Sign Up Failed', `${errorMessage}`);
      console.log(error.code);
      console.log(error.message);
    }
  };

  const handleSignup = async () => {
    if (!isValid()) {
      Alert.alert('Invalid details', 'Please check your details and try again.');
      return;
    }

    setLoading(true);
    await signUpUser();

    try {
      await logout();
    } catch (e) {
      console.log(e);
    }

    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        <Image style={styles.image} source={logoPath} />

        <DoubleUserInput>
          <UserInput
            title="First Name"
            placeholder="First Name"
            error={errors.name}
            autoCapitalize="words"
            onChangeText={(text) => setUserInfo((prevState) => ({ ...prevState, firstName: text }))}
          />
          <UserInput
            title="Surname"
            placeholder="Surname"
            autoCapitalize="words"
            onChangeText={(text) => setUserInfo((prevState) => ({ ...prevState, surname: text }))}
          />
        </DoubleUserInput>

        <UserInput
          title="Phone Number"
          placeholder="Phone Number"
          error={errors.phone}
          keyboardType="phone-pad"
          maxLength={MAX_PHONE_LENGTH}
          onChangeText={(text) => setUserInfo((prevState) => ({ ...prevState, phone: text }))}
        />

        <UserInput
          title="Email"
          placeholder="Email"
          error={errors.email}
          keyboardType="email-address"
          onChangeText={(text) => setUserInfo((prevState) => ({ ...prevState, email: text }))}
          textContentType="emailAddress" // Or should it be username?
        />

        <SecureTextInput
          title="Password"
          error={errors.password}
          onChangeText={(text) => setUserInfo((prevState) => ({ ...prevState, password: text }))}
        />

        <SecureTextInput
          title="Confirm Password"
          error={errors.confirmPassword}
          onChangeText={(text) =>
            setUserInfo((prevState) => ({ ...prevState, confirmPassword: text }))
          }
        />

        <UserInput
          title="Street"
          placeholder="1234 Waterworks Rd"
          error={errors.street}
          onChangeText={(text) => setUserInfo((prevState) => ({ ...prevState, street: text }))}
          textContentType="streetAddressLine1"
        />

        <DoubleUserInput>
          <UserInput
            title="Unit Number"
            placeholder="Optional"
            onChangeText={(text) =>
              setUserInfo((prevState) => ({ ...prevState, unitNumber: text }))
            }
            textContentType="streetAddressLine2"
          />
          <UserInput
            title="Postcode"
            placeholder="4061"
            error={errors.postcode}
            keyboardType="number-pad"
            onChangeText={(text) => setUserInfo((prevState) => ({ ...prevState, postcode: text }))}
            textContentType="postalCode"
          />
        </DoubleUserInput>

        <LargeButton
          text="Sign Up"
          style={styles.signupBtn}
          onPress={() => handleSignup()}
          disabled={loading}
        />

        {userInfo.password === userInfo.confirmPassword ? (
          <Text>Please check your email for confirmation after signing up.</Text>
        ) : (
          <Text style={styles.warningText}>Passwords do not match!</Text>
        )}
      </ScrollView>
      {loading && <Loading />}
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
