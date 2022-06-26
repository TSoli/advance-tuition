import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';

import Users from '../model/Users';
import { LargeButton } from '../components/Buttons';
import { Colors } from '../styles';

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

  forgot_button: {
    height: 30,
  },
});
