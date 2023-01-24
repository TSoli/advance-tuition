// Object interfaces for storing user information
interface Name {
  /** The first name */
  first: string;
  /** The surname */
  last: string;
}

interface Address {
  /** The street address. */
  street: string;
  /** The second line of address (i.e unit number) - can be left as an empty string if not applicable */
  line2: string;
  /** The city/suburb */
  suburb: string;
  /** The postcode */
  postcode: string;
  /** The state - i.e QLD */ // TODO: Change this to a more specific type.
  state: string;
  /** The country */
  country: string;
}

interface Contact {
  /** The phone number */
  phone: string;
  /** The email address */
  email: string;
}

interface UserData {
  /** The user's name */
  name: Name;
  /** The user's contact details */
  contact: Contact;
  /** The user's address */
  address: Address;
}

interface Subject {
  /** The subject */
  subject: string;
  /** The tutor ID for the subject */
  tutor: string;
}

interface StudentData extends UserData {
  /** The parent's UID */
  parent: string;
  /** The student's year level */
  year: string;
  /** An array of the subjects for a student */
  subjects: Subject[];
  /** The IDs of the tutors for this student */
  tutors: string[];
}

interface Student {
  /** The document ID for the student */
  id: string;
  /** The document data for the student */
  data: StudentData;
}

export default UserData;
export { Name, Address, Contact, StudentData, Student, Subject };
