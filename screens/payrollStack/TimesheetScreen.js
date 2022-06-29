// A screen used to display recent timesheets for the tutor

import { FlatList, Text, SafeAreaView, StyleSheet, View } from "react-native";
import Timesheets from "../../model/Timesheets";
import { Colors, Spacing, ViewContainer } from "../../styles";

const getStatusColor = (status) => {
  if (status.toUpperCase() === "APPROVED") {
    return Colors.green;
  } else if (status.toUpperCase() === "PENDING") {
    return Colors.grey;
  } else if (status.toUpperCase() === "DENIED") {
    return Colors.red;
  } else { // unknown status
    return Colors.orange;
  }
};

export default function TimesheetScreen() {
  return (
    <SafeAreaView style={ViewContainer.base}>

      <FlatList
      style={styles.list}
        data={Timesheets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.rowContainer}>

            <View>
              <Text style={styles.text}>
                {item.date}
              </Text>

              <Text>
                Name: {item.id}
              </Text>
            </View>

            <View style={{justifyContent: "center"}}>
              <Text style={{ ...styles.text, opacity: 0.5, color: getStatusColor(item.status) }}> 
                {item.status}
              </Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  list: {
    width: "100%",
    paddingTop: Spacing.padding.base,
  },

  rowContainer: {
    flex: 1,
    paddingVertical: Spacing.padding.base,
    paddingHorizontal: Spacing.padding.base,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey,
  },

  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
})