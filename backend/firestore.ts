// Some useful database functions

import { doc, setDoc } from 'firebase/firestore';
import UserData from '../types/UserData';
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

export { addTutor };
