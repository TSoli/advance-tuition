import { AntDesign } from '@expo/vector-icons';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { useState } from 'react';
import { Alert, LogBox, SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';
import { deleteTimesheet } from 'advance-tuition-backend';
import { FloatingActionButton } from '../../components/Buttons';
import { DetailsRow } from '../../components/CustomList';
import { Loading } from '../../components/Loading';
import { Colors, CustomTextStyle, ListStyle, Spacing, ViewContainer } from '../../styles';
import { getFormattedDate, getFormattedTime } from '../../utils/formatDate';
import { PayrollStackParamList } from '../navigation/StackParamLists';
import { getStatusColor } from './timesheetList/TimesheetListScreen';

// see https://reactnavigation.org/docs/troubleshooting/#i-get-the-warning-non-serializable-values-were-found-in-the-navigation-state
LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

interface TimesheetScreenProps {
  navigation: NavigationProp<PayrollStackParamList, 'TimesheetScreen'>;
  route: RouteProp<PayrollStackParamList, 'TimesheetScreen'>;
}

const TimesheetScreen = ({ navigation, route }: TimesheetScreenProps) => {
  const { timesheet, student } = route.params;
  const { status, datetime, duration, owed, notes } = timesheet.data;
  const [loading, setLoading] = useState(false);
  const statusColor = getStatusColor(status);
  const deleteIcon = <AntDesign name="delete" size={36} color={Colors.white} />;

  const name = `${student?.data.name.first} ${student?.data.name.last}`;
  const onDelete = async () => {
    setLoading(true);
    try {
      await deleteTimesheet(timesheet.id);
      setLoading(false);
      Alert.alert('Timesheet Deleted', 'Timesheet was successfully deleted.');
      navigation.navigate('TimesheetListScreen');
    } catch (error: any) {
      setLoading(false);
      Alert.alert('Deletion Failed', `Failed to delete the timesheet: ${error.message}.`);
    }
  };

  // Used ScrollView instead of Flatlist because there is a small number of rows in the list and the
  // data is not stored in an array - so FlatList hard here
  return (
    <SafeAreaView style={ViewContainer.topLeft}>
      <Text style={[styles.statusText, { color: statusColor }]}>{status}</Text>

      <ScrollView style={styles.list}>
        <DetailsRow category="Student" details={name} />
        <DetailsRow category="Date" details={getFormattedDate(datetime)} />
        <DetailsRow category="Start Time" details={getFormattedTime(datetime)} />
        <DetailsRow category="Duration (min)" details={duration} />
        <DetailsRow category="Amount Owed ($)" details={owed} />
        <DetailsRow category="Additional Notes" details={notes} />
      </ScrollView>

      {status === 'PENDING' && (
        <FloatingActionButton
          style={styles.floatingActionButton}
          component={deleteIcon}
          onPress={onDelete}
        />
      )}

      {loading && <Loading />}
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
