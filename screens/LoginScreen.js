import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useState, useContext } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { Colors, Spacing, Buttons } from '../styles'
import { LargeButton } from '../components/Buttons'
import { AuthContext } from '../components/context';
import Users from '../model/Users';

export default function LoginScreen({navigation}) {
  const [data, setData] = useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
  });

  const { Login } = useContext(AuthContext);

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
    Login(foundUser);
  }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets//logo.jpg")}/>
      <StatusBar style="auto" />

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="white"
          onChangeText={(email) => textInputChange(email)}
          color="white"
          autoCapitalize='none'
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="white"
          secureTextEntry={data.secureTextEntry ? true : false}
          onChangeText={(password) => handlePasswordChange(password)}
          color="white"
          autoCapitalize='none'
        />
        <TouchableOpacity onPress={updateSecureTextEntry}>
          <Ionicons 
            style={styles.icons}
            name={data.secureTextEntry ? "eye-off" : "eye"}
            color="white"
            size={20}
          />
        </TouchableOpacity>
      </View>
      

      <TouchableOpacity onPress={() => navigation.navigate("ForgotPasswordScreen")}>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>

      <LargeButton text="LOGIN" onPress={() => loginHandle(data.email, data.password)} />

      <TouchableOpacity style={styles.signupBtn} onPress={() => navigation.navigate("SignupScreen")}>
        <Text style={styles.signupText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    height: 125,
    width: 125,
    marginBottom: 40,
  },

  inputView: {
    backgroundColor: Colors.blue,
    borderRadius: 30,
    width: "80%",
    height: 45,
    marginBottom: Spacing.margin.base,
    alignItems: "center",
    flexDirection: "row",
  },

  TextInput: {
    height: 50,
    width: "100%",
    flex: 1,
    padding: Spacing.padding.base,
    marginLeft: Spacing.margin.base,
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
    backgroundColor: Colors.darkBlue,
  },

  signupBtn: {
    ...Buttons.largeRounded,
    ...Buttons.outlined,
    backgroundColor: Colors.white,
    borderColor: Colors.darkBlue, // old colour was "1976d2"
    marginTop: Spacing.margin.base,
  },

  loginText: {
    color: Colors.white,
    fontWeight: "bold",
  },

  signupText: {
    color: Colors.black,
  },
});
