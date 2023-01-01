import { StyleSheet, Text, SafeAreaView, Image, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { Colors, Spacing, Buttons, UserInputStyle, ViewContainer } from '../../styles';
import { LargeButton } from '../../components/Buttons';
import { useAuth } from '../../context/AuthContext';
import { UserInput } from '../../components/UserInput';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

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

  const loginHandle = async (email, pass) => {
    if (email.length == 0 || pass.length == 0) {
      Alert.alert('Invalid Input!', 'Email or password cannot be empty.');
      return;
    }

    setLoading(true);
    try {
      const userCredentials = await login(email, pass);

      // Add code to execute once logged in
      const { user } = userCredentials;
      console.log(user.email);
      console.log(`name=${user.displayName}`);
    } catch (err) {
      Alert.alert('Unable to login', 'Please check your email and password.');
      console.log(err.message);
      setLoading(false);
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

      <LargeButton text="LOGIN" onPress={() => loginHandle(email, password)} disabled={loading} />

      <LargeButton
        text="Sign Up"
        textProps={{ style: styles.signupText }}
        onPress={() => navigation.navigate('SignupScreen')}
        style={styles.signupBtn}
      />
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
