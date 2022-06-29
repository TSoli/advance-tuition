import { View, ActivityIndicator } from 'react-native';
import { useEffect, useMemo, useReducer } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import RootStackScreen from './screens/navigation/RootStackScreen';
import { AuthContext  } from './components/Context';
import MainNavigation from './screens/navigation/MainNavigation';
import { Colors, ViewContainer } from './styles';

export default function App() {

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch(action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.email,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
    }
  }

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(() => ({
    Login: async(foundUser) => {
      const userToken = foundUser[0].userToken;
      const email = foundUser[0].email;

      try {
        await AsyncStorage.setItem('userToken', userToken);
      } catch (e) {
        console.log(e);
      }

      // console.log('user token: ', userToken);
      dispatch({ type: 'LOGIN', email: email, token: userToken });
    },
    Logout: async() => {
      try {
        await AsyncStorage.removeItem('userToken');
      } catch (e) {
        console.log(e);
      }

      dispatch({ type: 'LOGOUT' });
    },
    
    Signup: (email, token) => {
      dispatch({ type: 'REGISTER' })
    },
  }), []);

  useEffect(() => {
    setTimeout(async() => {
      let userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }

      // console.log('user token: ', userToken);
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={ViewContainer.base}>
        <ActivityIndicator size="large" color={Colors.primaryDark} />
      </View>
    )
  }
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        { (loginState.userToken != null) ? 
          <MainNavigation/>
        :
          <RootStackScreen/>
        }
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
