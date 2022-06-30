import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { ViewContainer } from "../../styles";

// import the students from the model file
const studentData = require('../../model/students.json');

export default function StudentListScreen({ navigation }) {
  // Should use a Flatlist or Scrollview or something for this and format it
  return (
    <View style={ViewContainer.base}>

      <FlatList
        data={studentData.students}
        keyExtractor={(student) => student.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("StudentDetailsScreen")}>
            <Text>{item.first_name} {item.last_name}</Text>
          </TouchableOpacity>
        )}
      />

    </View>
  );
}