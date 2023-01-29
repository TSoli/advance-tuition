import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { LargeButton } from '../../../components/Buttons';
import { Loading } from '../../../components/Loading';
import { UserInput } from '../../../components/UserInput/UserInput';
import { Colors, CustomTextStyle, Spacing, ViewContainer } from '../../../styles';
import useAddTimesheet from './useAddTimesheet';

export default function AddTimesheetScreen() {
  const {
    showMode,
    onChangeDate,
    submitDetails,
    setTimesheet,
    students,
    loading,
    timesheet,
    formattedDate,
    formattedTime,
    mode,
    show,
    errors,
  } = useAddTimesheet();

  const studentItems = students.map((student) => {
    return { label: `${student.data.name.first} ${student.data.name.last}`, value: student.id };
  });

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        <Text style={styles.title}>Record your hours</Text>

        <View style={styles.itemContainer}>
          <RNPickerSelect
            style={{ inputAndroid: { color: Colors.black } }}
            onValueChange={(student) =>
              setTimesheet((prevState) => {
                return { ...prevState, student: student };
              })
            }
            placeholder={{ label: 'Select a Student...', value: null }}
            items={studentItems}
          />
        </View>

        {!!errors.student && <Text style={styles.errorText}>{errors.student}</Text>}

        <TouchableOpacity style={styles.pressInput} onPress={() => showMode('date')}>
          <UserInput title="Date" editable={false} value={formattedDate} placeholder="Date" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.pressInput} onPress={() => showMode('time')}>
          <UserInput
            title="Start Time"
            error={errors.date}
            editable={false}
            value={formattedTime}
            placeholder="Start Time"
          />
        </TouchableOpacity>

        <UserInput
          title="Duration"
          error={errors.duration}
          placeholder="Duration (minutes)"
          keyboardType="numeric"
          maxLength={3}
          onChangeText={(duration) => {
            setTimesheet((prevState) => {
              return { ...prevState, duration: parseInt(duration, 10) };
            });
          }}
        />

        <UserInput
          title="Notes"
          autoCapitalize="sentences"
          error={errors.notes}
          size="medium"
          placeholder="Additional Notes..."
          multiline
          textAlignVertical="center"
          onChangeText={(text) =>
            setTimesheet((prevState) => {
              return { ...prevState, notes: text };
            })
          }
        />

        <View style={[styles.itemContainer, styles.buttonContainer]}>
          <LargeButton text="SUBMIT" onPress={submitDetails} />
        </View>

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={timesheet.datetime || new Date()}
            mode={mode}
            is24Hour
            display="default"
            onChange={onChangeDate}
          />
        )}
      </ScrollView>
      {loading && <Loading />}
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
    ...CustomTextStyle.title,
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

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Spacing.margin.base,
  },

  scrollContentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    paddingBottom: Spacing.padding.medium,
  },
});
