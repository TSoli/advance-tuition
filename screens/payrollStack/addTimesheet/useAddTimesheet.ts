import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useEffect, useState } from 'react';
import { Alert, Platform } from 'react-native';
import { addTimesheet, getTutorStudents } from '../../../backend/firestore';
import { useAuth } from '../../../context/AuthContext';
import TimesheetData from '../../../types/Timesheet';
import { Student } from '../../../types/UserData';
import { getFormattedDate, getFormattedTime } from '../../../utils/formatDate';

interface Errors {
  date: string;
  student: string;
  duration: string;
  notes: string;
}

const initialTimesheet: TimesheetData = {
  datetime: undefined,
  tutor: '',
  student: '',
  duration: 0,
  notes: undefined,
  subject: '',
  status: 'PENDING',
  isPaid: false,
};

const initialErrors: Errors = {
  date: '',
  student: '',
  duration: '',
  notes: '',
};

const MIN_DURATION = 30; // Minutes
const MAX_DURATION = 360; // Minutes - I can't imagine any tutoring session being more than 6hrs
const MAX_NOTES = 1000;

const useAddTimesheet = () => {
  const [timesheet, setTimesheet] = useState({ ...initialTimesheet });
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<Student[]>([]);
  const [mode, setMode] = useState<'date' | 'time'>('date');
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({ ...initialErrors });

  const { user } = useAuth();

  const getStudents = async () => {
    setLoading(true);
    try {
      const newStudents = await getTutorStudents(user.uid);
      setStudents(newStudents);
    } catch (error: any) {
      Alert.alert(
        'Failed to get students',
        `Failed to get students: ${error.message}.\nPlease try closing the page and reopening it.`
      );
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStudents();
    setTimesheet((prevState) => {
      return { ...prevState, tutor: user.uid };
    });
  }, []);

  // handle change date/time
  const onChangeDate = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
    const newDate = selectedDate || timesheet.datetime;
    setShow(Platform.OS === 'ios'); // Why did I do this?
    setTimesheet((prevState) => {
      return { ...prevState, datetime: newDate };
    });
  };

  // Show the picker using currentMode
  const showMode = (currentMode: 'date' | 'time') => {
    setShow(true);
    setMode(currentMode);
  };

  /* Check that the form details are valid and set the error state accordingly
    Returns true if the details are valid and false otherwise
  */
  const isValid = () => {
    const updatedErrors = { ...initialErrors };

    if (!timesheet.student) updatedErrors.student = 'Please choose a student';
    if (!timesheet.datetime) updatedErrors.date = 'Please choose a date';
    else if (timesheet.datetime > new Date())
      updatedErrors.date = 'Time/date cannot be in the future';
    if (!timesheet.duration) updatedErrors.duration = 'Please set a duration';
    else if (timesheet.duration > MAX_DURATION || timesheet.duration < MIN_DURATION) {
      updatedErrors.duration = 'Check the duration is correct (in minutes)';
    }
    if (timesheet.notes && timesheet.notes.length > MAX_NOTES) {
      updatedErrors.notes = `Notes may not exceed ${MAX_NOTES} characters`;
    }

    setErrors(updatedErrors);

    return !Object.values(updatedErrors).some((value) => value);
  };

  const formattedDate = getFormattedDate(timesheet.datetime);
  const formattedTime = getFormattedTime(timesheet.datetime);

  const submitDetails = async () => {
    // Add logic here to check details are all valid
    // Then submit details to database for confirmation
    if (!isValid()) {
      Alert.alert(
        'Invalid Details',
        'Please check your details and try again. If this error persists, seek assistance.'
      );
      return;
    }
    // Submit details to the db
    console.log('submitted details:');
    console.log(`student: ${timesheet.student}`);
    console.log(`date: ${formattedDate}`);
    console.log(`time: ${formattedTime}`);
    console.log(`duration: ${timesheet.duration}`);
    console.log(`Notes: ${timesheet.notes}`);
    try {
      await addTimesheet(timesheet);
    } catch (error: unknown) {
      console.error(error);
      Alert.alert(
        'Error',
        'Timesheet may not have been submitted properly. Please refresh the list and try again ' +
          'if necessary.'
      );
      return;
    }

    Alert.alert('Timesheet submitted', 'The timesheet was successfully submitted!');
  };

  return {
    onChangeDate,
    showMode,
    submitDetails,
    setTimesheet,
    students,
    loading,
    timesheet,
    formattedTime,
    formattedDate,
    mode,
    show,
    errors,
  };
};

export default useAddTimesheet;
