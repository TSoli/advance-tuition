import { AntDesign } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { LogBox, SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';
import { FloatingActionButton } from '../../components/Buttons';
import { DetailsRow } from '../../components/CustomList';
import { Colors, CustomTextStyle, ListStyle, Spacing, ViewContainer } from '../../styles';
import { getFormattedDate, getFormattedTime } from '../../utils/formatDate';
import { PayrollStackParamList } from '../navigation/MainNavigation';
import { getStatusColor } from './timesheetList/TimesheetListScreen';

// see https://reactnavigation.org/docs/troubleshooting/#i-get-the-warning-non-serializable-values-were-found-in-the-navigation-state
LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

interface TimesheetScreenProps {
  route: RouteProp<PayrollStackParamList, 'TimesheetScreen'>;
}

const TimesheetScreen = ({ route }: TimesheetScreenProps) => {
  const timesheet = route.params;
  const { student, status, datetime, duration, notes } = timesheet.data;
  const statusColor = getStatusColor(status); // Change this later
  const deleteIcon = <AntDesign name="delete" size={36} color={Colors.white} />;

  // Used ScrollView instead of Flatlist because there is a small number of rows in the list and the
  // data is not stored in an array - so FlatList hard here
  return (
    <SafeAreaView style={ViewContainer.topLeft}>
      <Text style={[styles.statusText, { color: statusColor }]}>{status}</Text>

      <ScrollView style={styles.list}>
        <DetailsRow category="Student" details={student} />
        <DetailsRow category="Date" details={getFormattedDate(datetime)} />
        <DetailsRow category="Start Time" details={getFormattedTime(datetime)} />
        <DetailsRow category="Duration (min)" details={duration} />
        <DetailsRow category="Amount Owed ($)" details={(duration * 40) / 60} />
        <DetailsRow category="Additional Notes" details={notes} />
      </ScrollView>

      {status == 'PENDING' && (
        <FloatingActionButton style={styles.floatingActionButton} component={deleteIcon} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  list: {
    ...ListStyle.list.base,
  },

  statusText: {
    ...CustomTextStyle.titleNoMargin,
    marginHorizontal: Spacing.margin.medium,
    marginTop: Spacing.margin.medium,
  },

  floatingActionButton: {
    backgroundColor: Colors.red,
  },
});

export default TimesheetScreen;
