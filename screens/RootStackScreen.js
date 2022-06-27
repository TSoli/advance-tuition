import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import TimesheetScreen from './TimesheetScreen';

const RootStack = createStackNavigator();

export default function RootStackScreen ({navigation}) {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name="LoginScreen" component={LoginScreen} />
      <RootStack.Screen name="SignupScreen" component={SignupScreen} />
      <RootStack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
      <RootStack.Screen name="TimesheetScreen" component={TimesheetScreen} />
    </RootStack.Navigator>
  )
}