// A screen used to display recent timesheets for the tutor

import { FlatList, Text, SafeAreaView } from "react-native";
import Timesheets from "../../model/Timesheets";
import { Colors, ViewContainer } from "../../styles";


export default function TimesheetScreen() {
  return (
    <SafeAreaView style={ViewContainer.base}>

      <FlatList
        data={Timesheets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text>
            Date: {item.date} Start Time: {item.startTime} Duration: {item.duration} Student: {item.studentId}
          </Text>
        )}
      />
    </SafeAreaView>
  );
}