import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Colors, ViewContainer } from "../../styles";


export default function StudentDetailsScreen() {
  return (
    <SafeAreaView style={ViewContainer.base}>
      <View style={styles.topContainer}>
        <Text>Photo/Initials go here...</Text>
      </View>

      <View style={styles.bottomContainer}>
        <Text>Details go here...</Text>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  topContainer: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey,
  },

  bottomContainer: {
    width: "100%",
    flex: 2,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
  },
})