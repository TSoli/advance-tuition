import { useEffect, useState } from 'react';
import { getTutorStudents } from '../../../backend/firestore';
import { useAuth } from '../../../context/AuthContext';
import { StudentData } from '../../../types/UserData';

const useStudentList = () => {
  const [students, setStudents] = useState<StudentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const { user } = useAuth();

  const getStudents = async () => {
    setLoading(true);
    const newData = await getTutorStudents(user.uid);
    setStudents(newData);
    setLoading(false);
  };

  const onRefresh = () => {
    setRefreshing(true);
    getStudents();
    setRefreshing(false);
  };

  useEffect(() => {
    getStudents();
  }, []);

  return { students, loading, refreshing, onRefresh };
};

export default useStudentList;
