import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../loginStack/LoginScreen';
import SignupScreen from '../loginStack/SignupScreen';
import ForgotPasswordScreen from '../loginStack/ForgotPasswordScreen';

const RootStack = createStackNavigator();

export default function RootStackScreen ({navigation}) {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false, }} >
      <RootStack.Screen name="LoginScreen" component={LoginScreen} />
      <RootStack.Screen name="SignupScreen" component={SignupScreen} />
      <RootStack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
    </RootStack.Navigator>
  )
}