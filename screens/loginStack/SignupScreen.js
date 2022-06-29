import {
  StyleSheet, Text, Image, TextInput, Alert, KeyboardAvoidingView, SafeAreaView
} from 'react-native';
import { useState, useContext } from 'react';

import { AuthContext } from '../../components/Context';
import Users from '../../model/Users';
import { LargeButton } from '../../components/Buttons';
import { UserInput, ViewContainer } from '../../styles';

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
        />
      </KeyboardAvoidingView>

      <KeyboardAvoidingView style={UserInput.view} behavior="padding">
        <TextInput
          style={UserInput.text}
          placeholder="Password"
          placeholderTextColor="white"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
          color="white"
          autoCapitalize='none'
        />
      </KeyboardAvoidingView>

      <KeyboardAvoidingView style={UserInput.view} behavior="padding">
        <TextInput
          style={UserInput.text}
          placeholder="Confirm Password"
          placeholderTextColor="white"
          secureTextEntry={true}
          onChangeText={(password) => setConfirmPass(password)}
          color="white"
          autoCapitalize='none'
        />
      </KeyboardAvoidingView>
      {password == confirmPass ? 
        <Text>Please check your email for confirmation after signing up.</Text>
      :
        <Text style={styles.warningText}>Passwords do not match!</Text>}
      
      <LargeButton text="Sign Up" onPress={() => {handleSignup(email, password, confirmPass)}} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 125,
    width: 125,
    marginBottom: 40,
  },

  warningText: {
    color: 'red',
  },
});
