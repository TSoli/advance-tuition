// A screen used to display recent timesheets for the tutor
import { AntDesign } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { TimesheetStatus } from '../../../advance-tuition-backend';
import { FloatingActionButton } from '../../../components/Buttons';
import { Loading } from '../../../components/Loading';
import { Colors, FontSize, ListStyle, ViewContainer } from '../../../styles';
import { getFormattedDate } from '../../../utils/formatDate';
import { PayrollStackParamList } from '../../navigation/StackParamLists';
import useTimesheetList from './useTimesheetList';

export const getStatusColor = (status: TimesheetStatus) => {
  switch (status.toUpperCase()) {
    case 'APPROVED':
      return Colors.green;
    case 'PENDING':
      return Colors.grey;
    case 'DENIED':
      return Colors.red;
    default: // UNKNOWN
      return Colors.orange;
  }
};

interface TimesheetListScreenProps {
  navigation: NavigationProp<PayrollStackParamList, 'TimesheetListScreen'>;
}

const TimesheetListScreen = ({ navigation }: TimesheetListScreenProps) => {
  const { onRefresh, onEndReached, getStudentName, getStudent, timesheets, loading, refreshing } =
    useTimesheetList();
  const plusIcon = <AntDesign name="plus" size={42} color={Colors.white} />;
  const refreshControl = <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />;

  return (
    <SafeAreaView style={ViewContainer.base}>
      <FlatList
        style={styles.list}
        data={timesheets}
        refreshControl={refreshControl}
        onEndReached={onEndReached}
        // onEndReachedThreshold={0.1}
        keyExtractor={(item) => item.id}
        renderItem={({ item: timesheet }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('TimesheetScreen', {
                timesheet: timesheet,
                student: getStudent(timesheet.data.student),
              })
            }>
            <View style={styles.rowContainer}>
              <View>
                <Text style={styles.text}>{getFormattedDate(timesheet.data.datetime)}</Text>
                <Text>{getStudentName(timesheet.data.student)}</Text>
              </View>

              <View style={{ justifyContent: 'center' }}>
                <Text
                  style={[
                    styles.text,
                    { opacity: 0.5, color: getStatusColor(timesheet.data.status) },
                  ]}>
                  {timesheet.data.status}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      <FloatingActionButton
        component={plusIcon}
        onPress={() => navigation.navigate('AddTimesheetScreen')}
      />

      {loading && <Loading />}
    </SafeAreaView>
  );
};

interface Styles {
  list: ViewStyle;
  rowContainer: ViewStyle;
  text: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  list: {
    ...ListStyle.list.base,
  },

  rowContainer: {
    ...ListStyle.listItem,
    justifyContent: 'space-between',
  },

  text: {
    fontSize: FontSize.medium,
    fontWeight: 'bold',
  },
});

export default TimesheetListScreen;
