type TimesheetStatus = 'APPROVED' | 'PENDING' | 'DENIED';

interface TimesheetData {
  /** The date/time of the start of the tutoring session */
  datetime: Date;
  /** The tutor's ID */
  tutor: string;
  /** The student's ID */
  student: string;
  /** The duration of the tutoring session in minutes */
  duration: number;
  /** Amount owed to the tutor in $ */
  owed: number;
  /** Any additional notes about the timesheet */
  notes: string | undefined;
  /** The subject the tutoring session was for */
  subject: string; // Might make this more specific in future.
  /** The approval status of the timesheet */
  status: TimesheetStatus;
  /** Whether the invoice to the customer has been paid */
  isPaid: boolean;
}

interface Timesheet {
  /** The timesheet ID (document ID) */
  id: string;
  /** The timesheet data */
  data: TimesheetData;
}

export default TimesheetData;
export { Timesheet, TimesheetStatus };
