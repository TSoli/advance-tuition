// A screen used to display recent timesheets for the tutor

import { FlatList, StyleSheet, Text, View } from "react-native";
import Timesheets from "../model/Timesheets";
import { Colors } from "../styles";


export default function TimesheetScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={Timesheets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text>
            Date: {item.date} Start Time: {item.startTime} Duration: {item.duration} Student: {item.studentId}
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});