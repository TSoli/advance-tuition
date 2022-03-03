import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { useState, useContext } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { AuthContext } from '../components/context';

export default function LoginScreen({navigation}) {
  const [data, setData] = useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true
  });

  const { Login } = useContext(AuthContext);

  const textInputChange = (val) => {
    if (val.length != 0) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true
      });
    } else {
      setData({
        ...data,
        check_textInputChange: false
      });
    }
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

  const loginHandle = (user, pass) => {
    Login(user, pass);
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

      <TouchableOpacity style={styles.loginBtn} onPress={() => {loginHandle(data.email, data.password)}}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signupBtn} onPress={() => navigation.navigate("SignupScreen")}>
        <Text style={styles.signupText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    height: 125,
    width: 125,
    marginBottom: 20,
  },

  inputView: {
    backgroundColor: "#63a4ff",
    borderRadius: 30,
    width: "80%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
    flexDirection: "row",
  },

  TextInput: {
    height: 50,
    width: "100%",
    flex: 1,
    padding: 10,
    marginLeft: 10
  },

  icons: {
    padding: 10,
    marginRight: 3,
  },

  forgot_button: {
    height: 30,
  },

  loginBtn: {
    width: "70%",
    borderRadius: 25,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "#004ba0",
  },

  signupBtn: {
    width: "70%",
    borderRadius: 25,
    height:50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderColor: "#1976d2",
    borderWidth: 2,
    marginTop: 10,
  },

  loginText: {
    color: 'white',
    fontWeight: "bold",
  },

  signupText: {
    color: 'black',
  },
});
