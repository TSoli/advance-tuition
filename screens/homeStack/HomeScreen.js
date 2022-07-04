import { useContext } from 'react';
import { StyleSheet, View, Button, SafeAreaView, } from 'react-native';

import { AuthContext  } from '../../components/Context';
import { Spacing, ViewContainer } from '../../styles';

export default function HomeScreen({navigation}) {

  const { Logout } = useContext(AuthContext);

  return (
    <SafeAreaView style={ViewContainer.base} >

      <View style={styles.itemContainer}>
        <Button title="Logout" onPress={() => {Logout()}} />
        <Button
          title="Submit Timesheet"
          onPress={() => navigation.navigate("Payroll", { screen: "AddTimesheetScreen" })}
        />
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    width: "80%",
    marginBottom: Spacing.margin.base,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});