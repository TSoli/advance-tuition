import type { RouteProp } from '@react-navigation/native';
import { useAuth } from '../../../context/AuthContext';
import { Address, Subject } from '../../../types/UserData';
import { StudentStackParamList } from '../../navigation/MainNavigation';

type StudentDetailsRouteProp = RouteProp<StudentStackParamList, 'StudentDetailsScreen'>;

const useStudentDetails = (route: StudentDetailsRouteProp) => {
  const { user } = useAuth();
  const { address, subjects } = route.params;

  /** Returns the the address formatted as a string.
   *
   * @param address - The address to format.
   *
   * @returns The formatted address.
   */
  const getFormattedAddress = (address: Address) => {
    return (
      `${address.street}` +
      `\n${address.line2 ? `${address.line2}\n` : ''}` +
      `${address.suburb} ${address.state} ${address.postcode}`
    );
  };

  /** Returns the list of subjects that the tutor teaches the student.
   *
   * @param subjects - The subjects that the student is being tutored for.
   *
   * @returns A string containing comma separated subjects that the tutor
   * teaches the student.
   */
  const getFormattedSubjects = (subjects: Subject[]) => {
    const tutorSubjects = subjects.filter((subject) => {
      return subject.tutor === user.uid;
    });
    return tutorSubjects.map((subject) => subject.subject).join(', ');
  };

  const formattedAddress = getFormattedAddress(address);
  const formattedSubjects = getFormattedSubjects(subjects);

  return { formattedAddress, formattedSubjects };
};

export default useStudentDetails;
export { StudentDetailsRouteProp };
