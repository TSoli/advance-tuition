import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from "./HomeScreen";
import TimesheetScreen from "./TimesheetScreen";
import { Text, View } from "react-native";
import { Colors, Spacing } from "../styles";

const Tab = createBottomTabNavigator();

export default function MainNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Timesheets') {
            iconName = focused ? 'list' : 'list-outline';
          }

          return < Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: Colors.blue,
        tabBarInactiveTintColor: 'grey',
        tabBarLabelStyle: { paddingBottom: Spacing.padding.base, },
        tabBarStyle: { padding: Spacing.padding.base, height: 70 }
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Timesheets" component={TimesheetScreen} />

    </Tab.Navigator>
  );
}