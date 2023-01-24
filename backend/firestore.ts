// Some useful database functions

import { addDoc, collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import Timesheet from '../types/Timesheet';
import UserData, { Student, StudentData } from '../types/UserData';
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
const getTutorStudents = async (uid: string): Promise<Student[]> => {
  const q = query(collection(db, 'students'), where('tutors', 'array-contains', uid));
  const studentsSnapshot = await getDocs(q);
  return studentsSnapshot.docs.map((doc) => {
    return { id: <string>doc.id, data: <StudentData>doc.data() };
  });
};

/** Adds a timesheet to the database.
 *
 * @param timesheet - The timesheet to add to the database.
 */
const addTimesheet = async (timesheet: Timesheet) => {
  await addDoc(collection(db, 'timesheets'), timesheet);
};

export { addTutor, addTimesheet, getTutorStudents };
