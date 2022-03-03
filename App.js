import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { useEffect, useState, useMemo, useReducer } from 'react';

import RootStackScreen from './screens/RootStackScreen';
import { AuthContext  } from './components/context';
import HomeScreen from './screens/HomeScreen';

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
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  }

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(() => ({
    Login: (userName, password) => {
      let userToken;
      userToken = null;
      if (userName == 'user' && password == 'pass') {
        userToken = 'abc123';
      }

      // console.log('user token: ', userToken);
      dispatch({ type: 'LOGIN', id: userName, token: userToken });
    },
    Logout: () => {
      dispatch({ type: 'LOGOUT' });
    },
    Signup: () => {
      setUserToken('default_user');
      setIsLoading(false);
    },
  }), []);

  useEffect(() => {
    setTimeout(() => {
      let userToken;
      userToken = 'def456';
      // console.log('user token: ', userToken);
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <ActivityIndicator size="large" color="#004ba0" />
      </View>
    )
  }
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        { (loginState.userToken != null) ? 
          <HomeScreen/>
        :
          <RootStackScreen/>
        }
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
