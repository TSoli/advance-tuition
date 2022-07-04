import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from "../homeStack/HomeScreen";
import TimesheetListScreen from "../payrollStack/TimesheetListScreen";
import TimesheetScreen from "../payrollStack/TimesheetScreen";
import AddTimesheetScreen from "../payrollStack/AddTimesheetScreen";
import StudentListScreen from "../studentStack/StudentListScreen";
import StudentDetailsScreen from "../studentStack/StudentDetailsScreen";
import { Colors, Spacing } from "../../styles";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// The screens that can be navigated to from the Home tab
function HomeStackScreen() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
}

// The screens that can be navigated to from the Payroll tab
function PayrollStackScreen({ navigation }) {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="TimesheetListScreen" component={TimesheetListScreen} />
      <Stack.Screen name="TimesheetScreen" component={TimesheetScreen} />
      <Stack.Screen name="AddTimesheetScreen" component={AddTimesheetScreen} />
    </Stack.Navigator>
  );
}

// The screens that can be navigated to from the Students tab
function StudentStackScreen({ navigation }) {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="StudentListScreen" component={StudentListScreen} />
      <Stack.Screen name="StudentDetailsScreen" component={StudentDetailsScreen} />
    </Stack.Navigator>
  )
}

export default function MainNavigation() {
  return (

    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === "Students") {
          iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Payroll') {
            iconName = focused ? 'list' : 'list-outline';
          }

          return < Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.grey,
        tabBarLabelStyle: { paddingBottom: Spacing.padding.base, },
        tabBarStyle: { padding: Spacing.padding.base, height: 70 },
        headerShown: false,
      })}>

      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Students" component={StudentStackScreen} />
      <Tab.Screen name="Payroll" component={PayrollStackScreen} />

    </Tab.Navigator>
  );
}