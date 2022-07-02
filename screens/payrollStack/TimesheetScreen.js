import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ListStyle, Spacing, TextStyle, ViewContainer } from "../../styles";
import { getStatusColor } from "./TimesheetListScreen";


export default function TimesheetScreen({ route }) {
  const { studentId, status, date, startTime, duration, note } = route.params;
  const statusColor = getStatusColor(status); // Change this later

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
  // data is not stored in an array - so FlatList hard here
  return (
    <SafeAreaView style={ViewContainer.topLeft}>

      <Text style={[ styles.statusText, {color: statusColor} ]}>{status}</Text>

      <ScrollView style={styles.list}>
        <TimesheetRow category="Student" details={studentId} />
        <TimesheetRow category="Date" details={date} />
        <TimesheetRow category="Start Time" details={startTime} />
        <TimesheetRow category="Duration (min)" details={duration} />
        <TimesheetRow category="Amount Owed ($)" details={duration*40/60} />
        <TimesheetRow category="Additional Notes" details={note} />
      </ScrollView>

    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  list: {
    ...ListStyle.list.base,
  },

  statusText: {
    ...TextStyle.titleNoMargin,
    marginHorizontal: Spacing.margin.medium,
    marginTop: Spacing.margin.medium,
  },

  rowContainer: {
    ...ListStyle.listItem,
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