// Some useful database functions

import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import UserData, { StudentData } from '../types/UserData';
import { db } from './firebase';

/** Adds the tutor's user data to the database.
 *
 * @remarks
 *
 * Any extra fields will also be added to the database so make sure they are
 * removed before passing in the USerData object.
 *
 * @param uid - The tutor's unique user id.
 * @param userData - The tutor's user data.
 */
const addTutor = async (uid: string, userData: UserData) => {
  await setDoc(doc(db, 'tutors', uid), userData);
};

/** Get the students data for a particular tutor.
 *
 * @param uid - The tutor's UID.
 *
 * @returns An array of the student data.
 */
const getTutorStudents = async (uid: string): Promise<StudentData[]> => {
  const q = query(collection(db, 'students'), where('tutors', 'array-contains', uid));
  const studentsSnapshot = await getDocs(q);
  return studentsSnapshot.docs.map((doc) => <StudentData>doc.data());
};

export { addTutor, getTutorStudents };
