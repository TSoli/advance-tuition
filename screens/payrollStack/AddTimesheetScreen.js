
import { useState } from 'react';
import {
  StyleSheet, Text, View, TextInput, Platform, KeyboardAvoidingView,
  SafeAreaView, TouchableOpacity
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Colors, Spacing, TextStyle, UserInput, ViewContainer } from '../../styles';
import { LargeButton } from '../../components/Buttons';

export default function AddTimesheetScreen({navigation}) {

  // Get the tutor's students
  const getStudents = () => {
    return [
      { label: 'Fred', value: 'fred' },
      { label: 'Gerogia', value: 'georgia'},
      { label: 'Alex', value: 'alex' },
    ]
  };

  // Take a Date object and return it formatted as a string.
  const getFormattedDate = (selectedDate) => {
    if (!selectedDate) {
      return null;
    }
    return selectedDate.getDate() + '/' + selectedDate.getMonth() + '/' + selectedDate.getFullYear();
  }

  // Take a Date object and return the time formatted as a string.
  const getFormattedTime = (selectedTime) => {
    if (!selectedTime) {
      return null;
    }
    // Check the number of minutes is two digits
    let minutes = (selectedTime.getMinutes() > 9) ? 
      selectedTime.getMinutes() : '0' + selectedTime.getMinutes();
    return selectedTime.getHours() + ':' + minutes;
  }

  // Date time picker
  const [date, setDate] = useState(null);
  const [student, setStudent] = useState(null);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [duration, setDuration] = useState(null);

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

  const submitDetails = () => {
    // Add logic here to check details are all valid
    // Then submit details to database for confirmation
    console.log('submitted details:');
    console.log(`student: ${student}`);
    console.log(`date: ${getFormattedDate(date)}`);
    console.log(`time: ${getFormattedTime(date)}`);
    console.log(`duration: ${duration}`);
  };

  return (
    <SafeAreaView style={ViewContainer.base} >
      <Text style={TextStyle.title}>Record your hours</Text>

      <View style={styles.itemContainer}>
        <RNPickerSelect
          style={{ inputAndroid: { color: Colors.black } }}
          onValueChange={(student) => { setStudent(student) }}
          placeholder={{label: 'Select a Student...', value: null}}
          items={getStudents()}
        />
      </View>

      <TouchableOpacity onPress={() => showMode('date')} >
        <View style={UserInput.view}>
          <TextInput
            style={UserInput.text}
            editable={false}
            value={getFormattedDate(date)}
            placeholder="Date"
            placeholderTextColor={Colors.white}
            color={Colors.white}
        />
      </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => showMode('time')} >
        <View style={UserInput.view}>
          <TextInput
            style={UserInput.text}
            editable={false}
            value={getFormattedTime(date)}
            placeholder="Start Time"
            placeholderTextColor={Colors.white}
            color={Colors.white}
          />
        </View>
      </TouchableOpacity>

      <KeyboardAvoidingView style={UserInput.view} behavior="padding">
        <TextInput
          style={UserInput.text}
          placeholder="Duration (minutes)"
          placeholderTextColor={Colors.white}
          color={Colors.white}
          keyboardType='numeric'
          maxLength={3}
          onChangeText={(selectedDuration) => {setDuration(parseInt(selectedDuration))}}
        />
      </KeyboardAvoidingView>

      <KeyboardAvoidingView style={UserInput.mediumView} behavior="padding">
        <TextInput
          style={UserInput.text}
          multiline={true}
          textAlignVertical="center"
          placeholder="Additional Notes..."
          placeholderTextColor={Colors.white}
          color={Colors.white}
          // Add an onChangeText here
        />
      </KeyboardAvoidingView>

      <View style={[styles.itemContainer, {flexDirection: 'row', justifyContent: 'space-around'}]}>
        <LargeButton text={"SUBMIT"} onPress={submitDetails()}/>
      </View>

      {show && (
        <DateTimePicker
        testID='dateTimePicker'
        value={date || new Date()}
        mode={mode}
        is24Hour={true}
        display='default'
        onChange={onChange}
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    width: "80%",
    marginBottom: Spacing.margin.base,
  },

  itemLabel: {
    alignSelf: 'flex-start',
    marginHorizontal: Spacing.margin.base,
    marginTop: 3,
  },
});