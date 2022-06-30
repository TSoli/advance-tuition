// A screen used to display recent timesheets for the tutor

import { FlatList, Text, SafeAreaView, StyleSheet, View } from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import Timesheets from "../../model/Timesheets";
import { Colors, ListRow, Spacing, TextStyle, ViewContainer } from "../../styles";

export const getStatusColor = (status) => {
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

export default function TimesheetListScreen({ navigation }) {
  return (
    <SafeAreaView style={ViewContainer.base}>

      <FlatList
        style={styles.list}
        data={Timesheets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigation.navigate("TimesheetScreen")}>
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
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  list: {
    width: "100%",
    paddingHorizontal: Spacing.padding.base,
    paddingTop: Spacing.padding.base,
  },

  rowContainer: {
    ...ListRow.listItem,
    justifyContent: "space-between",
  },

  text: {
    fontSize: TextStyle.fontSize.medium,
    fontWeight: 'bold',
  },
})