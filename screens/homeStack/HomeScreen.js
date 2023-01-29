import PropTypes from 'prop-types';
import { Alert, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { MediumButton } from '../../components/Buttons';
import { useAuth } from '../../context/AuthContext';
import { Buttons, Colors, CustomTextStyle, Spacing, ViewContainer } from '../../styles';

const logoPath = require('../../assets/logo.jpg');

export default function HomeScreen({ navigation }) {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (e) {
      Alert.alert('Logout Failed', `${e}\nLogout failed unexpectedly`);
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Image style={styles.image} source={logoPath} />

      <View style={styles.msgContainer}>
        <Text style={CustomTextStyle.title}>Welcome, {user.displayName}!</Text>
        <Text style={styles.msgText}>
          Thanks for using the Advance Tuition app! We hope that this app will make it easier for
          you to report your tutoring hours to us by enabling you to submit timesheets right from
          your pocket.
          {'\n\n'}
          This app is still very much under development so if you have any problems with it or would
          like to provide any feedback, please send a text to 0423 696 614 or email
          advancetuitiongroup@gmail.com with the details. We would love to hear your feedback so we
          can improve your experience. For any issues with payroll please use the above email.
        </Text>
      </View>

      <View style={styles.btnContainer}>
        <MediumButton
          style={styles.logoutBtn}
          textProps={{ style: styles.logoutBtnText }}
          text="Logout"
          onPress={() => handleLogout()}
        />
        <MediumButton
          text="Submit Timesheet"
          onPress={() =>
            navigation.navigate('Payroll', { screen: 'AddTimesheetScreen', initial: false })
          }
        />
      </View>
    </SafeAreaView>
  );
}

HomeScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func.isRequired }).isRequired,
};

const styles = StyleSheet.create({
  image: {
    height: 125,
    width: 125,
    marginTop: Spacing.margin.extraLarge,
    marginBottom: Spacing.margin.medium,
  },

  mainContainer: {
    ...ViewContainer.base,
    justifyContent: 'flex-start',
  },

  btnContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: Spacing.padding.large,
  },

  msgContainer: {
    width: '100%',
    padding: Spacing.padding.medium,
  },

  msgText: {
    ...CustomTextStyle.paragraph,
  },

  logoutBtn: {
    ...Buttons.outlined,
    backgroundColor: Colors.white,
    borderColor: Colors.primaryDark,
  },

  logoutBtnText: {
    color: Colors.primaryDark,
  },
});
