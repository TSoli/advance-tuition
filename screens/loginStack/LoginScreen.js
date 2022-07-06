import { 
  StyleSheet, Text, SafeAreaView, Image, TextInput, TouchableOpacity, Alert,
  KeyboardAvoidingView
} from 'react-native';
import { useState, useContext } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { Colors, Spacing, Buttons, UserInput, ViewContainer } from '../../styles'
import { LargeButton } from '../../components/Buttons'
import { AuthContext } from '../../components/Context';
import Users from '../../model/Users';

export default function LoginScreen({navigation}) {
  const [data, setData] = useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
  });

  // const { Login } = useContext(AuthContext);

  const textInputChange = (val) => {
    setData({
      ...data,
      email: val,
      check_textInputChange: true
    });
  }

  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val
    });
  }

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
    });
  }

  const loginHandle = (email, pass) => {
    const foundUser = Users.filter(item => {
      return email == item.email && pass == item.password;
    })

    if (data.email.length == 0 || data.password.length == 0) {
      Alert.alert("Invalid Input!",
      "Email or password cannot be empty.",
      [{text: "Ok"}]);
      return;
    }

    if (foundUser.length == 0) {
      Alert.alert("Invalid User!",
      "Email or password is incorrect.");
      return;
    }
    // Login(foundUser);
  }

  return (
    <SafeAreaView style={ViewContainer.base}>

      <Image style={styles.image} source={require("../../assets//logo.jpg")}/>

      <KeyboardAvoidingView style={UserInput.view} behavior="padding">
        <TextInput
          style={UserInput.text}
          placeholder="Email"
          placeholderTextColor="white"
          onChangeText={(email) => textInputChange(email)}
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
          secureTextEntry={data.secureTextEntry ? true : false}
          onChangeText={(password) => handlePasswordChange(password)}
          color="white"
          autoCapitalize='none'
          textContentType='password'
        />
        <TouchableOpacity onPress={updateSecureTextEntry}>
          <Ionicons 
            style={styles.icons}
            name={data.secureTextEntry ? "eye-off" : "eye"}
            color="white"
            size={20}
          />
        </TouchableOpacity>
      </KeyboardAvoidingView>

      <TouchableOpacity onPress={() => navigation.navigate("ForgotPasswordScreen")}>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>

      <LargeButton text="LOGIN" onPress={() => loginHandle(data.email, data.password)} />

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
