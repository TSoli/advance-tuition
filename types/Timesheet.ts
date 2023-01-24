interface Timesheet {
  /** The date/time of the start of the tutoring session */
  datetime: Date | null;
  /** The tutor's ID */
  tutor: string;
  /** The student's ID */
  student: string;
  /** The duration of the tutoring session in minutes */
  duration: number;
  /** Any additional notes about the timesheet */
  notes: string | null;
}

export default Timesheet;
