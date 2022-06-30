import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { ListRow, Spacing, TextStyle, ViewContainer } from "../../styles";
import { getStatusColor } from "./TimesheetListScreen";


export default function TimesheetScreen() {
  const statusColor = getStatusColor("APPROVED"); // Change this later

  const TimesheetRow = ({category, details}) => {
    return (
      <View style={styles.rowContainer}>

        <View style={styles.categoryContainer}>
          <Text style={styles.categoryText}>{category}:</Text>
        </View>

        <View style={styles.detailContainer}>
          <Text style={styles.detailText}>{details}</Text>
        </View>

      </View>
    );
  }

  // Used ScrollView instead of Flatlist because there is a small number of rows in the list and the
  // data is not stored in an array
  return (
    <SafeAreaView style={ViewContainer.topLeft}>

      <Text style={[ styles.statusText, {color: statusColor} ]}>APPROVED</Text>

      <ScrollView style={{width: "100%", padding: Spacing.padding.base}}>
        <TimesheetRow category="Student" details="Name" />
        <TimesheetRow category="Date" details="Date here" />
        <TimesheetRow category="Start Time" details="Time here" />
        <TimesheetRow category="Duration (min)" details={60} />
        <TimesheetRow category="Amount Owed ($)" details={40.13} />
        <TimesheetRow category="Additional Notes" details={"A long message that goes over" +
      " multiple lines and just keeps going for some reason"} />
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  statusText: {
    ...TextStyle.titleNoMargin,
    marginHorizontal: Spacing.margin.medium,
    marginTop: Spacing.margin.medium,
  },

  rowContainer: {
    ...ListRow.listItem,
  },

  categoryContainer: {
    width: "40%",
  },

  categoryText: {
    fontWeight: "bold",
    fontSize: TextStyle.fontSize.medium,
  },

  detailContainer: {
    justifyContent: "center",
    flex: 1,
  },

  detailText: {
    fontSize: TextStyle.fontSize.small,
  },
});