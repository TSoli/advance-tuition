import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { LargeButton } from '../../components/Buttons';
import { Loading } from '../../components/Loading';
import { UserInput } from '../../components/UserInput/UserInput';
import { useAuth } from '../../context/AuthContext';
import { Buttons, Colors, Spacing, UserInputStyle, ViewContainer } from '../../styles';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [loading, setLoading] = useState(false);

  const { login, logout, isVerified, verifyEmail } = useAuth();

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

  const createUnverifiedAlert = () =>
    Alert.alert('Verify your Email', 'Please check your emails to verify your account.', [
      {
        text: 'Send Verification Email',
        onPress: async () => {
          try {
            await verifyEmail();
          } catch (error) {
            Alert.alert(
              'Failed to send',
              'Failed to send the verification email. Please try again.'
            );
          }

          try {
            await logout();
          } catch (error) {
            console.log(error.code);
            console.log(error.message);
          }
        },
      },
      {
        text: 'OK',
        onPress: async () => {
          try {
            await logout();
          } catch (error) {
            console.log(error.code);
            console.log(error.message);
          }
        },
      },
    ]);

  const loginHandle = async () => {
    if (email.length == 0 || password.length == 0) {
      Alert.alert('Invalid Input!', 'Email or password cannot be empty.');
      return;
    }

    setLoading(true);
    let user;
    try {
      const userCredentials = await login(email, password);
      user = userCredentials.user;
      // Add code to execute once logged in
    } catch (error) {
      Alert.alert('Unable to login', 'Please check your email and password.');
      console.log(error.code);
      console.log(error.message);
      setLoading(false);
      return;
    }

    console.log(user.email);
    console.log(`name=${user.displayName}`);

    if (!isVerified()) {
      createUnverifiedAlert();
    }
  };

  return (
    <SafeAreaView style={ViewContainer.base}>
      <Image style={styles.image} source={require('../../assets//logo.jpg')} />

      <UserInput
        placeholder="Email"
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
        textContentType="emailAddress" // Or should it be username?
        mainContainerProps={{ style: styles.inputMainContainer }}
      />

      <UserInput
        placeholder="Password"
        secureTextEntry={secureText}
        onChangeText={(text) => setPassword(text)}
        textContentType="password"
        icon={secureTextIcon}
        mainContainerProps={{ style: styles.inputMainContainer }}
      />

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>

      <LargeButton text="LOGIN" onPress={() => loginHandle()} disabled={loading} />

      <LargeButton
        text="Sign Up"
        textProps={{ style: styles.signupText }}
        onPress={() => navigation.navigate('SignupScreen')}
        style={styles.signupBtn}
      />

      {loading && <Loading />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 125,
    width: 125,
    marginBottom: 40,
  },

  forgot_button: {
    height: 30,
  },

  inputMainContainer: {
    marginBottom: Spacing.margin.base,
  },

  loginBtn: {
    ...Buttons.largeRounded,
    marginTop: Spacing.margin.base,
    backgroundColor: Colors.primaryDark,
  },

  signupBtn: {
    ...Buttons.outlined,
    backgroundColor: Colors.white,
    borderColor: Colors.primaryDark,
  },

  signupText: {
    color: Colors.primaryDark,
  },
});
