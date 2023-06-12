// Some useful database functions

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import TimesheetData, { Timesheet } from '../types/Timesheet';
import { Student, StudentData, TutorData } from '../types/UserData';
import { db } from './firebase';

// Default max number of timesheets to query at a time.
const DEFAULT_TIMESHEET_LIMIT = 15;

/** Adds the tutor's user data to the database.
 *
 * @remarks
 *
 * Any extra fields will also be added to the database so make sure they are
 * removed before passing in the UserData object.
 *
 * @param uid - The tutor's unique user id.
 * @param userData - The tutor's user data.
 */
const addTutor = async (uid: string, userData: TutorData) => {
  await setDoc(doc(db, 'tutors', uid), userData);
};

/** Get the tutor data from the database.
 *
 * @param uid - The user's UID.
 * @returns The user's TutorData.
 */
const getTutor = async (uid: string): Promise<TutorData> => {
  const tutorData = await getDoc(doc(db, 'tutors', uid));
  return tutorData.data() as TutorData;
};

/** Get the students data for a particular tutor.
 *
 * @param uid - The tutor's UID.
 *
 * @returns An array of the students for the tutor.
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
const addTimesheet = async (timesheet: TimesheetData) => {
  await addDoc(collection(db, 'timesheets'), timesheet);
};

/** Deletes the timesheet document
 *
 * @param id - The document ID for the timesheet to delete.
 */
const deleteTimesheet = async (id: string) => {
  await deleteDoc(doc(db, 'timesheets', id));
};

/** Get the timesheets for a tutor.
 *
 * @param uid - The tutor's UID.
 * @param date - The date to query up to (not including).
 * @param maxNum - The maximum number of timesheets to query.
 *
 * @returns An array of the timesheets for the tutor ordered by date (latest first).
 */
const getTutorTimesheets = async (
  uid: string,
  date: Date,
  maxNum: number = DEFAULT_TIMESHEET_LIMIT
): Promise<Timesheet[]> => {
  const q = query(
    collection(db, 'timesheets'),
    where('tutor', '==', uid),
    where('datetime', '<', date),
    orderBy('datetime', 'desc'),
    limit(maxNum)
  );
  const timesheetSnapshot = await getDocs(q);
  const timesheets = timesheetSnapshot.docs.map((doc) => {
    return { id: <string>doc.id, data: doc.data() };
  });
  // Firestore returns a timestamp so it must be converted to a date object
  return timesheets.map((timesheet) => {
    return {
      ...timesheet,
      data: { ...timesheet.data, datetime: timesheet.data.datetime.toDate() },
    } as Timesheet;
  });
};

export { addTutor, getTutor, addTimesheet, deleteTimesheet, getTutorStudents, getTutorTimesheets };
