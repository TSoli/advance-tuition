import { View, SafeAreaView, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import UserAvatar from 'react-native-user-avatar';

import { ViewContainer, ListStyle, TextStyle, Spacing } from "../../styles";

// import the students from the model file
const studentData = require('../../model/students.json');

export default function StudentListScreen({ navigation }) {
  // Should use a Flatlist or Scrollview or something for this and format it
  return (
    <SafeAreaView style={ViewContainer.base}>

      <FlatList
        style={styles.list}
        data={studentData.students}
        keyExtractor={(student) => student.id}
        renderItem={({ item }) => (

          <TouchableOpacity onPress={() => navigation.navigate("StudentDetailsScreen", item)} >
            <View style={styles.rowContainer}>
              <UserAvatar 
                style={styles.avatar}
                size={40}
                name={item.first_name + " " + item.last_name}
              />
              <Text style={styles.text}>{item.first_name} {item.last_name}</Text>
            </View>
          </TouchableOpacity>

        )}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  list: {
    ...ListStyle.list.base,
  },

  rowContainer: {
    ...ListStyle.listItem,
    alignItems: "baseline",
  },

  text: {
    fontSize: TextStyle.fontSize.medium,
    fontWeight: "bold",
  },

  avatar: {
    marginRight: Spacing.margin.base,
  },
})