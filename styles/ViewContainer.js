// Defines some styles for View containers

import { StatusBar, Platform } from "react-native";
import * as Colors from "./Colors";

export const base = {
  flex: 1,
  backgroundColor: Colors.background,
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
};

export const topLeft = {
  flex: 1,
  backgroundColor: Colors.background,
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
};