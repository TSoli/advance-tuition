import { View, StyleSheet, Text } from "react-native";
import { Colors } from "../styles";


export default function StudentListScreen() {
  return (
    <View style={styles.container}>
      <Text>Student List goes here...</Text>
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