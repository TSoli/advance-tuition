import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { useEffect, useState, useMemo } from 'react';

import RootStackScreen from './screens/RootStackScreen';
import { AuthContext  } from './components/context';
import HomeScreen from './screens/HomeScreen';

export default function App() {

  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const authContext = useMemo(() => ({
    Login: () => {
      setUserToken('default_user');
      setIsLoading(false);
    },
    Logout: () => {
      setUserToken(null);
      setIsLoading(false);
    },
    Signup: () => {
      setUserToken('default_user');
      setIsLoading(false);
    },
  }));

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <ActivityIndicator size="large" color="#004ba0" />
      </View>
    )
  }
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        { (userToken != null) ? 
          <HomeScreen/>
        :
          <RootStackScreen/>
        }
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
