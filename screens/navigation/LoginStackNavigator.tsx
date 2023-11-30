import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { Colors } from '../../styles';
import ForgotPasswordScreen from '../loginStack/ForgotPasswordScreen';
import LoginScreen from '../loginStack/LoginScreen';
import SignupScreen from '../loginStack/signup/SignupScreen';

const LoginStack = createStackNavigator();

type LoginStackParamList = {
  LoginScreen: undefined;
  SignupScreen: undefined;
  ForgotPasswordScreen: undefined;
};

const screenOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: Colors.primaryDark,
  },
  headerTintColor: Colors.white,
  headerTitleAlign: 'center',
};

function LoginStackNavigator() {
  return (
    <LoginStack.Navigator screenOptions={screenOptions}>
      <LoginStack.Screen name="LoginScreen" component={LoginScreen} options={{ title: 'Login' }} />
      <LoginStack.Screen
        name="SignupScreen"
        component={SignupScreen}
        options={{ title: 'Sign Up' }}
      />
      <LoginStack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{ title: 'Reset Password' }}
      />
    </LoginStack.Navigator>
  );
}

export default LoginStackNavigator;
export { LoginStackParamList };
