import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Colors, Spacing, TextStyle, UserInputStyle, ViewContainer } from '../../styles';
import { LargeButton } from '../../components/Buttons';
import { UserInput } from '../../components/UserInput';

const initialErrors = {
  dateError: '',
  studentError: '',
  durationError: '',
  notesError: '',
};

const MAX_DURATION = 360; // Minutes - I can't imagine any tutoring session being more than 6hrs
const MAX_NOTES = 1000;

export default function AddTimesheetScreen() {
  const [date, setDate] = useState(null);
  const [student, setStudent] = useState(null);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [duration, setDuration] = useState(null);
  const [notes, setNotes] = useState(null);
  const [errors, setErrors] = useState(initialErrors);

  // Get the tutor's students
  const getStudents = () => {
    return [
      { label: 'Fred', value: 'fred' },
      { label: 'Gerogia', value: 'georgia' },
      { label: 'Alex', value: 'alex' },
    ];
  };

  // Take a Date object and return it formatted as a string.
  const getFormattedDate = (selectedDate) => {
    if (!selectedDate) {
      return null;
    }
    return `${selectedDate.getDate()}/${selectedDate.getMonth()}/${selectedDate.getFullYear()}`;
  };

  // Take a Date object and return the time formatted as a string.
  const getFormattedTime = (selectedTime) => {
    if (!selectedTime) {
      return null;
    }
    // minutes/hours are two digits
    const minutes =
      selectedTime.getMinutes() > 9
        ? selectedTime.getMinutes().toString()
        : `0${selectedTime.getMinutes().toString()}`;
    const hours =
      selectedTime.getHours() > 9
        ? selectedTime.getHours().toString()
        : `0${selectedTime.getHours().toString()}`;
    return `${hours}:${minutes}`;
  };

  // handle change date/time
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  // Show the picker using currentMode
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  /* Check that the form details are valid and set the error state accordingly
    Returns true if the details are valid and false otherwise
  */
  const isValid = () => {
    const updatedErrors = JSON.parse(JSON.stringify(initialErrors));

    if (!student) updatedErrors.studentError = 'Please choose a student';
    if (!date) updatedErrors.dateError = 'Please choose a date';
    else if (date > new Date()) updatedErrors.dateError = 'Time/date cannot be in the future';
    if (!duration) updatedErrors.durationError = 'Please set a duration';
    else if (duration > MAX_DURATION) {
      updatedErrors.durationError = 'Check the duration is correct (in minutes)';
    }
    if (notes && notes.length > MAX_NOTES) {
      updatedErrors.notesError = `Notes may not exceed ${MAX_NOTES} characters`;
    }

    console.log(JSON.stringify(updatedErrors));
    setErrors(updatedErrors);

    if (Object.values(updatedErrors).some((value) => value)) return false;
    return true;
  };

  const submitDetails = () => {
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
    console.log(`student: ${student}`);
    console.log(`date: ${getFormattedDate(date)}`);
    console.log(`time: ${getFormattedTime(date)}`);
    console.log(`duration: ${duration}`);
    console.log(`Notes: ${notes}`);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        <Text style={styles.title}>Record your hours</Text>

        <View style={styles.itemContainer}>
          <RNPickerSelect
            style={{ inputAndroid: { color: Colors.black } }}
            onValueChange={(selection) => setStudent(selection)}
            placeholder={{ label: 'Select a Student...', value: null }}
            items={getStudents()}
          />
        </View>

        {!!errors.studentError && <Text style={styles.errorText}>{errors.studentError}</Text>}

        <TouchableOpacity style={styles.pressInput} onPress={() => showMode('date')}>
          <UserInput
            title="Date"
            editable={false}
            value={getFormattedDate(date)}
            placeholder="Date"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.pressInput} onPress={() => showMode('time')}>
          <UserInput
            title="Start Time"
            error={errors.dateError}
            editable={false}
            value={getFormattedTime(date)}
            placeholder="Start Time"
          />
        </TouchableOpacity>

        <UserInput
          title="Duration"
          error={errors.durationError}
          placeholder="Duration (minutes)"
          keyboardType="numeric"
          maxLength={3}
          onChangeText={(selectedDuration) => {
            setDuration(parseInt(selectedDuration, 10));
          }}
        />

        <UserInput
          title="Notes"
          error={errors.notesError}
          inputContainerProps={{ style: UserInputStyle.mediumView }}
          placeholder="Additional Notes..."
          multiline
          textAlignVertical="center"
          onChangeText={(text) => setNotes(text)}
        />

        <View
          style={[styles.itemContainer, { flexDirection: 'row', justifyContent: 'space-around' }]}>
          <LargeButton text="SUBMIT" onPress={() => submitDetails()} />
        </View>

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date || new Date()}
            mode={mode}
            is24Hour
            display="default"
            onChange={onChange}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    ...ViewContainer.base,
    alignItems: 'stretch',
    flexGrow: 1,
  },

  title: {
    ...TextStyle.title,
    margin: Spacing.margin.medium,
  },

  errorText: {
    color: Colors.red,
    alignSelf: 'flex-start',
    marginLeft: '10%', // the user input has width of 20%
    paddingLeft: Spacing.padding.medium, // And this amount of margin
  },

  itemContainer: {
    width: '80%',
    marginBottom: Spacing.margin.base,
  },

  itemLabel: {
    alignSelf: 'flex-start',
    marginHorizontal: Spacing.margin.base,
    marginTop: 3,
  },

  pressInput: {
    width: '100%',
    alignItems: 'center',
  },

  scrollContentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    paddingBottom: Spacing.padding.medium,
  },
});
