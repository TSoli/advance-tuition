import { useContext, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Platform, Pressable } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';

import { AuthContext  } from '../components/context';

export default function HomeScreen({navigation}) {

  const { Logout } = useContext(AuthContext);

  // Get the tutor's students
  const getStudents = () => {
    return [
      { label: 'Fred', value: 'fred' },
      { label: 'Gerogia', value: 'georgia'},
      { label: 'Alex', value: 'alex' },
    ]
  };

  // Date time picker
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  // handle change date
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    // let tempDate = new Date(currentDate)
    // let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
    // let fTime
  };

  // Show the picker using currentMode
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const submitDetails = () => {
    // Add logic here to check details are all valid
    // Then submit details to database for confirmation
    console.log('submitted details');
  };

  return (
    <View style={styles.container} >
      <Text style={{marginBottom: 30, fontSize: 20, fontWeight: 'bold',}}>Record your hours</Text>

      <View style={styles.itemContainer}>
        <RNPickerSelect
          onValueChange={(value) => console.log(value)}
          placeholder={{label: 'Select a Student...', value: null,}}
          items={getStudents()}
        />
      </View>

      <View style={[styles.itemContainer, {flexDirection: 'row'}]}>
        <Text style={styles.itemLabel}>Date:</Text>

        <Pressable onPress={() => showMode('date')}>
          <TextInput editable={false} defaultValue={'DATE'} />
        </Pressable>

      </View>

      <View style={[styles.itemContainer, {flexDirection: 'row'}]}>
        <Text style={styles.itemLabel}>Time:</Text>

        <Pressable onPress={() => showMode('time')}>
          <TextInput editable={false} defaultValue={'TIME'} />
        </Pressable>
        
      </View>

      <View style={[styles.itemContainer, {flexDirection: 'row'}]}>
        <Text style={styles.itemLabel}>Duration:</Text>
        <TextInput keyboardType='numeric' maxLength={3} placeholder={'Minutes'} />
      </View>
      
      <View style={[styles.itemContainer, {flexDirection: 'row', justifyContent: 'space-around'}]}>
        <Button title="Logout" onPress={() => {Logout()}} />
        <Button title="Submit" onPress={() => {submitDetails()}} />
      </View>

      {show && (
        <DateTimePicker
        testID='dateTimePicker'
        value={date}
        mode={mode}
        is24Hour={true}
        display='default'
        onChange={onChange}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  itemContainer: {
    width: "80%",
    marginBottom: 10,
  },

  itemLabel: {
    alignSelf: 'flex-start',
    marginHorizontal: 10,
    marginTop: 3,
  },
});