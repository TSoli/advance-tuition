import { NavigationProp } from '@react-navigation/native';
import { cloneDeep, set } from 'lodash';
import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { useAuth } from '../../../context/AuthContext';

interface Name {
  /** The first name */
  first: string;
  /** The surname */
  last: string;
}

interface Address {
  /** The street address. */
  street: string;
  /** The unit number - can be left as an empty string if not applicable */
  unitNumber: string;
  /** The city - user may enter a suburb instead but there is also a postcode */
  city: string;
  /** The postcode */
  postcode: string;
  /** The state - i.e QLD */ // TODO: Change this to a more specific type.
  state: string;
  /** The country */
  country: string;
}

interface Contact {
  /** The phone number */
  phone: string;
  /** The email address */
  email: string;
}

interface UserInfo {
  /** The user's name */
  name: Name;
  /** The user's contact details */
  contact: Contact;
  /** The user's address */
  address: Address;
  /** The user's password */
  password: string;
  /** A confirmation of the user's password */
  confirmPassword: string;
}

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
  /** The error message for the city */
  city: string;
  /** The error message for the postcode */
  postcode: string;
  /** The error message for the state */
  state: string;
}

const logoPath = require('../../../assets/logo.jpg');

const initialUserInfo: UserInfo = {
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
    unitNumber: '',
    city: '',
    postcode: '',
    state: '',
    country: 'Australia',
  },
  password: '',
  confirmPassword: '',
};

const initialErrors: ErrorMessages = {
  name: '',
  phone: '',
  email: '',
  password: '',
  confirmPassword: '',
  street: '',
  city: '',
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
const POSTCODE_LENGTH = 4;

const useSignup = (navigation: NavigationProp<LoginStackParamList, 'SignupScreen'>) => {
  // Fix this type
  const [userInfo, setUserInfo] = useState(initialUserInfo);
  const [errorMessages, setErrorMessages] = useState(initialErrors);
  const [loading, setLoading] = useState(false);

  const { signup, user, updateDisplayName, verifyEmail, logout } = useAuth();

  /** Updates the user user info based on the provided path.
   *
   * @param propPath - The path to the property to update. E.g "name.first".
   * @param value - The new value for the property.
   */
  const updateUserInfo = (propPath: string, value: string) => {
    setUserInfo((prevState) => {
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
    if (!userInfo.address.street) updatedErrors.street = 'Street address is required';

    if (!userInfo.address.city) updatedErrors.city = 'City is required';

    if (userInfo.address.postcode.length != POSTCODE_LENGTH) {
      updatedErrors.postcode = 'Invalid postcode';
    }

    // Update this to check all possible states in Australia
    if (!userInfo.address.state) updatedErrors.state = 'Please enter a valid state';
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

    if (!userInfo.name.first || !userInfo.name.last) updatedErrors.name = 'Name is required';

    if (!userInfo.contact.phone) updatedErrors.phone = 'Phone number is required';
    else if (
      userInfo.contact.phone.length < MIN_PHONE_LENGTH ||
      userInfo.contact.phone.length > MAX_PHONE_LENGTH
    ) {
      updatedErrors.phone = 'Invalid phone number';
    }

    if (!userInfo.contact.email) updatedErrors.email = 'Email is required';
    else if (!userInfo.contact.email.includes('@')) updatedErrors.email = 'Invalid email address';

    if (!userInfo.password) updatedErrors.password = 'Password is required';
    else if (userInfo.password.length < MIN_PASSWORD_LENGTH) {
      updatedErrors.password = 'Password must be at least 6 characters';
    }

    if (userInfo.password !== userInfo.confirmPassword) {
      updatedErrors.confirmPassword = 'Passwords do not match';
    }

    isValidAddress(updatedErrors);

    setErrorMessages(updatedErrors);
    console.log(JSON.stringify(updatedErrors));
    // Use the synchronously set updatedErrors to check for errors
    // If there is at least one error then return false - else true
    return !Object.values(updatedErrors).some((value) => value);
  };

  const signupUser = useCallback(() => {
    async () => {
      try {
        await signup(userInfo.contact.email, userInfo.password);
        await updateDisplayName(`${userInfo.name.first} ${userInfo.name.last}`);
        await verifyEmail();
        Alert.alert('Verify your Email', 'Please check your emails to verify your account.');
        navigation.navigate('LoginScreen');
        console.log(user);
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
  }, [navigation]);

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

  return { logoPath, errorMessages, updateUserInfo, handleSignup, loading };
};

export default useSignup;
