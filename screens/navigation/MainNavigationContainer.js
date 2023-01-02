import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import MainNavigation from './MainNavigation';
import LoginStackNavigator from './LoginStackNavigator';

export default function MainNavigationContainer() {
  const { user, isVerified } = useAuth();
  return (
    <NavigationContainer>
      {user && isVerified() ? <MainNavigation /> : <LoginStackNavigator />}
    </NavigationContainer>
  );
}
