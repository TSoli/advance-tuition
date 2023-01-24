import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import UserAvatar from 'react-native-user-avatar';
import { DetailsRow } from '../../../components/CustomList';
import { CustomTextStyle, ListStyle, Spacing, ViewContainer } from '../../../styles';
import useStudentDetails from './useStudentDetails';

export default function StudentDetailsScreen({ route }) {
  const { data } = route.params;
  const { name, year, contact } = data;
  const { formattedAddress, formattedSubjects } = useStudentDetails(data);

  return (
    <SafeAreaView style={styles.viewContainer}>
      <View style={styles.topContainer}>
        <UserAvatar size={100} name={`${name.first} ${name.last}`} />
        <Text style={styles.name}>
          {name.first} {name.last}
        </Text>
      </View>

      <View style={styles.bottomContainer}>
        <ScrollView style={styles.list}>
          <DetailsRow category="Phone Number" details={contact.phone} />
          <DetailsRow category="Email Address" details={contact.email} />
          <DetailsRow category="Address" details={formattedAddress} />
          {/* TODO: Change this to render ou the subject names in a list */}
          <DetailsRow category="Subject" details={formattedSubjects} />
          <DetailsRow category="Year Level" details={year} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    ...ViewContainer.base,
  },

  topContainer: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  bottomContainer: {
    width: '100%',
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },

  list: {
    ...ListStyle.list.base,
    paddingTop: 0,
  },

  name: {
    ...CustomTextStyle.titleNoMargin,
    paddingVertical: Spacing.padding.large,
  },
});
