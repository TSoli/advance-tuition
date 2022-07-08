import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../loginStack/LoginScreen';
import SignupScreen from '../loginStack/SignupScreen';
import ForgotPasswordScreen from '../loginStack/ForgotPasswordScreen';

const LoginStack = createStackNavigator();

export default function LoginStackNavigator({ navigation }) {
  return (
    <LoginStack.Navigator screenOptions={{ headerShown: false }}>
      <LoginStack.Screen name="LoginScreen" component={LoginScreen} />
      <LoginStack.Screen name="SignupScreen" component={SignupScreen} />
      <LoginStack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
    </LoginStack.Navigator>
  );
}
