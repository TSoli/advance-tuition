import { StyleSheet, Text, SafeAreaView, Image, Alert } from 'react-native';
import { useState } from 'react';

import { LargeButton } from '../../components/Buttons';
import { Colors, ViewContainer } from '../../styles';
import { useAuth } from '../../context/AuthContext';
import UserInput from '../../components/UserInput';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(null);

  const { resetPassword } = useAuth();

  const handleResetPassword = async (email) => {
    try {
      await resetPassword(email);
    } catch (err) {
      Alert.alert('Reset Password Failed', 'Failed to send an email to reset password');
      console.log(err.message);
    }
  };

  return (
    <SafeAreaView style={ViewContainer.base}>
      <Image style={styles.image} source={require('../../assets//logo.jpg')} />

      <UserInput placeholder="Email" onChangeText={(text) => setEmail(text)} />

      {(sent == null && <Text> </Text>) ||
        (sent && <Text>A reset email has been sent.</Text>) ||
        (sent == false && (
          <Text style={{ color: Colors.red }}>No account exists for that email.</Text>
        ))}

      <LargeButton text="Send Email" onPress={() => handleResetPassword(email)} />
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
});
