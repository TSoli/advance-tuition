// A screen used to display recent timesheets for the tutor

import { FlatList, Text, SafeAreaView, StyleSheet, View, TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { Colors, ListStyle, TextStyle, ViewContainer } from "../../styles";
import Timesheets from "../../model/Timesheets";
import { FloatingActionButton } from "../../components/Buttons";

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
  const plusIcon = <AntDesign name="plus" size={42} color={Colors.white} />
  return (
    <SafeAreaView style={ViewContainer.base}>

      <FlatList
        style={styles.list}
        data={Timesheets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("TimesheetScreen", item)}>
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
                <Text style={[styles.text, { opacity: 0.5, color: getStatusColor(item.status) }]}> 
                  {item.status}
                </Text>
              </View>

            </View>
          </TouchableOpacity>
        )}
      />

      <FloatingActionButton text="+" textProps={{style: styles.actionButtonText}} component={plusIcon}/>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  list: {
    ...ListStyle.list.base,
  },

  rowContainer: {
    ...ListStyle.listItem,
    justifyContent: "space-between",
  },

  text: {
    fontSize: TextStyle.fontSize.medium,
    fontWeight: 'bold',
  },

  actionButtonText: {
    fontSize: TextStyle.fontSize.extraLarge,
  },
})