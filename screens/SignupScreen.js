import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useState, useContext } from 'react';

import { AuthContext } from '../components/context';
import Users from '../model/Users';
import { LargeButton } from '../components/Buttons';

export default function SignupScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const { Signup } = useContext(AuthContext);

  const handleSignup = (email, pass, confirmPass) => {
    if (pass == confirmPass && pass != '' && email != '') {
      Signup();
      // Add user to database
      Users.push(
        {
          id: 4,
          email: email,
          password: pass,
          userToken: 'signupToken',
        })
      navigation.navigate('LoginScreen');
    } else if (pass == '' || email == '') {
      Alert.alert("Invalid Details", "Email or password cannot be empty.");
    } else {
      Alert.alert("Passwords do not match", "Check that your passwords match.");
    }
  }

  return (
    <View style={styles.container}>

      <Image style={styles.image} source={require("../assets//logo.jpg")}/>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="white"
          onChangeText={(email) => setEmail(email)}
          color="white"
          autoCapitalize='none'
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="white"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
          color="white"
          autoCapitalize='none'
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Confirm Password"
          placeholderTextColor="white"
          secureTextEntry={true}
          onChangeText={(password) => setConfirmPass(password)}
          color="white"
          autoCapitalize='none'
        />
      </View>
      {password == confirmPass ? 
        <Text>Please check your email for confirmation after signing up.</Text>
      :
        <Text style={styles.warningText}>Passwords do not match!</Text>}
      
      <LargeButton text="Sign Up" onPress={() => {handleSignup(email, password, confirmPass)}} />
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
    marginBottom: 40,
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

  warningText: {
    color: 'red',
  },
});
