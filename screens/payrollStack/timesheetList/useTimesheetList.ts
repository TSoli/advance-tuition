import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import {
  Student,
  Timesheet,
  getStudentNameFromID,
  getTutorStudents,
  getTutorTimesheets,
} from '../../../advance-tuition-backend';
import { useAuth } from '../../../context/AuthContext';

const useTimesheetList = () => {
  const [timesheets, setTimesheets] = useState<Timesheet[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const { user } = useAuth();

  /** Get timesheets for the user.
   *
   * @param date - Latest date for timesheets (non-inclusive)
   * @param append - Whether to append the timehseets to the existing timesheets. false by default.
   */
  const getTimesheets = async (date: Date, append: boolean = false) => {
    setLoading(true);
    try {
      const newTimesheets = await getTutorTimesheets(user.uid, date);
      if (append) setTimesheets((prev) => prev.concat(newTimesheets));
      else setTimesheets(newTimesheets);
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

  /** Get the tutors students. */
  const getStudents = async () => {
    try {
      const newStudents = await getTutorStudents(user.uid);
      setStudents(newStudents);
    } catch (error: any) {
      Alert.alert('Failed to get Students'),
        `Failed to get Students: ${error.message}\nPlease try refreshing the page.`;
    }
  };

  useEffect(() => {
    // TODO: If the screen is not full and you can't scroll you will not be able to trigger onEncReached to get more timesheets.
    getTimesheets(new Date());
    getStudents();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    getTimesheets(new Date());
    getStudents();
    setRefreshing(false);
  };

  const onEndReached = () => {
    getTimesheets(timesheets[timesheets.length - 1].data.datetime, true);
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

  return {
    onRefresh,
    onEndReached,
    getStudentName,
    getStudent,
    timesheets,
    students,
    loading,
    refreshing,
  };
};

export default useTimesheetList;
