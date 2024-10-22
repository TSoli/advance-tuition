import { NavigationProp } from '@react-navigation/native';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import UserAvatar from 'react-native-user-avatar';
import { Loading } from '../../../components/Loading';
import { FontSize, ListStyle, Spacing, ViewContainer } from '../../../styles';
import { Student } from '../../../advance-tuition-backend/';
import { StudentStackParamList } from '../../navigation/StackParamLists';
import useStudentList from './useStudentList';

interface StudentDetailsScreenProps {
  navigation: NavigationProp<StudentStackParamList, 'StudentListScreen'>;
}

const StudentListScreen = ({ navigation }: StudentDetailsScreenProps) => {
  const { students, loading, refreshing, onRefresh } = useStudentList();
  const refreshControl = <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />;

  const listItem = (student: Student) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('StudentDetailsScreen', student)}>
        <View style={styles.rowContainer}>
          <UserAvatar
            style={styles.avatar}
            size={40}
            name={`${student.data.name.first} ${student.data.name.last}`}
          />
          <Text style={styles.text}>
            {student.data.name.first} {student.data.name.last}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={ViewContainer.base}>
      <FlatList
        style={styles.list}
        data={students}
        keyExtractor={(student) => student.id}
        refreshControl={refreshControl}
        renderItem={({ item: student }) => listItem(student)}
      />
      {loading && <Loading />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  list: {
    ...ListStyle.list.base,
  },

  rowContainer: {
    ...ListStyle.listItem,
    alignItems: 'baseline',
  },

  text: {
    fontSize: FontSize.medium,
    fontWeight: 'bold',
  },

  avatar: {
    marginRight: Spacing.margin.base,
  },
});

export default StudentListScreen;
