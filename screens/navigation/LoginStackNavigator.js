import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../loginStack/LoginScreen';
import SignupScreen from '../loginStack/SignupScreen';
import ForgotPasswordScreen from '../loginStack/ForgotPasswordScreen';
import { Colors } from '../../styles';

const LoginStack = createStackNavigator();

const screenOptions = {
  headerStyle: {
    backgroundColor: Colors.primaryDark,
  },
  headerTintColor: Colors.white,
  headerTitleAlign: 'center',
};

export default function LoginStackNavigator({ navigation }) {
  return (
    <LoginStack.Navigator screenOptions={screenOptions}>
      <LoginStack.Screen name="LoginScreen" component={LoginScreen} />
      <LoginStack.Screen name="SignupScreen" component={SignupScreen} />
      <LoginStack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
    </LoginStack.Navigator>
  );
}
