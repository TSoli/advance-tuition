import { Timesheet, Student } from '../../advance-tuition-backend';

type LoginStackParamList = {
  LoginScreen: undefined;
  SignupScreen: undefined;
  ForgotPasswordScreen: undefined;
};

type HomeStackParamList = {
  HomeScreen: undefined;
  Payroll: { screen: string; initial: boolean };
};

type PayrollStackParamList = {
  TimesheetListScreen: undefined;
  TimesheetScreen: { timesheet: Timesheet; student: Student | undefined };
  AddTimesheetScreen: undefined;
};

type StudentStackParamList = {
  StudentListScreen: undefined;
  StudentDetailsScreen: Student;
};

export { LoginStackParamList, HomeStackParamList, PayrollStackParamList, StudentStackParamList };
