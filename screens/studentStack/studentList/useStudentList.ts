import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { getTutorStudents } from '../../../backend/firestore';
import { useAuth } from '../../../context/AuthContext';
import { Student } from '../../../types/UserData';

const useStudentList = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const { user } = useAuth();

  const getStudents = async () => {
    setLoading(true);
    try {
      const newData = await getTutorStudents(user.uid);
      setStudents(newData);
    } catch (error: any) {
      Alert.alert(
        'Failed to get students',
        `Failed to get students: ${error.message}.\nPlease try refreshing.`
      );
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    getStudents();
    setRefreshing(false);
  };

  return { students, loading, refreshing, onRefresh };
};

export default useStudentList;
