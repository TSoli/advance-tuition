import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { useState } from 'react';

import Users from '../model/Users';
import { LargeButton } from '../components/Buttons';
import { Colors, UserInput } from '../styles';

export default function ForgotPasswordScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(null);

  const resetPassword = (email) => {
    // send an email with a reset link or something
    if (Users.some(user => user.email == email)) {
      setSent(true);
    } else {
      setSent(false);
    }
  }

  return (
    <View style={styles.container}>

      <Image style={styles.image} source={require("../assets//logo.jpg")}/>

      <KeyboardAvoidingView style={UserInput.view}>
        <TextInput
          style={UserInput.text}
          placeholder="Email"
          placeholderTextColor="white"
          onChangeText={(email) => setEmail(email)}
          color="white"
          autoCapitalize='none'
        />
      </KeyboardAvoidingView>
      {sent == null && <Text> </Text>
      || sent && <Text>A reset email has been sent.</Text>
      || sent == false && <Text style={{color: "red"}}>No account exists for that email.</Text>
      }

      <LargeButton text="Send Email" onPress={() => {resetPassword(email)}} />
    </View>
  )
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

  forgot_button: {
    height: 30,
  },
});
