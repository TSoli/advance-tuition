import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { getTutorStudents, getTutorTimesheets } from '../../../backend/firestore';
import { useAuth } from '../../../context/AuthContext';
import { Timesheet } from '../../../types/Timesheet';
import { getStudentNameFromID, Student } from '../../../types/UserData';

const useTimesheetList = () => {
  const [timesheets, setTimesheets] = useState<Timesheet[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const { user } = useAuth();

  const getTimesheets = async () => {
    setLoading(true);
    try {
      const newTimesheets = await getTutorTimesheets(user.uid);
      setTimesheets(newTimesheets);
      const newStudents = await getTutorStudents(user.uid);
      setStudents(newStudents);
    } catch (error: any) {
      Alert.alert(
        'Failed to get Timesheets',
        `Failed to get Timesheets: ${error.message}\nPlease try refreshing the page.`
      );
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTimesheets();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    getTimesheets();
    setRefreshing(false);
  };

  /** Get the student name
   *
   * @param id - The ID for the student.
   *
   * @returns The student's full name.
   */
  const getStudentName = (id: string) => {
    const name = getStudentNameFromID(id, students);
    return name ? `${name?.first} ${name.last}` : undefined;
  };

  /** Get the student from their ID
   *
   * @param id - The student's ID
   *
   * @returns The the tutor's student with that ID.
   */
  const getStudent = (id: string) => {
    const thisStudent = students.filter((student) => student.id === id);
    return thisStudent.length ? thisStudent[0] : undefined;
  };

  return { onRefresh, getStudentName, getStudent, timesheets, students, loading, refreshing };
};

export default useTimesheetList;
