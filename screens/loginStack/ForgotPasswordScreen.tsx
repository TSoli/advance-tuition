import { useState } from 'react';
import { Alert, Image, SafeAreaView, StyleSheet } from 'react-native';

import { LargeButton } from '../../components/Buttons';
import { Loading } from '../../components/Loading';
import { UserInput } from '../../components/UserInput/UserInput';
import { useAuth } from '../../context/AuthContext';
import { ViewContainer } from '../../styles';

const logo = require('../../assets/logo.jpg');

function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { resetPassword } = useAuth();

  const handleResetPassword = async () => {
    setLoading(true);
    if (!email.includes('@')) {
      setError('Invalid email address');
      setLoading(false);
      return;
    }

    try {
      await resetPassword(email);
    } catch (e: any) {
      let errorMessage = e.message;
      if (e.code === 'auth/user-not-found') {
        errorMessage = 'Account does not exist.';
      }

      Alert.alert('Reset Password Failed', `${errorMessage}`);
      console.log(e.code);
      console.log(e.message);
    }

    setLoading(false);
  };

  return (
    <SafeAreaView style={ViewContainer.base}>
      <Image style={styles.image} source={logo} />

      <UserInput
        placeholder="Email"
        error={error}
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
        textContentType="emailAddress"
      />

      <LargeButton text="Send Email" onPress={() => handleResetPassword()} />

      {loading && <Loading />}
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

export default ForgotPasswordScreen;
