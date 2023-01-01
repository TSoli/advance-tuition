import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import HomeScreen from '../homeStack/HomeScreen';
import TimesheetListScreen from '../payrollStack/TimesheetListScreen';
import TimesheetScreen from '../payrollStack/TimesheetScreen';
import AddTimesheetScreen from '../payrollStack/AddTimesheetScreen';
import StudentListScreen from '../studentStack/StudentListScreen';
import StudentDetailsScreen from '../studentStack/StudentDetailsScreen';
import { Colors, Spacing } from '../../styles';

const screenOptions = {
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTintColor: Colors.white,
  headerTitleAlign: 'center',
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// The screens that can be navigated to from the Home tab
function HomeStackScreen() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Home' }} />
    </Stack.Navigator>
  );
}

// The screens that can be navigated to from the Payroll tab
function PayrollStackScreen({ navigation }) {
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

// The screens that can be navigated to from the Students tab
function StudentStackScreen({ navigation }) {
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

export default function MainNavigation() {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Students') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Payroll') {
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
