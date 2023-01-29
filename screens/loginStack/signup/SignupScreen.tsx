import { NavigationProp } from '@react-navigation/native';
import {
  Image,
  ImageStyle,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { LargeButton } from '../../../components/Buttons';
import { Loading } from '../../../components/Loading';
import SecureTextInput from '../../../components/UserInput/SecureTextInput';
import { DoubleUserInput, UserInput } from '../../../components/UserInput/UserInput';
import { Spacing, ViewContainer } from '../../../styles';
import { LoginStackParamList } from '../../navigation/LoginStackNavigator';
import useSignup, { MAX_PHONE_LENGTH, MAX_STATE_LENGTH, POSTCODE_LENGTH } from './useSignup';

interface SignupScreenProps {
  navigation: NavigationProp<LoginStackParamList, 'SignupScreen'>;
}

const SignupScreen = ({ navigation }: SignupScreenProps) => {
  const {
    logoPath,
    errorMessages,
    updateUserData,
    handleSignup,
    loading,
    setPassword,
    setConfirmPassword,
  } = useSignup(navigation);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        <Image style={styles.image} source={logoPath} />

        <DoubleUserInput>
          <UserInput
            title="First Name"
            size="half-line"
            placeholder="First Name"
            error={errorMessages.name}
            autoCapitalize="words"
            onChangeText={(text) => updateUserData('name.first', text)}
          />
          <UserInput
            title="Surname"
            size="half-line"
            placeholder="Surname"
            autoCapitalize="words"
            onChangeText={(text) => updateUserData('name.last', text)}
          />
        </DoubleUserInput>

        <UserInput
          title="Phone Number"
          placeholder="Phone Number"
          error={errorMessages.phone}
          keyboardType="phone-pad"
          maxLength={MAX_PHONE_LENGTH}
          onChangeText={(text) => updateUserData('contact.phone', text)}
        />

        <UserInput
          title="Email"
          placeholder="Email"
          error={errorMessages.email}
          keyboardType="email-address"
          onChangeText={(text) => updateUserData('contact.email', text)}
          textContentType="emailAddress" // Or should it be username?
        />

        <SecureTextInput
          title="Password"
          error={errorMessages.password}
          onChangeText={(text) => setPassword(text)}
        />

        <SecureTextInput
          title="Confirm Password"
          error={errorMessages.confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />

        <UserInput
          title="Street"
          placeholder="1234 Waterworks Rd"
          error={errorMessages.street}
          onChangeText={(text) => updateUserData('address.street', text)}
          textContentType="streetAddressLine1"
          autoCapitalize="words"
        />

        <UserInput
          title="Address Line 2"
          placeholder="Optional"
          onChangeText={(text) => updateUserData('address.line2', text)}
          textContentType="streetAddressLine2"
          autoCapitalize="words"
        />

        <UserInput
          title="City/Suburb"
          placeholder="The Gap"
          error={errorMessages.suburb}
          onChangeText={(text) => updateUserData('address.suburb', text)}
          textContentType="addressCity"
          autoCapitalize="words"
        />

        <DoubleUserInput>
          <UserInput
            title="Postcode"
            size="half-line"
            placeholder="4061"
            error={errorMessages.postcode}
            keyboardType="number-pad"
            onChangeText={(text) => updateUserData('address.postcode', text)}
            textContentType="postalCode"
            maxLength={POSTCODE_LENGTH}
          />

          <UserInput
            title="State"
            placeholder="QLD"
            size="half-line"
            error={errorMessages.state}
            onChangeText={(text) => updateUserData('address.state', text.toUpperCase())}
            textContentType="addressState"
            autoCapitalize="characters"
            maxLength={MAX_STATE_LENGTH}
          />
        </DoubleUserInput>

        <LargeButton
          text="Sign Up"
          style={styles.signupBtn}
          onPress={async () => await handleSignup()}
          disabled={loading}
        />

        <Text>Please check your email for confirmation after signing up.</Text>
      </ScrollView>
      {loading && <Loading />}
    </SafeAreaView>
  );
};

interface Styles {
  mainContainer: ViewStyle;
  scrollContentContainer: ViewStyle;
  image: ImageStyle;
  warningText: TextStyle;
  signupBtn: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
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

  signupBtn: {
    marginTop: Spacing.margin.base,
  },
});

export default SignupScreen;
