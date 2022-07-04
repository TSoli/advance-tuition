import { useContext } from 'react';
import { StyleSheet, View, Text, Image, SafeAreaView, } from 'react-native';
import { MediumButton } from '../../components/Buttons';

import { AuthContext  } from '../../components/Context';
import { Buttons, Colors, Spacing, ViewContainer } from '../../styles';

export default function HomeScreen({navigation}) {

  const { Logout } = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.mainContainer} >

      <Image style={styles.image} source={require("../../assets//logo.jpg")}/>

      <Text>Welcome!</Text>

      <View style={styles.itemContainer}>
        <MediumButton 
          style={styles.logoutBtn}
          textProps={{style: styles.logoutBtnText}}
          text="Logout"
          onPress={() => {Logout()}}
        />
        <MediumButton
          text="Submit Timesheet"
          onPress={() => navigation.navigate("Payroll", { screen: "AddTimesheetScreen" })}
        />
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  image: {
    height: 125,
    width: 125,
    marginTop: Spacing.margin.extraLarge,
    marginBottom: Spacing.margin.medium,
  },

  mainContainer: {
    ...ViewContainer.base,
    justifyContent: "space-between",
  },

  itemContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: Spacing.padding.large,
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