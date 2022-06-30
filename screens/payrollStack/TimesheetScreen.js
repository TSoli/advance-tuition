import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { ListRow, Spacing, TextStyle, ViewContainer } from "../../styles";
import { getStatusColor } from "./TimesheetListScreen";


export default function TimesheetScreen() {
  return (
    <SafeAreaView style={ViewContainer.topLeft}>

      <Text style={{...TextStyle.titleNoMargin, padding: Spacing.padding.medium}}>APPROVED</Text>

      <View style={styles.rowContainer}>
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryText}>Category</Text>
        </View>

        <View style={styles.detailContainer}>
          <Text>Details</Text>
        </View>
      </View>

      {/* <View style={styles.categoryContainer}>
        <Text>Category</Text>
        <Text>Category 2</Text>
        <Text>A Loooooooooooong Category</Text>
      </View>

      <View>
        <Text>Details</Text>
        <Text>Details 2</Text>
      </View> */}

    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  rowContainer: {
    ...ListRow.listItem,
  },

  categoryContainer: {
    width: "30%",
  },

  categoryText: {
    fontWeight: "bold",
    fontSize: TextStyle.fontSize.medium,
  },

  detailContainer: {
    justifyContent: "center",
  },

  detailText: {
    fontSize: TextStyle.fontSize.small,
  },
});