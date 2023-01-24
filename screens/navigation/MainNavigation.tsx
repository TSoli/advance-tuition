import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { StackNavigationOptions } from '@react-navigation/stack';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing } from '../../styles';
import { StudentData } from '../../types/UserData';
import HomeScreen from '../homeStack/HomeScreen';
import AddTimesheetScreen from '../payrollStack/addTimesheet/AddTimesheetScreen';
import TimesheetListScreen from '../payrollStack/TimesheetListScreen';
import TimesheetScreen from '../payrollStack/TimesheetScreen';
import StudentDetailsScreen from '../studentStack/studentDetails/StudentDetailsScreen';
import StudentListScreen from '../studentStack/studentList/StudentListScreen';

type IconName = keyof typeof Ionicons.glyphMap;

const screenOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTintColor: Colors.white,
  headerTitleAlign: 'center',
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

type HomeStackParamList = {
  HomeScreen: undefined;
};

// The screens that can be navigated to from the Home tab
function HomeStackScreen() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Home' }} />
    </Stack.Navigator>
  );
}

type PayrollStackParamList = {
  TimesheetListScreen: undefined;
  TimesheetScreen: undefined;
  AddTimesheetScreen: undefined;
};

// The screens that can be navigated to from the Payroll tab
function PayrollStackScreen() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="TimesheetListScreen"
        component={TimesheetListScreen}
        options={{ title: 'Timesheets' }}
      />
      <Stack.Screen
        name="TimesheetScreen"
        component={TimesheetScreen}
        options={{ title: 'Timesheet details' }}
      />
      <Stack.Screen
        name="AddTimesheetScreen"
        component={AddTimesheetScreen}
        options={{ title: 'Add Timesheet' }}
      />
    </Stack.Navigator>
  );
}

type StudentStackParamList = {
  StudentListScreen: undefined;
  StudentDetailsScreen: StudentData;
};

// The screens that can be navigated to from the Students tab
function StudentStackScreen() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="StudentListScreen"
        component={StudentListScreen}
        options={{ title: 'Students' }}
      />
      <Stack.Screen
        name="StudentDetailsScreen"
        component={StudentDetailsScreen}
        options={{ title: 'Details' }}
      />
    </Stack.Navigator>
  );
}

function MainNavigation() {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: IconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Students') {
            iconName = focused ? 'people' : 'people-outline';
          } else {
            // route.name === 'Payroll'
            iconName = focused ? 'list' : 'list-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.grey,
        tabBarLabelStyle: { paddingBottom: Spacing.padding.base },
        tabBarStyle: { padding: Spacing.padding.base, height: 70 + insets.bottom },
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Students" component={StudentStackScreen} />
      <Tab.Screen name="Payroll" component={PayrollStackScreen} />
    </Tab.Navigator>
  );
}

export default MainNavigation;
export { HomeStackParamList, PayrollStackParamList, StudentStackParamList };
