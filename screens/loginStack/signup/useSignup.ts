import { NavigationProp } from '@react-navigation/native';
import { cloneDeep, set } from 'lodash';
import { useState } from 'react';
import { Alert } from 'react-native';
import { TutorData, addTutor } from '../../../advance-tuition-backend';
import { useAuth } from '../../../context/AuthContext';
import { LoginStackParamList } from '../../navigation/LoginStackNavigator';

interface ErrorMessages {
  /** The error message for the name */
  name: string;
  /** The error message for the phone number */
  phone: string;
  /** The error message for the email address */
  email: string;
  /** The error message for the password */
  password: string;
  /** The error message for the password confirmation */
  confirmPassword: string;
  /** The error message for the street address */
  street: string;
  /** The error message for the city/suburb */
  suburb: string;
  /** The error message for the postcode */
  postcode: string;
  /** The error message for the state */
  state: string;
}

const logoPath = require('../../../assets/logo.jpg');

const initialUserData: TutorData = {
  name: {
    first: '',
    last: '',
  },
  contact: {
    phone: '',
    email: '',
  },
  address: {
    street: '',
    line2: '',
    suburb: '',
    postcode: '',
    state: '',
    country: 'Australia',
  },
  level: 1,
  rate: -1,
};

const initialErrors: ErrorMessages = {
  name: '',
  phone: '',
  email: '',
  password: '',
  confirmPassword: '',
  street: '',
  suburb: '',
  postcode: '',
  state: '',
};

// Landline phones are 8 digits without the area code. Maybe we want 10 for mobile?
const MIN_PHONE_LENGTH = 8;
export const MAX_PHONE_LENGTH = 12; // idk lol
// Acronyms
export const MAX_STATE_LENGTH = 3;
// Enforced by firebase
const MIN_PASSWORD_LENGTH = 6;
// True for Australia
export const POSTCODE_LENGTH = 4;

const useSignup = (navigation: NavigationProp<LoginStackParamList, 'SignupScreen'>) => {
  const [userData, setUserData] = useState(cloneDeep(initialUserData));
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState(cloneDeep(initialErrors));
  const [loading, setLoading] = useState(false);

  const { signup, updateDisplayName, verifyEmail, logout } = useAuth();

  /** Updates the user user info based on the provided path.
   *
   * @param propPath - The path to the property to update. E.g "name.first".
   * @param value - The new value for the property.
   */
  const updateUserData = (propPath: string, value: string) => {
    setUserData((prevState) => {
      const newState = { ...prevState };
      set(newState, propPath, value);
      return newState;
    });
  };

  /** Checks that the address inputs are valid and sets errors accordingly.
   *
   * @param updatedErrors - The errors that may be modified for invalid inputs.
   */
  const isValidAddress = (updatedErrors: ErrorMessages) => {
    if (!userData.address.street) updatedErrors.street = 'Street address is required';

    if (!userData.address.suburb) updatedErrors.suburb = 'City/Suburb is required';

    if (userData.address.postcode.length != POSTCODE_LENGTH) {
      updatedErrors.postcode = 'Invalid postcode';
    }

    // Update this to check all possible states in Australia
    if (!userData.address.state) updatedErrors.state = 'State is required';
  };

  /** Check that the user inputs are valid and set error state accordingly.
   *
   * @returns true if valid and false otherwise.
   */
  const isValidInputs = () => {
    // Note that state setters are asynchronous so the checks must be performed
    // synchronously rather than on the state object (errors) itself

    // Must create a new object otherwise the old one will be modified
    const updatedErrors = cloneDeep(initialErrors);

    if (!userData.name.first || !userData.name.last) updatedErrors.name = 'Name is required';

    if (!userData.contact.phone) updatedErrors.phone = 'Phone number is required';
    else if (
      userData.contact.phone.length < MIN_PHONE_LENGTH ||
      userData.contact.phone.length > MAX_PHONE_LENGTH
    ) {
      updatedErrors.phone = 'Invalid phone number';
    }

    if (!userData.contact.email) updatedErrors.email = 'Email is required';
    else if (!userData.contact.email.includes('@')) updatedErrors.email = 'Invalid email address';

    if (!password) updatedErrors.password = 'Password is required';
    else if (password.length < MIN_PASSWORD_LENGTH) {
      updatedErrors.password = 'Password must be at least 6 characters';
    }

    if (password !== confirmPassword) {
      updatedErrors.confirmPassword = 'Passwords do not match';
    }

    isValidAddress(updatedErrors);

    setErrorMessages(updatedErrors);
    // Use the synchronously set updatedErrors to check for errors
    // If there is at least one error then return false - else true
    return !Object.values(updatedErrors).some((value) => value);
  };

  const signupUser = async () => {
    try {
      const userCredentials = await signup(userData.contact.email, password);
      await addTutor(userCredentials.user.uid, userData);
      await updateDisplayName(`${userData.name.first} ${userData.name.last}`);
      await verifyEmail();
      Alert.alert('Verify your Email', 'Please check your emails to verify your account.');
      navigation.navigate('LoginScreen');
    } catch (error: any) {
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
    if (!isValidInputs()) {
      Alert.alert('Invalid details', 'Please check your details and try again.');
      return;
    }

    setLoading(true);
    await signupUser();

    try {
      await logout();
    } catch (error: any) {
      console.log(error);
    }

    setLoading(false);
  };

  return {
    logoPath,
    errorMessages,
    updateUserData,
    handleSignup,
    loading,
    setPassword,
    setConfirmPassword,
  };
};

export default useSignup;
