import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { LargeButton } from '../../components/Buttons';
import { UserInputStyle, ViewContainer, Spacing } from '../../styles';
import UserInput from '../../components/UserInput';

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [secureText, setSecureText] = useState(true);
  const [confirmSecureText, setConfirmSecureText] = useState(true);
  const { signup, user } = useAuth();

  const handleSignup = async () => {
    if (password === '' || email === '') {
      Alert.alert('Invalid Details', 'Email or password cannot be empty.');
    } else if (password !== confirmPassword) {
      Alert.alert('Passwords do not match', 'Check that your passwords match.');
    } else {
      // Assume correct
      try {
        setLoading(true);
        await signup(email, password);
        navigation.navigate('LoginScreen');
      } catch (e) {
        Alert.alert('Sign Up Failed', 'Failed to create an account');
        console.log(e);
        setLoading(false);
      }

      console.log(user);
    }
  };

  const secureTextIcon = (
    <TouchableOpacity onPress={() => setSecureText(!secureText)}>
      <Ionicons
        style={UserInputStyle.icon}
        name={secureText ? 'eye-off' : 'eye'}
        color="white"
        size={20}
      />
    </TouchableOpacity>
  );

  const confirmSecureTextIcon = (
    <TouchableOpacity onPress={() => setConfirmSecureText(!confirmSecureText)}>
      <Ionicons
        style={UserInputStyle.icon}
        name={confirmSecureText ? 'eye-off' : 'eye'}
        color="white"
        size={20}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        <Image style={styles.image} source={require('../../assets/logo.jpg')} />

        <UserInput
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          textContentType="username" // Or should it be email?
        />
        <UserInput
          placeholder="Password"
          secureTextEntry={secureText}
          onChangeText={(text) => setPassword(text)}
          textContentType="password"
          icon={secureTextIcon}
        />

        <UserInput
          placeholder="Confirm Password"
          secureTextEntry={confirmSecureText}
          onChangeText={(text) => setConfirmPassword(text)}
          textContentType="password"
          icon={confirmSecureTextIcon}
        />

        <LargeButton
          text="Sign Up"
          onPress={() => {
            handleSignup();
          }}
          disabled={loading}
        />

        {password === confirmPassword ? (
          <Text>Please check your email for confirmation after signing up.</Text>
        ) : (
          <Text style={styles.warningText}>Passwords do not match!</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    ...ViewContainer.base,
    alignItems: 'stretch',
    flexGrow: 1,
  },

  scrollContentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    paddingBottom: Spacing.padding.medium,
  },

  image: {
    height: 125,
    width: 125,
    marginBottom: 40,
  },

  warningText: {
    color: 'red',
  },
});
