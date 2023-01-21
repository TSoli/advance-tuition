import PropTypes from 'prop-types';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';
import { LargeButton } from '../../../components/Buttons';
import { Loading } from '../../../components/Loading';
import SecureTextInput from '../../../components/UserInput/SecureTextInput';
import { DoubleUserInput, UserInput } from '../../../components/UserInput/UserInput';
import { Spacing, ViewContainer } from '../../../styles';
import useSignup, { MAX_PHONE_LENGTH, MAX_STATE_LENGTH } from './useSignup';

export default function SignupScreen({ navigation }) {
  const { logoPath, errorMessages, updateUserInfo, handleSignup, loading } = useSignup(navigation);

  // TODO: Fix the setUserInfo functions

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        <Image style={styles.image} source={logoPath} />

        <DoubleUserInput>
          <UserInput
            title="First Name"
            placeholder="First Name"
            error={errorMessages.name}
            autoCapitalize="words"
            onChangeText={(text) => updateUserInfo('name.first', text)}
          />
          <UserInput
            title="Surname"
            placeholder="Surname"
            autoCapitalize="words"
            onChangeText={(text) => updateUserInfo('name.last', text)}
          />
        </DoubleUserInput>

        <UserInput
          title="Phone Number"
          placeholder="Phone Number"
          error={errorMessages.phone}
          keyboardType="phone-pad"
          maxLength={MAX_PHONE_LENGTH}
          onChangeText={(text) => updateUserInfo('contact.phone', text)}
        />

        <UserInput
          title="Email"
          placeholder="Email"
          error={errorMessages.email}
          keyboardType="email-address"
          onChangeText={(text) => updateUserInfo('contact.email', text)}
          textContentType="emailAddress" // Or should it be username?
        />

        <SecureTextInput
          title="Password"
          error={errorMessages.password}
          onChangeText={(text) => updateUserInfo('password', text)}
        />

        <SecureTextInput
          title="Confirm Password"
          error={errorMessages.confirmPassword}
          onChangeText={(text) => updateUserInfo('confirmPassword', text)}
        />

        <UserInput
          title="Street"
          placeholder="1234 Waterworks Rd, The Gap"
          error={errorMessages.street}
          onChangeText={(text) => updateUserInfo('address.street', text)}
          textContentType="streetAddressLine1"
        />

        <UserInput
          title="Address Line 2"
          placeholder="Optional (i.e unit)"
          onChangeText={(text) => updateUserInfo('address.unitNumber', text)}
          textContentType="streetAddressLine2"
        />

        <UserInput
          title="City"
          placeholder="Brisbane"
          error={errorMessages.city}
          onChangeText={(text) => updateUserInfo('address.city', text)}
          textContentType="addressCity"
        />

        <DoubleUserInput>
          <UserInput
            title="State"
            placeholder="QLD"
            error={errorMessages.state}
            onChangeText={(text) => updateUserInfo('address.state', text)}
            textContentType="addressState"
            autoCapitalize="characters"
            maxLength={MAX_STATE_LENGTH}
          />
          <UserInput
            title="Postcode"
            placeholder="4061"
            error={errorMessages.postcode}
            keyboardType="number-pad"
            onChangeText={(text) => updateUserInfo('address.postcode', text)}
            textContentType="postalCode"
          />
        </DoubleUserInput>

        <LargeButton
          text="Sign Up"
          style={styles.signupBtn}
          onPress={() => handleSignup()}
          disabled={loading}
        />

        <Text>Please check your email for confirmation after signing up.</Text>
      </ScrollView>
      {loading && <Loading />}
    </SafeAreaView>
  );
}

SignupScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func.isRequired }).isRequired,
};

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

  signupBtn: {
    marginTop: Spacing.margin.base,
  },
});
