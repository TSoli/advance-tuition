import { 
  StyleSheet, Text, SafeAreaView, Image, TextInput, TouchableOpacity, Alert,
  KeyboardAvoidingView
} from 'react-native';
import { useState} from 'react';
import { Ionicons } from '@expo/vector-icons';

import { Colors, Spacing, Buttons, UserInput, ViewContainer } from '../../styles'
import { LargeButton } from '../../components/Buttons'
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);

  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const loginHandle = (email, pass) => {
    if (email.length == 0 || pass.length == 0) {
      Alert.alert("Invalid Input!",
      "Email or password cannot be empty.",
      [{text: "Ok"}]);
      return;
    }

    setLoading(true);
    login(email, pass)
    .then(userCredentials => {
      const user = userCredentials.user;
      console.log(user.email);
    })
    .catch((e) => {
      Alert.alert("Unable to login", "Please check your email and password.",
      [{text: "Ok"}]);
      console.log(e.message);
      console.log(`email=${email}`)
    })
    setLoading(false);
  }

  return (
    <SafeAreaView style={ViewContainer.base}>

      <Image style={styles.image} source={require("../../assets//logo.jpg")}/>

      <KeyboardAvoidingView style={UserInput.view} behavior="padding">
        <TextInput
          style={UserInput.text}
          placeholder="Email"
          placeholderTextColor="white"
          onChangeText={(email) => setEmail(email)}
          color="white"
          autoCapitalize='none'
          textContentType='username' // Or should it be email?
        />
      </KeyboardAvoidingView>

      <KeyboardAvoidingView style={UserInput.view} behavior="padding">
        <TextInput
          style={UserInput.text}
          placeholder="Password"
          placeholderTextColor="white"
          secureTextEntry={secureText? true : false}
          onChangeText={(password) => setPassword(password)}
          color="white"
          autoCapitalize='none'
          textContentType='password'
        />
        <TouchableOpacity onPress={() => setSecureText(!secureText)}>
          <Ionicons 
            style={styles.icons}
            name={secureText ? "eye-off" : "eye"}
            color="white"
            size={20}
          />
        </TouchableOpacity>
      </KeyboardAvoidingView>

      <TouchableOpacity onPress={() => navigation.navigate("ForgotPasswordScreen")}>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>

      <LargeButton
        text="LOGIN"
        onPress={() => loginHandle(email, password)}
        disabled={loading}
      />

      <LargeButton
        text="Sign Up"
        textProps={{style: styles.signupText}}
        onPress={() => navigation.navigate("SignupScreen")}
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

  icons: {
    padding: Spacing.padding.base,
    marginRight: 3,
  },

  forgot_button: {
    height: 30,
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
    marginTop: Spacing.margin.base,
  },

  signupText: {
    color: Colors.primaryDark,
  },
});
