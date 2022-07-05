import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { DetailsRow } from "../../components/CustomList";
import { ListStyle, Spacing, TextStyle, ViewContainer } from "../../styles";
import { getStatusColor } from "./TimesheetListScreen";


export default function TimesheetScreen({ route }) {
  const { studentId, status, date, startTime, duration, note } = route.params;
  const statusColor = getStatusColor(status); // Change this later

  // Used ScrollView instead of Flatlist because there is a small number of rows in the list and the
  // data is not stored in an array - so FlatList hard here
  return (
    <SafeAreaView style={ViewContainer.topLeft}>

      <Text style={[ styles.statusText, {color: statusColor} ]}>{status}</Text>

      <ScrollView style={styles.list}>
        <DetailsRow category="Student" details={studentId} />
        <DetailsRow category="Date" details={date} />
        <DetailsRow category="Start Time" details={startTime} />
        <DetailsRow category="Duration (min)" details={duration} />
        <DetailsRow category="Amount Owed ($)" details={duration*40/60} />
        <DetailsRow category="Additional Notes" details={note} />
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
});