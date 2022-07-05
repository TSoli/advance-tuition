import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import UserAvatar from 'react-native-user-avatar';
import { DetailsRow } from "../../components/CustomList";
import { Spacing, TextStyle, ViewContainer, ListStyle } from "../../styles";

export default function StudentDetailsScreen({ route }) {
  const { first_name, last_name, email, phone_number, street_address, subject, year_level } = route.params;
  return (
    <SafeAreaView style={styles.viewContainer}>
      <View style={styles.topContainer}>
        <UserAvatar
          size={100}
          name={first_name + " " + last_name}
        />
        <Text style={styles.name}>{first_name} {last_name}</Text>
      </View>

      <View style={styles.bottomContainer}>
        <ScrollView style={styles.list}>
          <DetailsRow category="Phone Number" details={phone_number} />
          <DetailsRow category="Email Address" details={email} />
          <DetailsRow category="Address" details={street_address} />
          <DetailsRow category="Subject" details={subject} />
          <DetailsRow category="Year Level" details={year_level} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  viewContainer: {
    ...ViewContainer.base,
  },

  topContainer: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },

  bottomContainer: {
    width: "100%",
    flex: 2,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  
  list: {
    ...ListStyle.list.base,
    paddingTop: 0,
  },

  name: {
    ...TextStyle.titleNoMargin,
    paddingVertical: Spacing.padding.large,
  },
})